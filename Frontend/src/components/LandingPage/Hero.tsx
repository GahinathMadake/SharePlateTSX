import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeartHandshake } from "lucide-react";
import heroImg from "@/assets/Landinpage_img/heroImg.jpg";

// Define props type
interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section
      className={cn(
        "relative bg-white py-12 md:py-20 overflow-hidden",
        className
      )}
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-64 h-64 bg-green-100 rounded-full opacity-50 -top-32 -left-32 animate-pulse"></div>
        <div className="absolute w-48 h-48 bg-green-200 rounded-full opacity-50 top-1/4 -right-24 animate-bounce"></div>
        <div className="absolute w-32 h-32 bg-green-300 rounded-full opacity-50 bottom-0 left-1/4 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Column for Content */}
          <div className="w-full lg:w-2/3 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 font-serif leading-tight">
              Fight Hunger with <span className="text-green-600">SharePlate</span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mt-4 text-green-600 font-sans">
              From <span className="text-gray-900">Hungree</span> to <span className="text-gray-900">Hunger-Free</span>
            </h2>
            <p className="text-lg sm:text-xl mt-6 text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join SharePlate in the fight against hunger! Every meal counts—turn excess food into a lifeline for those in
              need. Let’s reduce food waste and nourish communities together! 
              <span></span>   #FoodForAll #ZeroHunger #SharePlate  
            </p>
            <Button className="mt-6 bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105">
              One Step Towards Donation!
            </Button>
          </div>

          {/* Right Column for Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src={heroImg} // Use the imported image
              alt="Hero Image"
              width={500}
              height={500}
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;