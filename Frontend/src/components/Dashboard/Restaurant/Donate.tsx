import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from "react-router-dom";

const Donate: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    location: '',
    address: '',
    donationQuantity: '',
    donationImage: null as File | null,
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    location: '',
    address: '',
    donationQuantity: '',
    donationImage: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      // Handle file input
      if (e.target.files) {
        setFormData({
          ...formData,
          [name]: e.target.files[0],
        });
        setErrors({
          ...errors,
          [name]: '',
        });
      }
    } else {
      // Handle other inputs (text, number, etc.)
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: value ? '' : `This field is required`,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: formData.fullName ? '' : 'Full Name is required',
      phoneNumber: formData.phoneNumber ? '' : 'Phone Number is required',
      location: formData.location ? '' : 'Location/City is required',
      address: formData.address ? '' : 'Address is required',
      donationQuantity: formData.donationQuantity ? '' : 'Donation Quantity is required',
      donationImage: formData.donationImage ? '' : 'Donation Image is required',
    };

    setErrors(newErrors);

    // Check if all fields are filled
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted successfully:', formData);
    } else {
      console.log('Form has errors. Please fill out all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r   py-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-4 md:mx-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center text-gray-800">
            Donation Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="text-sm md:text-base font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 w-full"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phoneNumber" className="text-sm md:text-base font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 w-full"
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Location/City */}
            <div>
              <Label htmlFor="location" className="text-sm md:text-base font-medium text-gray-700">
                Pickup Location
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 w-full"
              />
              {errors.location && (
                <p className="text-sm text-red-500 mt-1">{errors.location}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="text-sm md:text-base font-medium text-gray-700">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 w-full"
              />
              {errors.address && (
                <p className="text-sm text-red-500 mt-1">{errors.address}</p>
              )}
            </div>

            {/* Donation Item Quantity */}
            <div>
              <Label htmlFor="donationQuantity" className="text-sm md:text-base font-medium text-gray-700">
                Food Donation Quantity (Person Count)
              </Label>
              <Input
                id="donationQuantity"
                name="donationQuantity"
                type="number"
                value={formData.donationQuantity}
                onChange={handleChange}
                className="mt-1 w-full"
              />
              {errors.donationQuantity && (
                <p className="text-sm text-red-500 mt-1">{errors.donationQuantity}</p>
              )}
            </div>

            {/* Upload Donation Item Image */}
            <div>
              <Label htmlFor="donationImage" className="text-sm md:text-base font-medium text-gray-700">
                Upload Donation Item Image
              </Label>
              <Input
                id="donationImage"
                name="donationImage"
                type="file"
                onChange={handleChange}
                className="mt-1 w-full"
              />
              {errors.donationImage && (
                <p className="text-sm text-red-500 mt-1">{errors.donationImage}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center items-center">
              <Link to="/restaurant/thanks">
                <Button className="bg-red-600 hover:bg-red-500 text-white text-base md:text-lg py-4 px-8 rounded-lg">
                  Confirm Donate
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Donate;