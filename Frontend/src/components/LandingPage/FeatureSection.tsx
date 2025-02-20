

import React from 'react';
import foodWaste from "@/assets/Landinpage_img/foodWaste.jpg";
import heroImg1 from "@/assets/Landinpage_img/heroimg1.jpg";
import carbonFootprint from "@/assets/Landinpage_img/carbonFootprint.jpg";
import community from "@/assets/Landinpage_img/community.jpg";
import sustainable from "@/assets/Landinpage_img/sustainable.jpg";
import redistribution from "@/assets/Landinpage_img/redistribution.png";
import { ChefHat, Users,Goal} from 'lucide-react'; // Import Lucide icons
export const FeatureSection = () => {
  return (
    <div className="bg-white md:py-1">
      <div className="container py-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12">
          Helping the world through <span className="text-green-600">The SharePlate Platform</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Feature Cards */}
  {[
    { img: foodWaste, title: "Reduce Food Waste", desc: "Cut the food going to waste. Donate to hungry stomachs." },
    { img: heroImg1, title: "Solve Global Food Crisis", desc: "Solve the global food crisis. End pollution." },
    { img: carbonFootprint, title: "Minimize Carbon Footprints", desc: "Minimize carbon footprints. Save the planet." },
    { img: community, title: "Community Impact", desc: "Build stronger communities. Share the love." },
    { img: redistribution, title: "Efficient Food Redistribution", desc: "Supporting a hunger-free future through collective action." },
    { img: sustainable, title: "Sustainable Impact", desc: "Creating a solution for food management." },
  ].map((feature, index) => (
    <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="w-32 h-32 mx-auto mb-4">
        <img 
          src={feature.img}
          alt={feature.title}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.desc}</p>
    </div>
  ))}
</div>

      </div>


     

<div className="bg-green-100 py-12 md:py-20">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
    {/* Section Heading */}
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12">
      Our Impact
    </h2>
    {/* Section Description */}
    <p className="text-lg text-gray-700 mb-12 text-center max-w-2xl mx-auto">
      Together, we have achieved incredible milestones in our mission to reduce food waste and fight hunger.
    </p>

    {/* Impact Metrics Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Meals Shared */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ChefHat  className="w-8 h-8 text-green-600" /> {/* Lucide icon for meals */}
        </div>
        <h3 className="text-4xl font-bold text-green-600 mb-4">10,000+</h3>
        <p className="text-lg text-gray-700">Meals Shared</p>
      </div>

      {/* Supporters */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-8 h-8 text-blue-600" /> {/* Lucide icon for supporters */}
        </div>
        <h3 className="text-4xl font-bold text-blue-600 mb-4">5,000+</h3>
        <p className="text-lg text-gray-700">Supporters</p>
      </div>

      {/* Goals Achieved */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Goal  className="w-8 h-8 text-red-600" /> {/* Lucide icon for goals */}
        </div>
        <h3 className="text-4xl font-bold text-red-600 mb-4">500+</h3>
        <p className="text-lg text-gray-700">Goals Achieved</p>
      </div>
    </div>
  </div>
</div>

    </div> 
  );
};


