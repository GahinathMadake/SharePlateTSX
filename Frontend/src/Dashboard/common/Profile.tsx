import React, { useState } from "react";
import axios from "axios";
import { Edit, UserPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";
import { enqueueSnackbar } from "notistack";



const Profile: React.FC = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditProfileData] = useState(false);

  const [userData, setUserData] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log("Saved user data:", userData);

    const { name, about, phone, location } = userData;

    // Validate required fields
    if (!name || !about || !phone || !location) {
      enqueueSnackbar("All fields are required", { variant: "error" });
      return;
    }

    try {
      // Send the updated user data to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_Backend_URL}/user/updateProfile`,
        userData,
        { withCredentials: true }
      );

      if (response.data.success) {
        setUser(response.data.updatedUser);
        enqueueSnackbar("Profile updated successfully!", { variant: "success" });
      } else {
        setUserData(user);
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    }
    catch (error) {
      console.error("Profile update error:", error);
      setUserData(user); // Reset the form to the original user data
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }

    setEditProfileData(false);
  };

  const handleCancel = () => {
    setUserData(user);
    setEditProfileData(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    try {
      // Convert file to base64
      const base64Image = await convertFileToBase64(file);
  
      // Send to backend
      const response = await axios.post(
        `${import.meta.env.VITE_Backend_URL}/api/upload`,
        {
          base64Image,
          folder: 'profiles'
        },
        { withCredentials: true }
      );
  
      if (response.data.success) {
        // Update user data with new image URL
        const updatedUserData = {
          ...userData,
          profileImage: response.data.url
        };
  
        // Update user profile with new image URL
        const updateResponse = await axios.post(
          `${import.meta.env.VITE_Backend_URL}/user/updateProfile`,
          updatedUserData,
          { withCredentials: true }
        );
  
        if (updateResponse.data.success) {
          setUserData(updateResponse.data.updatedUser);
          setUser(updateResponse.data.updatedUser); // Update global user context
          enqueueSnackbar("Profile image updated successfully!", { variant: "success" });
        }
      }
  
      setIsEditing(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      enqueueSnackbar("Image upload failed. Please try again.", { variant: "error" });
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="w-full px-20 py-6">
      <Card className="w-full rounded-lg shadow-sm overflow-hidden">
        
        {/* Profile Section */}
        <CardHeader className="flex flex-row justify-between items-center p-8 bg-gradient-to-r from-gray-600 to-green-600">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
            {/* Avatar with Upload Option */}
            <div className="relative">
            {/* // Update the Avatar component to use profileImage */}
              <Avatar className="w-24 h-24 border-2 border-white shadow-lg">
                <AvatarImage src={userData.profileImage} alt="Profile" />
                <AvatarFallback>{userData.name?.charAt(0)?.toUpperCase()}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                  <label
                    htmlFor="profile-image-upload"
                    className="cursor-pointer text-white"
                  >
                    <Edit className="w-6 h-6" />
                    <input
                      id="profile-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="sm:ml-6 mt-4 sm:mt-0">
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-white mt-1">@{user.email}</p>
              <Badge variant="secondary" className="mt-2 bg-white text-blue-600">
                {user.role}
              </Badge>
            </div>
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <Button onClick={() => setIsEditing(!isEditing)}>
              <UserPen className="mr-2" />
              Edit
            </Button>
          )}
          {isEditing && (
            <Button onClick={() => setIsEditing(!isEditing)}>Cancel</Button>
          )}
        </CardHeader>

        <CardContent className="p-6">
          <h2 className="mb-2 text-lg font-semibold">Personal Details</h2>
          <Separator className="mb-4" />
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <Label>Name</Label>
              {editMode ? (
                <Input
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              {editMode ? (
                <Input
                  name="email"
                  value={user.email}
                  readOnly
                  className="bg-sidebar"
                />
              ) : (
                <p className="text-gray-700">{user.email}</p>
              )}
            </div>

            {/* About */}
            <div className="md:col-span-2">
              <Label>About</Label>
              {editMode ? (
                <Textarea
                  name="about"
                  value={userData.about}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.about}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label>Phone</Label>
              {editMode ? (
                <Input
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.phone}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <Label>Location</Label>
              {editMode ? (
                <Input
                  name="location"
                  value={userData.location}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.location}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <Label>Role</Label>
              <p className="text-gray-700">{user.role}</p>
            </div>

            {/* Registration Number (Only for NGO) */}
            {user.role === "NGO" && (
              <div>
                <Label>Registration Number</Label>
                {editMode ? (
                  <Input
                    name="registrationNumber"
                    value={user.registrationNumber ?? ""}
                    readOnly
                  />
                ) : (
                  <p>{user.registrationNumber}</p>
                )}
              </div>
            )}
          </form>

          {/* Action Buttons */}
          <div className="flex flex-col justify-end sm:flex-row gap-4 mt-6">
            {!editMode ? (
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-3"
                onClick={() => setEditProfileData(true)}
              >
                <Edit className="w-4 h-4" /> Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="text-gray-700 border-gray-300 hover:bg-gray-100 px-6 py-3"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;