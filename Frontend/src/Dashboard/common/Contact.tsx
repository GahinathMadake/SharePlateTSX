import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {  ArrowLeft } from "lucide-react";

interface ContactDetails {
  name: string;
  email: string;
  phone: string;
  query: string;
  document: File | null;
}

const Contactus: React.FC = () => {
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    name: "",
    email: "",
    phone: "",
    query: "",
    document: null,
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target as HTMLInputElement;
    
    if (type === "file") {
      const fileInput = event.target as HTMLInputElement;
      setContactDetails((prevData) => ({
        ...prevData,
        document: fileInput.files ? fileInput.files[0] : null,
      }));
    } else {
      setContactDetails((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(contactDetails);
    event.preventDefault();

    const { name, email, phone, query } = contactDetails;

    if (!name || !email || !phone || !query) {
      alert("All fields except document upload are required.");
      return;
    }

    setContactDetails({ name: "", email: "", phone: "", query: "", document: null });
    alert("Your query has been submitted successfully!");
  };

  return (
    <div className="flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 min-h-screen">


        <div className="max-w-4xl p-4 border shadow-sm rounded-sm grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <h1 className="text-3xl font-bold font-cinzel mb-4">Contact Us</h1>
            <p className="text-muted-foreground">
              Have a question or feedback? Reach out, and we will get back to you as soon as possible.
            </p>
          </div>

          {/* Right Section - Contact Form */}
          <div>
            <form onSubmit={formSubmitHandler} className="">
              
              {/* Full Name */}
              <div className="py-2 space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                    id="name" 
                    name="name" 
                    value={contactDetails.name} 
                    onChange={changeHandler} 
                    placeholder="Enter your name" 
                    required 
                />
              </div>

              {/* Email */}
              <div className="py-2 space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                    id="email"
                    name="email" 
                    type="email" 
                    value={contactDetails.email} 
                    onChange={changeHandler} 
                    placeholder="Enter your email" 
                    required 
                />
              </div>

              {/* Phone Number */}
              <div className=" py-2 space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    value={contactDetails.phone} 
                    onChange={changeHandler} 
                    placeholder="Enter your phone number" 
                    required 
                />
              </div>

              {/* Message */}
              <div className="py-2 space-y-2">
                <Label htmlFor="query">Message</Label>
                <Textarea 
                    id="query" 
                    name="query" 
                    value={contactDetails.query} 
                    onChange={changeHandler} 
                    placeholder="Enter your message" 
                    required 
                    rows={4}
                />
              </div>

              {/* Document Upload */}
              <div className="py-2 space-y-2">
                <Label htmlFor="document">Upload Document (Optional)</Label>
                  <Input 
                    id="document" 
                    name="document" 
                    type="file" 
                    onChange={changeHandler}
                />
              </div>

              {/* Buttons */}
              <div className="py-2 mt-3 flex flex-col sm:flex-row justify-between gap-4">
                <Button type="button" onClick={() => window.history.back()} className="flex items-center gap-2">
                  <ArrowLeft size={18} /> Go Back
                </Button>
                <Button type="submit">Submit Now</Button>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Contactus;
