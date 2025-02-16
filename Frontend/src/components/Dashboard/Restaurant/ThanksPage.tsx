import React from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const ThanksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      {/* Card with responsive max-width and padding */}
      <Card className="w-full max-w-sm sm:max-w-md bg-white shadow-lg rounded-lg">
        <CardHeader className="text-center">
          {/* Responsive title size */}
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
            Thank You!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {/* Responsive text size */}
          <p className="text-base sm:text-lg text-gray-700">
            Your donation has been received. We appreciate your support!
          </p>
          {/* Responsive icon size */}
          <div className="mt-4 flex justify-center">
            <ChevronUp className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {/* Responsive button size */}
          <Button className="bg-blue-600 hover:bg-blue-500 text-white text-base sm:text-lg py-4 sm:py-6 px-8 sm:px-10 rounded-lg">
            Donate Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ThanksPage;