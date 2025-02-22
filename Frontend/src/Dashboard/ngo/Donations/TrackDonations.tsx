import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from 'lucide-react';
import Spinner from '@/Animations/Spinner';
import { useSnackbar } from 'notistack';
import { useAuth } from "@/context/AuthContext";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import MapComponent from './MapComponent'; // Import the MapComponent

interface Donation {
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
  };
}

interface OTPDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
  isVerifying: boolean;
}

const OTPDialog: React.FC<OTPDialogProps> = ({ isOpen, onClose, onSubmit, isVerifying }) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(otp);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter Delivery OTP</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            pattern="\d{6}"
            required
          />
          <AlertDialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isVerifying}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={otp.length !== 6 || isVerifying}
            >
              {isVerifying ? 'Verifying...' : 'Verify & Complete'}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const TrackDonations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState<string | null>(null);
  const [isOTPDialogOpen, setIsOTPDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  // Fetch the logged-in NGO's location (assuming it's stored in context or state)
  const loggedInNGO = {
    location: 'NGO Location Address', // Replace with actual NGO location from your state/context
  };

  useEffect(() => {
    fetchAcceptedDonations();
  }, []);

  const fetchAcceptedDonations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_Backend_URL}/api/donations/accepted`,
        { withCredentials: true }
      );
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching accepted donations:", error);
      enqueueSnackbar('Failed to fetch donations', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    if (!selectedDonation) return;

    try {
      setIsVerifying(true);
      // First verify OTP
      await axios.post(
        `${import.meta.env.VITE_Backend_URL}/api/donations/${selectedDonation}/verify-otp`,
        { otp },
        { withCredentials: true }
      );

      // If OTP is valid, complete the delivery
      await axios.patch(
        `${import.meta.env.VITE_Backend_URL}/api/donations/${selectedDonation}/complete`,
        {},
        { withCredentials: true }
      );
      
      setDonations(prev => prev.filter(d => d._id !== selectedDonation));
      enqueueSnackbar('Delivery completed successfully!', { variant: 'success' });
      setIsOTPDialogOpen(false);
      setSelectedDonation(null);
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      enqueueSnackbar(
        error.response?.data?.message || 'Failed to verify OTP',
        { variant: 'error' }
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCompleteDelivery = (donationId: string) => {
    setSelectedDonation(donationId);
    setIsOTPDialogOpen(true);
  };

  const handleShowMap = (pickupLocation: string) => {
    // Set origin (NGO's location) and destination (donor's pickup location)
    setOrigin(loggedInNGO.location);
    setDestination(pickupLocation);
    setShowMap(true); // Show the map
  };

  const handleCloseMap = () => {
    setShowMap(false); // Hide the map
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
      <h2 className='text-2xl font-semibold mb-6'>Track Accepted Donations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.length > 0 ? (
          donations.map((donation) => (
            <Card key={donation._id} className="w-full">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{donation.foodType}</span>
                  <Badge variant="secondary">{donation.status}</Badge>
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
                </div>

                <div className="border-t pt-2">
                  <p className="text-sm">
                    <span className="font-medium">Donor: </span>
                    {donation.donor.name}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <Button 
                  className="w-full"
                  variant="default"
                  onClick={() => handleCompleteDelivery(donation._id)}
                >
                  Complete Delivery
                </Button>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => handleShowMap(donation.pickupLocation)}
                >
                  View Map
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No accepted donations found.
          </p>
        )}
      </div>

      {/* Show the MapComponent in a centered pop-up */}
      <AlertDialog open={showMap} onOpenChange={handleCloseMap}>
        <AlertDialogContent className="max-w-4xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Route Map</AlertDialogTitle>
          </AlertDialogHeader>
          <MapComponent origin={user.location} destination={destination} />
          <AlertDialogFooter>
            <Button onClick={handleCloseMap}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <OTPDialog
        isOpen={isOTPDialogOpen}
        onClose={() => {
          setIsOTPDialogOpen(false);
          setSelectedDonation(null);
        }}
        onSubmit={handleVerifyOTP}
        isVerifying={isVerifying}
      />
    </div>
  );
};

export default TrackDonations;