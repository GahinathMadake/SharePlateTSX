import React from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const ThanksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            {/* Increased title size */}
            Thank You!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-xl text-gray-700">
            {/* Increased text size */}
            Your donation has been received. We appreciate your support!
          </p>
          <div className="mt-6 flex justify-center">
            <ChevronUp className="h-10 w-10 text-blue-600" /> {/* Increased icon size */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="bg-pink-600 hover:bg-pink-500 text-white text-2xl py-7 px-12 rounded-lg">
            {/* Increased button size */}
            Donate Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ThanksPage;