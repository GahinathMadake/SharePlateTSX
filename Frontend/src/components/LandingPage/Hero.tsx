import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { cn } from "@/lib/utils";
// import { HeartHandshake } from "lucide-react"; // Lucide Icon
import heroImg from "@/assets/Landinpage_img/heroImg.jpg";
import { motion, AnimatePresence } from "framer-motion"; // Framer Motion for animations

// Define props type
interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const [showOverlay, setShowOverlay] = useState(true); // State for overlay visibility

  // Hide overlay after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 1500); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={cn(
        "relative bg-white py-12 md:py-20 overflow-hidden",
        className
      )}
    >
      {/* Background Shapes with Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Moving Balls */}
        <motion.div
          className="absolute w-64 h-64 bg-green-100 rounded-full opacity-50 -top-32 -left-32"
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        ></motion.div>
        <motion.div
          className="absolute w-48 h-48 bg-green-200 rounded-full opacity-50 top-1/4 -right-24"
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        ></motion.div>
        <div
          className="absolute w-32 h-32 bg-green-300 rounded-full opacity-50 bottom-0 left-1/4"
        ></div>
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Column for Content */}
          <motion.div
            className="w-full md:w-2/3 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 font-serif leading-tight">
              Fight Hunger with <span className="text-green-600">SharePlate</span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mt-4 text-green-600 font-sans">
              From <span className="text-gray-900">Hungree</span> to{" "}
              <span className="text-gray-900">Hunger-Free</span>
            </h2>
            <p className="text-lg sm:text-xl mt-6 text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join SharePlate in the fight against hunger! Every meal counts—turn
              excess food into a lifeline for those in need. Let’s reduce food
              waste and nourish communities together! <span></span> #FoodForAll
              #ZeroHunger #SharePlate
            </p>
            <motion.div
              className="mt-6"
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-green-600 text-white text-xl font-bold py-6 px-9 rounded-full hover:bg-green-700 transition duration-300 shadow-lg">
                One Step Towards Donation!
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column for Image */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={heroImg} // Use the imported image
              alt="Hero Image"
              width={400}
              height={400}
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-lg shadow-2xl"
            />
            {/* Overlay with "SharePlate" Text */}
            <AnimatePresence>
              {showOverlay && (
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-lg"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.h1
                    className="text-5xl font-bold text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    SharePlate
                  </motion.h1>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;