import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Donate: React.FC = () => {
  const [formData, setFormData] = useState({
    donorName: '',
    phoneNumber: '',
    location: '',
    address: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    donorName: '',
    phoneNumber: '',
    location: '',
    address: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: value ? '' : `This field is required`,
    });
  };

  const validateForm = () => {
    const newErrors = {
      donorName: formData.donorName ? '' : 'Donor Name is required',
      phoneNumber: formData.phoneNumber ? '' : 'Phone Number is required',
      location: formData.location ? '' : 'Location/City is required',
      address: formData.address ? '' : 'Address is required',
      email: formData.email ? (/\S+@\S+\.\S+/.test(formData.email) ? '' : 'Invalid email format') : 'Email is required',
      password: formData.password ? (formData.password.length >= 8 ? '' : 'Password must be at least 8 characters') : 'Password is required',
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
    } else {
      console.log('Form has errors. Please fill out all fields.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 relative">
        <img
          src="/src/assets/form/Donate-form.png"
          alt="Food Donation"
          className="w-full h-64 lg:h-screen object-cover"
        />
        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-white text-3xl lg:text-5xl font-bold text-center">
            Donate Food, Create Hope
          </h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 min-h-screen bg-gray-100 py-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 lg:mx-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Profile Creation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className={cn("space-y-6")}>
              {/* Donor Name */}
              <div className="grid gap-2">
                <Label htmlFor="donorName" className="text-lg font-medium">
                  Donor Name
                </Label>
                <Input
                  id="donorName"
                  name="donorName"
                  type="text"
                  value={formData.donorName}
                  onChange={handleChange}
                  required
                  className="text-lg p-3" // Increased font size and padding
                />
                {errors.donorName && (
                  <p className="text-sm text-red-500">{errors.donorName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber" className="text-lg font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="text-lg p-3" // Increased font size and padding
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Email Address */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-lg font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="text-lg p-3" // Increased font size and padding
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-lg font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="text-lg p-3" // Increased font size and padding
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Location/City */}
              <div className="grid gap-2">
                <Label htmlFor="location" className="text-lg font-medium">
                  Location/City
                </Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="text-lg p-3" // Increased font size and padding
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location}</p>
                )}
              </div>

              {/* Address */}
              <div className="grid gap-2">
                <Label htmlFor="address" className="text-lg font-medium">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="text-lg p-3" // Increased font size and padding
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center items-center">
                <Button className="bg-pink-600 hover:bg-pink-500 text-white text-2xl py-7 px-10 rounded-lg">
                  Confirm Donate
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Donate;