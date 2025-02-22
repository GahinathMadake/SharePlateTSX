import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from "react-router-dom";
import { Textarea } from '@/components/ui/textarea';
import { Upload, Calendar, MapPin, Pizza, ClipboardList, FileText } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import imageCompression from 'browser-image-compression';
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
} from '@/components/ui/alert-dialog'; // Import Shadcn UI AlertDialog


const DonationForm: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    expirationDate: '',
    pickupLocation: '',
    address: '',
    description: '',
    name:"",
    donationImage: null as File | null,
  });

  const [errors, setErrors] = useState({
    foodType: '',
    quantity: '',
    expirationDate: '',
    pickupLocation: '',
    address: '',
    description: '',
    name:"",
    donationImage: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false); // State for confirmation dialog

  const compressImage = async (file: File): Promise<File> => {
    console.log(`Original image size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
      initialQuality: 0.7,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      console.log(`Compressed to: ${(compressedFile.size / (1024 * 1024)).toFixed(2)}MB`);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      throw error;
    }
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        if (file.size > 5 * 1024 * 1024) {
          setErrors({ ...errors, donationImage: 'Image size should be less than 5MB' });
          enqueueSnackbar('Image size should be less than 5MB', { variant: 'error' });
          return;
        }
        try {
          const compressedFile = await compressImage(file);
          setFormData({ ...formData, [name]: compressedFile });
          setErrors({ ...errors, [name]: '' });
        } catch (error) {
          setErrors({ ...errors, donationImage: 'Error processing image. Please try another image.' });
          enqueueSnackbar('Error processing image. Please try another image.', { variant: 'error' });
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: value ? '' : `This field is required` });
    }
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmationDialog(true); // Show confirmation dialog
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmationDialog(false);
    setIsSubmitting(true);
  
    try {
      if (!user) {
        enqueueSnackbar('Please login to submit a donation', { 
          variant: 'warning',
          anchorOrigin: { vertical: 'top', horizontal: 'right' }
        });
        navigate('/user/login');
        return;
      }

      let imageUrl = '';
      if (formData.donationImage) {
        try {
          const base64Image = await convertImageToBase64(formData.donationImage);
          const uploadResponse = await axios.post(
            `${import.meta.env.VITE_Backend_URL}/api/upload`,
            { base64Image, folder: 'donations' },
            { withCredentials: true, timeout: 30000 }
          );
          imageUrl = uploadResponse.data.url;
        } catch (error) {
          enqueueSnackbar('Failed to upload image. Please try a smaller image.', { 
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' }
          });
          setIsSubmitting(false);
          return;
        }
      }

      const donationData = {
        donor: user._id,
        foodType: formData.foodType,
        quantity: parseInt(formData.quantity),
        expirationDate: new Date(formData.expirationDate).toISOString(),
        pickupLocation: `${formData.pickupLocation}${formData.address ? ', ' + formData.address : ''}`,
        description: formData.description,
        name: formData.name,
        imageUrl,
      };

      // Create donation
      const response = await axios.post(
        `${import.meta.env.VITE_Backend_URL}/api/donations/create`,
        donationData,
        { withCredentials: true }
      );
  
      if (response.status === 201 && response.data.data._id) {
        // Match with nearby NGOs using the correct donation ID
        try {
          const matchResponse = await axios.post(
            `${import.meta.env.VITE_Backend_URL}/api/donations/match-ngos`,
            { 
              donorId: response.data.data._id,
              pickupLocation: donationData.pickupLocation,
              expirationDate: donationData.expirationDate
            },
            { 
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
  
          if (matchResponse.data.matches?.length > 0) {
            const matchCount = matchResponse.data.matches.length;
            enqueueSnackbar(
              `Donation created! Notified ${matchCount} nearby NGO${matchCount > 1 ? 's' : ''}.`, 
              {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                autoHideDuration: 5000
              }
            );
          } else {
            enqueueSnackbar(
              'Donation created successfully! No nearby NGOs found at the moment.', 
              {
                variant: 'info',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                autoHideDuration: 5000
              }
            );
          }
        } catch (matchError) {
          console.error('Error matching with NGOs:', matchError);
          if (axios.isAxiosError(matchError)) {
            enqueueSnackbar(
              `Donation created but failed to notify NGOs: ${matchError.response?.data?.error || 'Unknown error'}`,
              {
                variant: 'warning',
                anchorOrigin: { vertical: 'top', horizontal: 'right' }
              }
            );
          }
        }
  
        // Reset form
        setFormData({
          foodType: '',
          quantity: '',
          expirationDate: '',
          pickupLocation: '',
          address: '',
          description: '',
          name: "",
          donationImage: null
        });
  
        // Navigate to my donations page
        navigate('/user/Donar/mydonations');
      }
    } catch (error) {
      console.error('Donation submission error:', error);
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(
          error.response?.data?.message || 'Failed to submit donation',
          {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' }
          }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-2xl shadow-2xl border rounded-2xl bg-white p-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Donation Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              {
                label: 'Name of Food', 
                name: 'name', 
                icon: <FileText className="w-5 h-5" />,  
                type: 'text'
              },
              {
                label: 'Donation Description', 
                name: 'description', 
                icon: <FileText className="w-5 h-5" />, 
                component: Textarea,
                placeholder: 'Describe the food items, condition, and any other relevant details'
              },
              {
              label: 'Food Type', 
              name: 'foodType', 
              icon: <Pizza className="w-5 h-5" />,
              placeholder: 'e.g., Cooked Food, Packaged Food, etc.'
            }, 
            {
              label: 'Quantity (Servings)', 
              name: 'quantity', 
              icon: <ClipboardList className="w-5 h-5" />, 
              type: 'number',
              placeholder: 'Number of people it can serve'
            }, {
              label: 'Expiration Date', 
              name: 'expirationDate', 
              icon: <Calendar className="w-5 h-5" />, 
              type: 'datetime-local'
            }, {
              label: 'Pickup Location', 
              name: 'pickupLocation', 
              icon: <MapPin className="w-5 h-5" />,
              placeholder: 'Area/Locality'
            }, {
              label: 'Detailed Address', 
              name: 'address', 
              icon: <MapPin className="w-5 h-5" />, 
              component: Textarea,
              placeholder: 'Complete address with landmarks'
            },
          ].map(({ label, name, icon, type = 'text', component: Component = Input, placeholder }) => (
              <div key={name} className="space-y-1">
                <Label htmlFor={name} className="text-lg font-medium flex items-center gap-2 text-gray-700">
                  {icon} {label}
                </Label>
                <Component
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name as keyof typeof formData] as string}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-400"
                  required={name !== 'description'}
                />
                {errors[name as keyof typeof errors] && (
                  <p className="text-sm text-red-500">{errors[name as keyof typeof errors]}</p>
                )}
              </div>
            ))}

            <div className="space-y-1">
              <Label htmlFor="donationImage" className="text-lg font-medium flex items-center gap-2 text-gray-700">
                <Upload className="w-5 h-5" /> Upload Food Image
              </Label>
              <Input
                id="donationImage"
                name="donationImage"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-400"
              />
              {errors.donationImage && <p className="text-sm text-red-500">{errors.donationImage}</p>}
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-500 text-white text-lg py-3 px-6 rounded-xl shadow-md disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Confirm Donation'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Shadcn UI Confirmation Dialog */}
      <AlertDialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Donation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit this donation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmationDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSubmit}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DonationForm;