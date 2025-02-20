import React from "react";
import {
  GalleryVerticalEnd,
  Clock4,
  MessageSquareDiff,
  MapPinCheck,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Notification = () => {
  const notify = [
    {
      heading: "NGO A",
      description: "NGO A accepts their donation",
      date: "29 Feb, 2024",
      time: "4:35 AM",
      location: "Mumbai, India",
    },
    {
      heading: "NGO C",
      description: "NGO C accepts their donation",
      date: "1 March, 2024",
      time: "10:00 AM",
      location: "Satara,maharashtra",
    },
    {
      heading: "NGO B",
      description: "NGO B accepts their donation",
      date: "1 March, 2024",
      time: "10:00 AM",
      location: "Satara,maharashtra",
    },
  ];

  return (
    <div className="p-8 min-h-screen  bg-gray-100 flex flex-col ">
      {/* Header */}
      <div className="text-3xl  font-semibold text-gray-900 mb-6">
        <h1>Notifications</h1>
      </div>

      {/* Notification List */}
      <div className="w-4/5 space-y-4">
        {notify.map((notification, index) => {
          // Assign different background colors conditionally
          const bgColor = index % 3 === 0;

          ("bg-gray-200 text-gray-500");

          return (
            <div
              key={index}
              className={`p-4 flex gap-4 items-start rounded-lg shadow-md transition-all duration-300 ${bgColor}`}
            >
              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="w-6 h-6 text-blue-400" />
              </div>

              {/* Notification Content */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {notification.heading}
                </h2>
                <p className="mt-1 text-sm opacity-80">
                  {notification.description}
                </p>

                {/* Date & Time */}
                <p className="mt-2 text-xs opacity-60 flex items-center gap-2">
                  <Clock4 className="w-3" />
                  <span className="italic">
                    {notification.date} at {notification.time}
                  </span>
                  <MapPinCheck className="w-4" />
                  <span className="italic">{notification.location}</span>
                </p>
              </div>

              {/* Message Icon */}
              <MessageSquareDiff className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-700 transition-all duration-300" />
            </div>
          );
        })}

        {/* Divider */}
        {notify.length > 1 && <Separator className="mt-2 opacity-30" />}
      </div>
    </div>
  );
};

export default Notification;
