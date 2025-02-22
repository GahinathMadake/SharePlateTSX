import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Star, Phone, Mail } from "lucide-react"; // Import icons from Lucide React
import axios from "axios";
import Spinner from "@/Animations/Spinner";
import { Separator } from "@/components/ui/separator";
import IconAndLabel from "../ngo/common/IconandLable";
import { Link } from "react-router-dom";
import Fraud from '../common/Fraud';

function Review() {
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMyAllFeedBack() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_Backend_URL}/feedback/user/getDonorFeedBack`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setFeedback(response.data.feedback);
        }

        console.log(response.data.feedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
      setLoading(false);
    }

    getMyAllFeedBack();
  }, []);

  const formatToIST = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Events Based on your Donation</h2>
      <Separator />

      <Fraud />

      {loading && (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner />
        </div>
      )}

      {!loading && feedback && feedback.length > 0 ? (
        <div className="px-4 space-y-6 mt-6">
          {feedback.map((feedback) => (
            <Card
              key={feedback._id}
              className="p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image provided by NGO */}
                  <img
                    src={feedback.images[0]} // Use the first image from the feedback images array
                    alt="NGO Event"
                    className="w-1/3"
                  />

                {/* Feedback and NGO Details */}
                <div className="w-full md:w-2/3 space-y-4">
                  
                  
                  {/* Food Details */}
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feedback.donation.name}
                    </h3>
                    <p className="text-gray-600">{feedback.donation.description}</p>
                  </div>
                  

                  {/* NGO Details */}
                  <div>
                    <div className="flex items-center gap-2 mt-4 mb-2">
                      <img
                        src={feedback.ngo.profileImage}
                        alt={feedback.ngo.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <p className="text-gray-700 font-medium">{feedback.ngo.name}</p>
                    </div>

                    <Separator />

                    <p className="mt-2 text-gray-600">{feedback.ngo.about}</p>

                    <div className="py-2 flex justify-left items-center gap-4">
                      <IconAndLabel
                        item={{ label: feedback.ngo.email, icon: Mail }}
                      />
                      <IconAndLabel
                        item={{ label: feedback.ngo.phone, icon: Phone }}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Feedback Details</h3>
                    <p className="text-gray-600">{feedback.comment}</p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-2 text-gray-700">{feedback.rating} / 5</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Footer with Submitted Date */}
              <CardFooter className="mt-4 text-sm text-gray-500">
                Submitted on: {formatToIST(feedback.createdAt)}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-500 mt-6">No feedback found.</p>
      )}
    </div>
  );
}

export default Review;