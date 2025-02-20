import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, ArrowLeft } from "lucide-react";

const Contactus: React.FC = () => {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
    document: null,
  });

  const changeHandler = (event) => {
    const { name, value, type, files } = event.target;
    setContactDetails((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const formSubmitHandler = (event) => {
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
      <div className="w-full max-w-4xl p-6 bg-white/90 backdrop-blur-lg rounded-lg shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <h1 className="text-3xl font-bold font-cinzel mb-4">Contact Us</h1>
            <p className="text-muted-foreground">
              Have a question or feedback? Reach out, and we will get back to you as soon as possible.
            </p>
          </div>

          {/* Right Section - Contact Form */}
          <div>
            <form onSubmit={formSubmitHandler} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="flex items-center gap-2">
                  <Input id="name" name="name" value={contactDetails.name} onChange={changeHandler} placeholder="Enter your name" required />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-2">
                  <Input id="email" name="email" type="email" value={contactDetails.email} onChange={changeHandler} placeholder="Enter your email" required />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                  <Input id="phone" name="phone" type="tel" value={contactDetails.phone} onChange={changeHandler} placeholder="Enter your phone number" required />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="query">Message</Label>
                <Textarea id="query" name="query" value={contactDetails.query} onChange={changeHandler} placeholder="Enter your message" required rows={4} />
              </div>

              {/* Document Upload */}
              <div className="space-y-2">
                <Label htmlFor="document">Upload Document (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Upload size={18} />
                  <Input id="document" name="document" type="file" onChange={changeHandler} />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Button type="button" variant="secondary" onClick={() => window.history.back()} className="flex items-center gap-2">
                  <ArrowLeft size={18} /> Go Back
                </Button>
                <Button type="submit">Submit Now</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
