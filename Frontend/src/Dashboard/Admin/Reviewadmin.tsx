import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Star, MessagesSquare, MapPin } from "lucide-react";
import Reviewimg from "../../assets/Admin/Reviewimg.jpg";

function Reviewadmin() {
  const [suggestion, setSuggestion] = useState("");
  const [rating, setRating] = useState(0);
  const [showImage, setShowImage] = useState(false);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    console.log("Suggestion:", suggestion);
    console.log("Rating:", rating);
  };

  const handleRemoveAll = () => {
    setSuggestion("");
    setRating(0);
    setShowImage(true);
  };

  return (
    <Card className="w-[400px] mx-auto bg-white shadow-2xl rounded-2xl font-sans border border-gray-300 overflow-hidden mt-6 transition-all duration-300">
      <CardHeader className="bg-black py-5 text-white text-center text-2xl font-bold rounded-t-2xl">Review</CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center text-gray-700">
          <div className="flex items-center space-x-2">
            <MessagesSquare className="text-yellow-800 text-xl" />
            <span className="font-semibold text-lg">Feedback</span>
          </div>
          {!showImage && (
            <Button variant="destructive" size="sm" onClick={handleRemoveAll}>
              Show Image
            </Button>
          )}
        </div>

        {showImage ? (
          <img src={Reviewimg} alt="Review Completed" className="w-full h-auto rounded-lg shadow-md" />
        ) : (
          <>
            <div>
              <Label className="text-gray-700 text-lg font-semibold">Food Redistribution</Label>
              <p className="text-gray-600 mt-2">
                Our food redistribution initiative ensures surplus food from restaurants reaches NGOs efficiently, reducing food waste and helping those in need.
              </p>
            </div>
            <div>
              <Label className="text-gray-700 text-lg font-semibold">NGO Review</Label>
              <p className="text-gray-600 mt-2">
                Our food redistribution initiative ensures surplus food from restaurants reaches NGOs efficiently, reducing food waste and helping those in need.
              </p>
            </div>

            <div>
              <Label className="text-gray-700 text-sm font-semibold">Rate Your Experience</Label>
              <div className="flex items-center space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer transition-all transform hover:scale-110 ${
                      star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => handleRatingClick(star)}
                  />
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-yellow-500 text-black hover:bg-yellow-600 transition-all duration-300 shadow-md rounded-lg"
              onClick={handleSubmit}
            >
              Mark as Review
            </Button>

            <div className="flex items-center justify-center text-gray-600 text-sm pt-3">
              <MapPin className="w-5 h-5 text-red-600 mr-1" />
              <span>Pinned Location: NGO ABCD Center</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default Reviewadmin;