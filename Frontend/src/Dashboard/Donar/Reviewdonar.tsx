import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Star, MessagesSquare } from "lucide-react"; // Import star icon from Lucide React
import axios from "axios";

function Review() {
    const [Feedback, setFeedback] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      async function getMyAllFeedBack() {
        setLoading(true);
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_Backend_URL}/feedback/user/getDonorFeedBack`,
            { withCredentials: true }
          );
  
          if(response.data.success){
            setFeedback(response.data.feedback);
          }
        }
        catch (error) {
          console.error("Error fetching feedback:", error);
        }
        setLoading(false);
      }
  
      getMyAllFeedBack();
    }, []);
  

  return (
    <Card className="w-[350px] mx-auto bg-white shadow-lg rounded-lg font-sans border border-gray-200 overflow-hidden mt-5 ">
      <CardHeader className="bg-black py-4 text-white text-center text-xl font-semibold ">
        Review
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex space-x-2 text-gray-700">
          <MessagesSquare className="text-yellow-800 text-lg" />
          <span className="font-medium">Feedback</span>
        </div>

        {/* Suggestion Textarea */}
        <div className="mt-4">
          <Label
            htmlFor="suggestion"
            className="text-gray-700 text-sm font-semibold"
          >
            Ngo ABCD
          </Label>
          <p></p>
        </div>

        {/* 5-Star Rating Section */}
        <div className="mt-4">
          <Label className="text-gray-700 text-sm font-semibold">
            RATE YOUR EXPERIENCE
          </Label>
          <div className="flex items-center space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 cursor-pointer`}
              />
            ))}
          </div>
        </div>
      </CardContent>

      {/* Footer with Submit Button */}
      <CardFooter className="p-4">
        <Button
          className="w-full bg-gray-200 text-black hover:bg-gray-300"
        >
          Respond to Review
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Review;
