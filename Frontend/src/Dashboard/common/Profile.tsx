import React, { useState } from "react";
import axios from "axios";
import { Edit, UserPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


const DonorProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>();
  const [isEditing, setIsEditing] = useState(false);


  const [editProfileData, setEditProfileData] = useState(false);

  const user = {
    name: "Gahinath Madake",
    about: "Helloshdfgsjdshbdjfhbdbjvhmbdfjvhbgggggggggg",
    email: "gahinathmadake@gmail.com",
    phone: "+918767738537",
    role: "NGO",
    registrationNumber: 983758343545345,
    location: "Alandi Pune",
  };

  // Handle file upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("YOUR_BACKEND_API_URL", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfileImage(response.data.imageUrl); // Assuming backend returns the image URL
      setIsEditing(false); // Disable editing mode after successful upload
    }
    catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Please try again.");
    }
  };

  

  return (
    <div className="w-full px-20 py-6">
      {/* Profile Section */}
      <Card className="w-full rounded-lg shadow-sm overflow-hidden">
        
        <CardHeader className="flex flex-row justify-between items-center p-8 bg-gradient-to-r from-gray-600 to-green-600">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
            {/* Avatar with Upload Option */}
            <div className="relative">
              <Avatar className="w-24 h-24 border-2 border-white shadow-lg">
                <AvatarImage src={profileImage || ""} alt="Profile" />
                <AvatarFallback>AC</AvatarFallback>
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
          {
            !isEditing &&
            <Button onClick={() => setIsEditing(!isEditing)}>
              <UserPen className="mr-2" />
              Edit
            </Button>
          }
          {
            isEditing &&
             <Button onClick={() => setIsEditing(!isEditing)}>
              Cancel 
            </Button>
          }
        </CardHeader>

        <CardContent className="p-8">
          <form className="">
            <div>
              <Label>Name</Label>
              {
                editProfileData?
                <Input 
                value={user.name}
                />
                :
                <p>{user.name}</p>
              }

            </div>

          </form>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-0">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-3">
                <Edit className="w-4 h-4" /> Edit Profile
              </Button>
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100 px-6 py-3">
                Contact
              </Button>
            </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default DonorProfile;