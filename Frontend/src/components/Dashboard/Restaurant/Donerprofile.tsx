import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin } from "lucide-react"; // ✅ Correct import

const DonorProfile: React.FC = () => {
  const userImage = ""; // Set to empty to use the fallback icon

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted pt-11">
      <Card className="relative w-full max-w-sm max-h-fit shadow-lg rounded-3xl border bg-background p-8 pt-14">
        
        {/* Avatar (User Icon) Positioned Above */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <Avatar className="w-24 h-24 shadow-lg border-4 border-background bg-background">
            {userImage ? (
              <AvatarImage src={userImage} alt="User" />
            ) : (
              <AvatarFallback className="bg-accent flex items-center justify-center">
                <User className="w-12 h-12 text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        {/* Profile Header */}
        <CardHeader className="flex flex-col items-center space-y-3 p-6 text-center">
          <div>
            <h1 className="text-xl font-bold text-primary">Shreyash Padase</h1>
            <p className="text-md text-muted-foreground font-medium tracking-wide uppercase">
              Donor
            </p>
          </div>
        </CardHeader>

        <Separator />

        {/* Profile Details */}
        <CardContent className="space-y-5 text-muted-foreground text-md p-6 text-center">
          <p className="flex items-center justify-center gap-2 font-medium">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-semibold">Location:</span> Satara, India
          </p>
          <p className="flex items-center justify-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <span className="truncate">shreyashpadase@email.com</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            <span>+91 98765 43210</span>
          </p>
        </CardContent>

        <Separator />

        {/* Account Settings */}
        <CardContent className="flex flex-col gap-3 p-9 mt-4">
          <Link to="/restaurant/profileedit">
            <Button variant="default" className="w-full transition-transform hover:scale-105">
              Edit Profile
            </Button>
          </Link>
          <Button variant="destructive" className="w-full transition-transform hover:scale-105">
            Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonorProfile;