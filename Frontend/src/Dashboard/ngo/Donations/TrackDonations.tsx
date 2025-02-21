import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from 'lucide-react';
import Spinner from '@/Animations/Spinner';
import { toast } from 'sonner';
import { useSnackbar } from 'notistack';

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

const TrackDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

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
      enqueueSnackbar('Failed to fetch donations', { 
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteDelivery = async (donationId: string) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_Backend_URL}/api/donations/${donationId}/complete`,
        {},
        { withCredentials: true }
      );
      
      setDonations(prev => prev.filter(d => d._id !== donationId));
      enqueueSnackbar('Delivery completed successfully!', { 
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
    } catch (error) {
      console.error("Error completing delivery:", error);
      enqueueSnackbar('Failed to complete delivery', { 
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

              <CardFooter>
                <Button 
                  className="w-full"
                  variant="default"
                  onClick={() => handleCompleteDelivery(donation._id)}
                >
                  Complete Delivery
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
    </div>
  );
};

export default TrackDonations;