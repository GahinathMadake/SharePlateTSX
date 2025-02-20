import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from "react-router-dom";
import { Textarea } from '@/components/ui/textarea';
import { Upload, Phone, MapPin, User, ClipboardList } from 'lucide-react';

const DonationForm: React.FC = () => {
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
      if (e.target.files) {
        setFormData({ ...formData, [name]: e.target.files[0] });
        setErrors({ ...errors, [name]: '' });
      }
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: value ? '' : `This field is required` });
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
          <form className="space-y-5">
            {[{
              label: 'Full Name', name: 'fullName', icon: <User className="w-5 h-5" />
            }, {
              label: 'Phone Number', name: 'phoneNumber', icon: <Phone className="w-5 h-5" />, type: 'tel'
            }, {
              label: 'Pickup Location', name: 'location', icon: <MapPin className="w-5 h-5" />
            }, {
              label: 'Address', name: 'address', icon: <ClipboardList className="w-5 h-5" />, component: Textarea
            }, {
              label: 'Food Donation Quantity (Person Count)', name: 'donationQuantity', type: 'number', icon: <ClipboardList className="w-5 h-5" />
            }].map(({ label, name, icon, type = 'text', component: Component = Input }) => (
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
                  className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-400"
                />
                {errors[name as keyof typeof errors] && (
                  <p className="text-sm text-red-500">{errors[name as keyof typeof errors]}</p>
                )}
              </div>
            ))}

            <div className="space-y-1">
              <Label htmlFor="donationImage" className="text-lg font-medium flex items-center gap-2 text-gray-700">
                <Upload className="w-5 h-5" /> Upload Donation Item Image
              </Label>
              <Input
                id="donationImage"
                name="donationImage"
                type="file"
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-400"
              />
              {errors.donationImage && <p className="text-sm text-red-500">{errors.donationImage}</p>}
            </div>

            <div className="flex justify-center pt-4">
              <Link to="/user/Donar/confirmdonation">
                <Button className="bg-red-600 hover:bg-red-500 text-white text-lg py-3 px-6 rounded-xl shadow-md">
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

export default DonationForm;