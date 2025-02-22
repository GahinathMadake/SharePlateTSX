import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star } from 'lucide-react';
import Spinner from '@/Animations/Spinner';
import { useSnackbar } from 'notistack';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Donation {
  _id: string;
  foodType: string;
  quantity: number;
  expirationDate: string;
  pickupLocation: string;
  description: string;
  imageUrl: string;
  status: string;
  donor?: {
    _id: string;
    name: string;
  };
  hasFeedback: boolean;
}

interface FeedbackDetails {
  rating: number;
  comment: string;
  images: string[];
  createdAt?: string;
  ngoName?: string;
}

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: FeedbackDetails | null;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ isOpen, onClose, feedback }) => {
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
                className={`h-5 w-5 ${index < (feedback.rating || 0) ? "fill-yellow-400" : "text-gray-300"}`}
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
          {feedback.createdAt && (
            <p className="text-sm text-gray-500">
              Submitted on: {new Date(feedback.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const MyDonations: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedDonation, setSelectedDonation] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [feedbackDetails, setFeedbackDetails] = useState<FeedbackDetails | null>(null);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_Backend_URL}/api/donations/my-accepted-delivered`,
        { withCredentials: true }
      );

      // Transform and validate the data
      const validatedDonations = response.data.map((donation: any) => ({
        ...donation,
        donor: donation.donor || { name: 'Anonymous' },
        hasFeedback: !!donation.hasFeedback
      }));

      setDonations(validatedDonations);
    } catch (error) {
      console.error("Error fetching donations:", error);
      enqueueSnackbar('Failed to fetch donations', { 
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (files: File[]) => {
    if (!files || files.length === 0) return [];
    
    const uploadedUrls: string[] = [];
    setUploadingImages(true);
  
    try {
      for (const file of files) {
        const reader = new FileReader();
        
        const imageUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = async (e) => {
            try {
              const base64Image = e.target?.result as string;
              const response = await axios.post(
                `${import.meta.env.VITE_Backend_URL}/api/upload`,
                { base64Image, folder: 'feedback' },
                { withCredentials: true }
              );
              
              if (response.data.success) {
                resolve(response.data.url);
              } else {
                reject(new Error('Upload failed'));
              }
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(file);
        });
  
        uploadedUrls.push(imageUrl);
      }
      return uploadedUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      enqueueSnackbar('Failed to upload images', { variant: 'error' });
      return [];
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmitFeedback = async (donationId: string) => {
    if (!selectedRating) {
      enqueueSnackbar('Please select a rating', { variant: 'warning' });
      return;
    }

    try {
      const imageUrls = selectedImages.length > 0 ? 
        await handleImageUpload(selectedImages) : 
        [];
  
      await axios.post(
        `${import.meta.env.VITE_Backend_URL}/api/donations/${donationId}/feedback`,
        {
          rating: selectedRating,
          comment,
          images: imageUrls
        },
        { withCredentials: true }
      );
      
      setDonations(prev => 
        prev.map(d => d._id === donationId ? {...d, hasFeedback: true} : d)
      );
      
      enqueueSnackbar('Feedback submitted successfully!', { variant: 'success' });
      
      // Reset form
      setSelectedRating(0);
      setComment('');
      setSelectedImages([]);
      setSelectedDonation(null);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      enqueueSnackbar('Failed to submit feedback', { variant: 'error' });
    } finally {
      setUploadingImages(false);
    }
  };

  const getFeedbackDetails = async (donationId: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_Backend_URL}/api/donations/${donationId}/feedback`,
        { withCredentials: true }
      );
      
      if (response.data) {
        setFeedbackDetails(response.data);
        setIsFeedbackDialogOpen(true);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      enqueueSnackbar('Failed to fetch feedback details', { variant: 'error' });
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
      <h2 className='text-2xl font-semibold mb-6'>My Donations</h2>
      
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
                </div>

                <div className="border-t pt-2">
                  <p className="text-sm">
                    <span className="font-medium">Donor: </span>
                    {donation.donor?.name || 'Anonymous'}
                  </p>
                </div>
              </CardContent>

              <CardFooter>
                {donation.status === 'delivered' && !donation.hasFeedback && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full"
                        variant="default"
                        onClick={() => setSelectedDonation(donation._id)}
                      >
                        Give Feedback
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Provide Feedback</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Button
                              key={rating}
                              variant={selectedRating === rating ? "default" : "outline"}
                              onClick={() => setSelectedRating(rating)}
                            >
                              <Star className={selectedRating >= rating ? "fill-current" : ""} />
                            </Button>
                          ))}
                        </div>
                        <Textarea
                          placeholder="Share your experience..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="space-y-2">
                          <Label htmlFor="images">Event Images</Label>
                          <Input
                            id="images"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setSelectedImages(Array.from(e.target.files || []))}
                            className="cursor-pointer"
                          />
                          <p className="text-sm text-gray-500">
                            Upload images from the food donation event
                          </p>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => handleSubmitFeedback(donation._id)}
                          disabled={selectedRating === 0 || uploadingImages}
                        >
                          {uploadingImages ? 'Uploading...' : 'Submit Feedback'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                {donation.status === 'delivered' && donation.hasFeedback && (
                  <div className="w-full">
                    <Badge variant="outline" className="w-full text-center">
                      Feedback Submitted
                    </Badge>
                    <Button
                      variant="link"
                      className="w-full mt-2"
                      onClick={() => getFeedbackDetails(donation._id)}
                    >
                      View Feedback
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No donations found.
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

export default MyDonations;