import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { Smile } from "lucide-react"; // Import the Smile icon

const Donatemain: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle button click
  const handleDonateClick = () => {
    navigate("/restaurant/donate"); // Navigate to the donate page
  };

  return (
    <div className="relative w-full h-90 overflow-hidden bg-gradient-to-r  flex flex-col justify-center items-center text-center mt-10">
      {/* Fade-in animation for the entire container */}
      <div className="animate-fadeIn">
        {/* Sliding Text */}
        <div className="animate-slideIn">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            Please Donate Here{" "}
            <Smile className="ml-4 w-12 h-12 text-pink-600" /> {/* Larger Smile icon */}
          </h1>
          <p className="text-1xl text-gray-600 mt-2">
            Your Extra Food, Someone’s Full Plate!
          </p>
        </div>

        {/* Donate Button */}
        <button
          className="mt-5 px-7 py-2 text-lg text-white bg-pink-600 rounded-lg hover:bg-pink-500 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
          onClick={handleDonateClick}
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default Donatemain;