import React from "react";
import { Mail, MapPin, Phone, Edit, PieChart, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const DonarProfile: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      {/* Profile Section */}
      <Card className="w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left p-8 bg-gradient-to-r from-gray-600 to-green-600">
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
            <AvatarImage src="\src\assets\Gahinath.jpg" alt="Profile" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="sm:ml-6 mt-4 sm:mt-0">
            <h2 className="text-2xl font-bold text-white">Gahinath Madake</h2>
            <Badge variant="secondary" className="mt-2 bg-white text-blue-600">
              Orgonization  | Donor
            </Badge>
            <p className="text-white mt-2">
              Passionate about making the world a better place through generosity.
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {/* Statistics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <Heart className="text-red-500 w-8 h-8" />
              <p className="text-xl font-bold text-gray-800 mt-2">100%</p>
              <p className="text-sm text-gray-500">Donation Success</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <Users className="text-blue-500 w-8 h-8" />
              <p className="text-xl font-bold text-gray-800 mt-2">450+</p>
              <p className="text-sm text-gray-500">People Helped</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <PieChart className="text-green-500 w-8 h-8" />
              <p className="text-xl font-bold text-gray-800 mt-2">100k+</p>
              <p className="text-sm text-gray-500">Donated</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <MapPin className="text-purple-500 w-8 h-8" />
              <p className="text-xl font-bold text-gray-800 mt-2">Satara</p>
              <p className="text-sm text-gray-500">Padegaon</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between">
            {/* Contact Info */}
            <div className="space-y-4">
              <p className="flex items-center gap-2 text-gray-700">
                <Mail className="w-5 h-5 text-blue-600" />
                Gahinathmadake.com
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Phone className="w-5 h-5 text-blue-600" />
                +91 98765 43210
              </p>
          
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-0">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-3">
                <Edit className="w-4 h-4" /> Edit Profile
              </Button>
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100 px-6 py-3">
                Contact
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonarProfile;
