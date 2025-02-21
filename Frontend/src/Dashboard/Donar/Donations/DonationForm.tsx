import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from "react-router-dom";
import { Textarea } from '@/components/ui/textarea';
import { Upload, Calendar, MapPin, Pizza, ClipboardList } from 'lucide-react';
import axios from 'axios';
import api, { getUserFromToken } from '../../../services/apiService';
import imageCompression from 'browser-image-compression';

const DonationForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    expirationDate: '',
    pickupLocation: '',
    address: '',
    donationImage: null as File | null,
  });

  const [errors, setErrors] = useState({
    foodType: '',
    quantity: '',
    expirationDate: '',
    pickupLocation: '',
    address: '',
    donationImage: '',
  });

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    
    try {
      return await imageCompression(file, options);
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
        
        // Validate file size (max 5MB before compression)
        if (file.size > 5 * 1024 * 1024) {
          setErrors({ 
            ...errors, 
            donationImage: 'Image size should be less than 5MB' 
          });
          return;
        }
  
        try {
          const compressedFile = await compressImage(file);
          setFormData({ ...formData, [name]: compressedFile });
          setErrors({ ...errors, [name]: '' });
        } catch (error) {
          setErrors({ 
            ...errors, 
            donationImage: 'Error processing image. Please try another image.' 
          });
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("[DonationForm] Form submission started");
  
    try {
      // Check if user is logged in and token is valid
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("[DonationForm] No token found, redirecting to login");
        navigate('/user/login');
        return;
      }

      console.log("[DonationForm] Token from local storage:", token);
  
      const user = getUserFromToken();
      if (!user || !user.id) {
        console.error("[DonationForm] No user information found, redirecting to login");
        navigate('/user/login');
        return;
      }
  
      // Upload image if present
      let imageUrl = '';
      if (formData.donationImage) {
        const base64Image = await convertImageToBase64(formData.donationImage);
        const uploadResponse = await api.post('/api/upload', {
          base64Image,
          folder: 'donations'
        });
        imageUrl = uploadResponse.data.url;
      }
  
      // Prepare donation data with donor ID
      const donationData = {
        donor: user.id, // Include donor ID from token
        foodType: formData.foodType,
        quantity: parseInt(formData.quantity),
        expirationDate: new Date(formData.expirationDate).toISOString(),
        pickupLocation: `${formData.pickupLocation}${formData.address ? ', ' + formData.address : ''}`,
        imageUrl
      };
  
      console.log("[DonationForm] Submitting donation with donor ID:", user.id);
  
      const response = await api.post('/api/donations/create', donationData);
  
      if (response.status === 201) {
        navigate('/user/Donar/mydonations');
      }
    } catch (error: any) {
      console.error('[DonationForm] Error submitting donation:', error);
  
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          alert('Your session has expired. Please login again.');
          navigate('/user/login');
        } else {
          alert(error.response?.data?.error || 'Failed to create donation');
        }
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
            {[{
              label: 'Food Type', 
              name: 'foodType', 
              icon: <Pizza className="w-5 h-5" />,
              placeholder: 'e.g., Cooked Food, Packaged Food, etc.'
            }, {
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
            }].map(({ label, name, icon, type = 'text', component: Component = Input, placeholder }) => (
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
                  required
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
    </div>
  );
};

export default DonationForm;