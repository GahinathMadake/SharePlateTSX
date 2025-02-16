import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ProfileEdit: React.FC = () => {
  const [formData, setFormData] = useState({
    donorName: "",
    phoneNumber: "",
    location: "",
    address: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted successfully:", formData);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 relative">
        <img
          src="/src/assets/form/Donate-form.png"
          alt="Food Donation"
          className="w-full h-48 sm:h-64 md:h-72 lg:h-screen object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-center px-4">
            Donate Food, Create Hope
          </h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-gray-100 py-6 sm:py-8 md:py-10 lg:py-12 flex items-center justify-center">
        <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-4 sm:mx-6 lg:mx-8">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">
              Edit Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className={cn("space-y-4")}>
              {Object.keys(formData).map((key) => (
                <div key={key} className="grid gap-2">
                  <Label
                    htmlFor={key}
                    className="text-sm sm:text-sm md:text-sm font-normal" // Removed font-medium, set font-normal
                  >
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <Input
                    id={key}
                    name={key}
                    type={key === "password" ? "password" : "text"}
                    value={formData[key as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="text-sm sm:text-base md:text-lg p-2"
                  />
                </div>
              ))}
              <div className="flex justify-center items-center">
                <Button className="bg-pink-600 hover:bg-pink-500 text-white text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-5 px-6 rounded-lg">
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileEdit;