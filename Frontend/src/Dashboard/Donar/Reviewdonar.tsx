import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Star, MessagesSquare } from "lucide-react"; // Import star icon from Lucide React

function Review() {
  const [suggestion, setSuggestion] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [rating, setRating] = useState(0); // State for rating

  const handleSuggestionChange = (e) => {
    setSuggestion(e.target.value);
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating); // Update the rating state
  };

  const handleSubmit = () => {
    // Handle the submission of the suggestion, additional information, and rating
    console.log("Suggestion:", suggestion);
    console.log("Additional Information:", additionalInfo);
    console.log("Rating:", rating);
    // You can add further logic here, such as sending the data to an API
  };

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
          <Textarea
            id="suggestion"
            className="mt-2"
            rows={5}
            placeholder="I’d like the butler feature to send my Model X to an authorized person at a different address."
            value={suggestion}
            onChange={handleSuggestionChange}
          />
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
                className={`h-5 w-5 cursor-pointer ${
                  star <= rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => handleRatingClick(star)}
              />
            ))}
          </div>
        </div>
      </CardContent>

      {/* Footer with Submit Button */}
      <CardFooter className="p-4">
        <Button
          className="w-full bg-gray-200 text-black hover:bg-gray-300"
          onClick={handleSubmit}
        >
          Respond to Review
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Review;
