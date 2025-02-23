import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star } from 'lucide-react';
import Spinner from '@/Animations/Spinner';
import { useSnackbar } from 'notistack';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface Donation {
  _id: string;
  foodType: string;
  quantity: number;
  expirationDate: string;
  pickupLocation: string;
  description: string;
  imageUrl: string;
  status: string;
  receiver: {
    _id: string;
    name: string;
    email: string;
  };
  otp?: string;
}

interface FeedbackDetails {
  rating: number;
  comment: string;
  images: string[];
}

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: FeedbackDetails | null;
}

const FeedbackDialog = ({ isOpen, onClose, feedback }: FeedbackDialogProps) => {
  if (!feedback) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Feedback Details</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-5 w-5 ${index < feedback.rating ? "fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          {feedback.comment && (
            <div>
              <h4 className="font-medium mb-2">Comment:</h4>
              <p className="text-sm text-gray-600">{feedback.comment}</p>
            </div>
          )}
          {feedback.images && feedback.images.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Event Images:</h4>
              <div className="grid grid-cols-2 gap-2">
                {feedback.images.map((image, index) => (
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
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Donationactivity: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [feedbackDetails, setFeedbackDetails] = useState<FeedbackDetails | null>(null);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  useEffect(() => {
    fetchMyDonations();
  }, []);

  const fetchMyDonations = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_Backend_URL}/api/donations/my-donations`,
        { withCredentials: true }
      );
      setDonations(response.data.filter((d: Donation) => 
        d.status === 'accepted' || d.status === 'delivered'
      ));
    } catch (error) {
      console.error('Error fetching donations:', error);
      enqueueSnackbar('Failed to fetch donations', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const generateOTP = async (donationId: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_Backend_URL}/api/donations/${donationId}/generate-otp`,
        {},
        { withCredentials: true }
      );
      
      // Update the donation in state with the OTP
      setDonations(prev => prev.map(d => 
        d._id === donationId ? { ...d, otp: response.data.otp } : d
      ));
      
      enqueueSnackbar('OTP generated successfully!', { variant: 'success' });
    } catch (error) {
      console.error('Error generating OTP:', error);
      enqueueSnackbar('Failed to generate OTP', { variant: 'error' });
    }
  };

  const getFeedbackDetails = async (donationId: string) => {
    try {
      console.log('Fetching feedback for donation:', donationId);
      const response = await axios.get(
        `${import.meta.env.VITE_Backend_URL}/api/donations/${donationId}/feedback`,
        { 
          withCredentials: true,
          // Add error handling for 404
          validateStatus: function (status) {
            return status < 500; // Resolve only if status is less than 500
          }
        }
      );
  
      if (response.status === 404) {
        enqueueSnackbar('No feedback available for this donation yet', { 
          variant: 'info',
          anchorOrigin: { vertical: 'top', horizontal: 'right' }
        });
        return;
      }
  
      if (response.data) {
        setFeedbackDetails(response.data);
        setIsFeedbackDialogOpen(true);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      enqueueSnackbar('Failed to fetch feedback details', { 
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
    }
  };

  if (loading) {
    return (
      <div className='w-full h-[80vh] flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-semibold mb-6'>Donation Activity</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.length > 0 ? (
          donations.map((donation) => (
            <Card key={donation._id} className="w-full">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{donation.foodType}</span>
                  <Badge variant={donation.status === 'delivered' ? "default" : "secondary"}>
                    {donation.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Quantity: {donation.quantity} servings
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Expires: {new Date(donation.expirationDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {donation.pickupLocation}
                  </p>
                  {donation.receiver && (
                    <div className="border-t pt-2">
                      <p className="text-sm font-medium mb-1">Accepted by:</p>
                      <p className="text-sm">{donation.receiver.name}</p>
                      <p className="text-sm text-gray-500">{donation.receiver.email}</p>
                    </div>
                  )}
                  {donation.otp && (
                    <div className="mt-2 p-2 bg-gray-100 rounded-md">
                      <p className="text-sm font-medium">Delivery OTP:</p>
                      <p className="text-lg font-bold text-center">{donation.otp}</p>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                {donation.status === 'accepted' && (
                  <Button 
                    className="w-full"
                    onClick={() => generateOTP(donation._id)}
                    variant="default"
                  >
                    Generate Delivery OTP
                  </Button>
                )}
                {donation.status === 'delivered' && (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => getFeedbackDetails(donation._id)}
                  >
                    View Feedback
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No active donations found.
          </p>
        )}
      </div>

      <FeedbackDialog
        isOpen={isFeedbackDialogOpen}
        onClose={() => setIsFeedbackDialogOpen(false)}
        feedback={feedbackDetails}
      />
    </div>
  );
};

export default Donationactivity;