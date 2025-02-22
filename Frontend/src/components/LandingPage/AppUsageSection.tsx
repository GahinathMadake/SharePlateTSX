import React from 'react';
import Stepsfood from "@/assets/Landinpage_img/Stepsfood.png";
import {  User, List, Search, Truck, MessageSquare } from 'lucide-react'; // Lucide Icons
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // shadcn/ui Card Component

export const AppUsageSection = () => {
  const steps = [
    { 
      number: "1", 
      title: "Register on the Website", 
      description: "Sign up with your credentials on the SharePlate website and become a part of the community.",
      icon: <User className="w-8 h-8 text-gray-900" /> 
    },
    { 
      number: "2", 
      title: "List Food for Donation", 
      description: "If you have surplus food, list it on the website, making it available to NGOs and individuals in need.",
      icon: <List className="w-8 h-8 text-gray-900" /> 
    },
    { 
      number: "3", 
      title: "Browse & Request Food", 
      description: "NGOs and individuals can browse available food donations and request items based on their needs.",
      icon: <Search className="w-8 h-8 text-gray-900" /> 
    },
    { 
      number: "4", 
      title: "Coordinate Pickup or Delivery", 
      description: "Donors and recipients can communicate and arrange for food pickup or delivery through the platform.",
      icon: <Truck className="w-8 h-8 text-gray-900" /> 
    },
    { 
      number: "5", 
      title: "Provide Feedback & Track Impact", 
      description: "Share feedback and track the impact of donations to improve the experience and encourage more participation.",
      icon: <MessageSquare className="w-8 h-8 text-gray-900" /> 
    },
  ];

  return (
    <div className="bg-white py-6 md:py-4">
      {/* Heading Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12">
          How does <span className="text-green-600">The SharePlate Platform</span> help stop food waste?
        </h2>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl flex flex-col lg:flex-row justify-center items-center">
        {/* Left Section: Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src={Stepsfood}
            alt="How it works"
            className="w-full max-w-md lg:max-w-lg"
          />
        </div>

        {/* Right Section: Steps */}
        <div className="w-full lg:w-1/2 space-y-8 mt-10 lg:mt-0 lg:pl-12">
          {steps.map((step, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-x-4">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-gray-600">
                  {step.icon}
                </div>
                {/* Content */}
                <div className="text-left">
                  <CardTitle className="text-xl font-semibold text-gray-900 mb-2">{step.title}</CardTitle>
                  <CardDescription className="text-gray-600">{step.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};