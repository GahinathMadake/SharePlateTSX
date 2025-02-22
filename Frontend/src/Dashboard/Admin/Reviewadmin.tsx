import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Star, MessagesSquare, MapPin, Calendar } from "lucide-react";
import axios from "axios";
import { useSnackbar } from "notistack";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Feedback {
  _id: string;
  ngo: {
    _id: string;
    name: string;
    email: string;
  };
  donation: {
    _id: string;
    foodType: string;
    quantity: number;
    expirationDate: string;
    pickupLocation: string;
    description: string;
    imageUrl: string;
    status: string;
    donor: {
      _id: string;
      name: string;
      email: string;
    };
    receiver: {
      _id: string;
      name: string;
      email: string;
    };
  };
  rating: number;
  comment: string;
  images: string[];
  createdAt: string;
}

const Reviewadmin = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  useEffect(() => {
    fetchFeedbacksWithDonations();
  }, []);

  const fetchFeedbacksWithDonations = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_Backend_URL}/feedback/user/all-feedbacks`, // Updated URL
        { withCredentials: true }
      );
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks with donations:", error);
      enqueueSnackbar("Failed to fetch feedbacks with donations", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleViewFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsFeedbackDialogOpen(true);
  };

  if (loading) {
    return <div className="w-full h-[80vh] flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Donations with Feedback</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <Card key={feedback._id} className="w-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <span>{feedback.donation.foodType}</span>
                  <span className="text-sm text-gray-500">Rating: {feedback.rating}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
  <div className="space-y-2">
    <p className="text-sm font-medium">Quantity: {feedback.donation.quantity} servings</p>
    <p className="text-sm flex items-center gap-2">
      <Calendar className="h-4 w-4" />
      Expires: {new Date(feedback.donation.expirationDate).toLocaleDateString()}
    </p>
    <p className="text-sm flex items-center gap-2">
      <MapPin className="h-4 w-4" />
      {feedback.donation.pickupLocation}
    </p>
    
    {/* Donor Information */}
    <div className="border-t pt-2">
      <Label className="text-sm font-medium">Donor:</Label>
      <p className="text-sm">{feedback.donation.donor?.name || 'N/A'}</p>
      <p className="text-sm text-gray-500">{feedback.donation.donor?.email || 'N/A'}</p>
    </div>
    
    {/* Receiver Information */}
    <div className="border-t pt-2">
      <Label className="text-sm font-medium">Receiver:</Label>
      <p className="text-sm">{feedback.donation.receiver?.name || 'N/A'}</p>
      <p className="text-sm text-gray-500">{feedback.donation.receiver?.email || 'N/A'}</p>
    </div>
  </div>
</CardContent>

              <CardFooter className="flex flex-col gap-2">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => handleViewFeedback(feedback)}
                >
                  View Feedback
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No donations with feedback found.
          </p>
        )}
      </div>

      <AlertDialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Feedback Details</AlertDialogTitle>
          </AlertDialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-5 w-5 ${index < selectedFeedback.rating ? "fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              {selectedFeedback.comment && (
                <div>
                  <h4 className="font-medium mb-2">Comment:</h4>
                  <p className="text-sm text-gray-600">{selectedFeedback.comment}</p>
                </div>
              )}
              {selectedFeedback.images && selectedFeedback.images.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Event Images:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedFeedback.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Event image ${index + 1}`}
                        className="rounded-md w-full h-40 object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Reviewadmin;