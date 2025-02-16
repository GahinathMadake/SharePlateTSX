import React from 'react';

export const AppUsageSection = () => {
  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12">
          How does <span className="text-green-600">The SharePlate Platform</span> help stop food waste?
        </h2>

        {/* Steps Container */}
        <div className="space-y-8">

          {/* Step 1: Download the App */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
            {/* Green Circle with Number */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-0">
              <p className="text-green-600 text-2xl font-bold">1</p>
            </div>
            {/* Step Content */}
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Download the App</h3>
              <p className="text-gray-600">
                Get started by downloading the HungreeApp from the App Store or Google Play.
              </p>
            </div>
          </div>

          {/* Step 2: Register Yourself */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
            {/* Green Circle with Number */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-0">
              <p className="text-green-600 text-2xl font-bold">2</p>
            </div>
            {/* Step Content */}
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Register Yourself</h3>
              <p className="text-gray-600">
                Sign up with your credentials and join the HungreeApp community.
              </p>
            </div>
          </div>

          {/* Step 3: Donate or Request Food */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
            {/* Green Circle with Number */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-0">
              <p className="text-green-600 text-2xl font-bold">3</p>
            </div>
            {/* Step Content */}
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Donate or Request Food</h3>
              <p className="text-gray-600">
                Donate excess meals or request food from nearby donors.
              </p>
            </div>
          </div>

          {/* Step 4: Track in Real-Time */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
            {/* Green Circle with Number */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-0">
              <p className="text-green-600 text-2xl font-bold">4</p>
            </div>
            {/* Step Content */}
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track in Real-Time</h3>
              <p className="text-gray-600">
                Track your donations or requests in real-time within the app.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
