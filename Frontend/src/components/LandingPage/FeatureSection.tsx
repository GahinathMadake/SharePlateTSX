

import React from 'react';

export const FeatureSection = () => {
  return (
    <div className="bg-white md:py-20">
      <div className="container py-12 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12">
          Helping the world through <span className="text-green-600">The SharePlate Platform</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1: Reduce Food Waste */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <img 
              src="assests/foodWaste.jpg" // Replace with your image path
              alt="Reduce Food Waste"
              className="w-30 h-30 mx-auto mb-4 rounded-lg shadow-md"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reduce Food Waste</h3>
            <p className="text-gray-600">
              Cut the food going to waste. Donate to hungry stomachs.
            </p>
          </div>

          {/* Feature 2: Solve Global Food Crisis */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <img 
              src="assests/heroImg.jpg" // Replace with your image path
              alt="Solve Global Food Crisis"
              className="w-30 h-30 mx-auto mb-4 rounded-lg shadow-md"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Solve Global Food Crisis</h3>
            <p className="text-gray-600">
              Solve the global food crisis. End pollution.
            </p>
          </div>

          {/* Feature 3: Minimize Carbon Footprints */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <img 
              src="assests/carbonFootprint.jpg" // Replace with your image path
              alt="Minimize Carbon Footprints"
              className="w-30 h-30 mx-auto mb-4 rounded-lg shadow-md"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Minimize Carbon Footprints</h3>
            <p className="text-gray-600">
              Minimize carbon footprints. Save the planet.
            </p>
          </div>

          {/* Feature 4: Community Impact */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <img 
              src="assests/community.jpg" // Replace with your image path
              alt="Community Impact"
              className="w-30 h-30 mx-auto mb-4 rounded-lg shadow-md"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Impact</h3>
            <p className="text-gray-600">
              Build stronger communities. Share the love.
            </p>
          </div>

          {/* Feature 5: Feature Name */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <img 
              src="path-to-feature5-icon.png" // Replace with your image path
              alt="Feature 5"
              className="w-30 h-30 mx-auto mb-4 rounded-lg shadow-md"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Feature 5</h3>
            <p className="text-gray-600">
              Description for Feature 5.
            </p>
          </div>

          {/* Feature 6: Feature Name */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <img 
              src="path-to-feature6-icon.png" // Replace with your image path
              alt="Feature 6"
              className="w-30 h-30 mx-auto mb-4 rounded-lg shadow-md"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Feature 6</h3>
            <p className="text-gray-600">
              Description for Feature 6.
            </p>
          </div>
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
                <img 
                  src="path-to-meals-icon.png" // Replace with your icon path
                  alt="Meals Shared"
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-4xl font-bold text-green-600 mb-4">10,000+</h3>
              <p className="text-lg text-gray-700">Meals Shared</p>
            </div>

            {/* Supporters */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <img 
                  src="path-to-supporters-icon.png" // Replace with your icon path
                  alt="Supporters"
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-4xl font-bold text-blue-600 mb-4">5,000+</h3>
              <p className="text-lg text-gray-700">Supporters</p>
            </div>

            {/* Goals Achieved */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <img 
                  src="path-to-goals-icon.png" // Replace with your icon path
                  alt="Goals Achieved"
                  className="w-8 h-8"
                />
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


