import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import userImage1 from '../../../assets/Donar_img/Newdonationimg1.png';
import userImage2 from '../../../assets/Donar_img/Newdonationimg2.png';
import userImage3 from '../../../assets/Donar_img/Newdonationimg3.png';

const Donatemain: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: userImage1,
      alt: "First slide",
      label: "SharePlate",
      description: "Your extra food can bring smiles to those in need.",
    },
    {
      src: userImage2,
      alt: "Second slide",
      label: "Feed the Hungry",
      description: "Join hands to eliminate hunger, one meal at a time.",
    },
    {
      src: userImage3,
      alt: "Third slide",
      label: "Share the Joy",
      description: "Small acts of kindness can make a big difference.",
    }
  ];

  const handleDonateClick = () => navigate("/user/Donar/donationForm");

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full min-h-screen bg-gray-100 shadow-lg rounded-none">
      <CardContent className="flex flex-col items-center p-4 sm:p-6">
        <div className="relative w-full max-w-4xl h-40 sm:h-80 overflow-hidden rounded-2xl shadow-xl mt-3 flex items-center justify-center">
          {images.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.alt}
              className={`absolute w-full h-full object-cover rounded-2xl transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 sm:p-6 text-white rounded-2xl">
            <h5 className="text-2xl sm:text-3xl font-bold mb-2">{images[currentIndex].label}</h5>
            <p className="text-base sm:text-lg mb-4">{images[currentIndex].description}</p>
            <Button
              className="self-end bg-gradient-to-r from-gray-800 to-green-700 hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
              onClick={handleDonateClick}
            >
              Donate Now
            </Button>
          </div>
          <button
            className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70"
            onClick={prevSlide}
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button
            className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70"
            onClick={nextSlide}
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="w-full max-w-3xl mt-8 sm:mt-7 flex flex-col items-start space-y-4 sm:space-y-6">
          <div className="w-full ">
          <CardTitle className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Welcome to SharePlate
            </CardTitle>
            <p className="text-lg sm:text-xl semibold text-gray-700 mt-2 sm:mt-4 mb-4">
              Donate Food, Create Hope!
            </p>
            {/* Contact Us Button */}
            <Button
              asChild // Use asChild to make Button render as a Link
              className="mt-2 text-sm sm:text-lg bg-gradient-to-r from-gray-900 to-gray-900 hover:from-gray-900 hover:to-gray-700"
            >
              <Link to="/user/Donar/donationForm">Please Donate</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Donatemain;
