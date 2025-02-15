import React from 'react';


// Define props type
interface HeroProps {
  className?: string;
}


const Hero: React.FC<HeroProps> = ({ className }) => {

  return (
    <div className={`relative bg-white py-12 md:py-20 overflow-hidden ${className}`}>
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-64 h-64 bg-green-100 rounded-full opacity-50 -top-32 -left-32"></div>
        <div className="absolute w-48 h-48 bg-green-200 rounded-full opacity-50 top-1/4 -right-24"></div>
        <div className="absolute w-32 h-32 bg-green-300 rounded-full opacity-50 bottom-0 left-1/4"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column for Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 text-gray-900 font-serif">
              Let's transform the world;
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 lg:mb-8 text-green-600 font-sans">
              From Hungree to Hunger-Free
            </h2>
            <p className="text-lg sm:text-xl mb-6 lg:mb-8 text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Where almost 850 million people are starving daily,
              but millions of tons of edible food go into the trash
              every day! Hungree is on a mission to meet both
              worlds by creating an app to donate and receive
              food that's otherwise wasted!
            </p>
            <button className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105">
              One Step Towards Donation!
            </button>
          </div>

          {/* Right Column for Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <img 
              src="assests/heroImg2.jpg" // Replace with your image path
              alt="Hero Image"
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
