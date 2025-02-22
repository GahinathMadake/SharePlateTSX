import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { 
  MapPin,
  HandPlatter,
  Phone 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import IconAndLabel from "../common/IconandLable";
import { enqueueSnackbar } from "notistack";

import axios from "axios";

interface Donor {
  name: string;
  email: string;
  about:string,
  phone: string;
  location: string;
  profileImage: string;
}

interface Donation {
  _id: string;
  description: string;
  name:string;
  donor: string;
  foodType: string;
  imageUrl: string;
  pickupLocation: string;
  quantity: number;
  status: string;
  createdAt: string;
  expirationDate: string;
}

interface DonationProp {
  donation: Donation;
}

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

const Card: React.FC<DonationProp> = ({ donation }) => {
  const [donorData, setDonorData] = useState<Donor>({
    name: "",
    about:"",
    email: "",
    phone: "",
    location: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchDonorHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_Backend_URL}/user/donor/${donation.donor}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setDonorData(response.data.donor);
      }
    } catch (error) {
      console.error("Error fetching donor details:", error);
    }
    setLoading(false);
  };


  const addDonationToUser = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_Backend_URL}/api/donations/${donation._id}/assign`,
        {},
        {withCredentials: true,}
      );
  
      if (response.data.success) {
        enqueueSnackbar("Congrates, Donation is yours", { variant: "success" });
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      console.error("Error assigning donation:", error);
      enqueueSnackbar("Unable to reserve Food", { variant: "error" });
    }
  };



  return (
    <div className="w-[300px] p-3 bg-sidebar rounded-lg shadow-xl border">
      <img
        src={donation.imageUrl}
        alt={donation.foodType}
        className="w-full object-cover rounded-md"
      />

      <div className="py-2 flex justify-between">
        <IconAndLabel item={{label:donation.pickupLocation, icon:MapPin}} />
        <IconAndLabel item={{label:donation.foodType, icon:HandPlatter}} />
      </div>

      <h1 className="opacity-90 py-1 text-xl font-semibold">
        {donation.name}
      </h1>

      <p className="opacity-70">{donation.description}</p>

      <p className="text-md my-2">
        <span className="font-semibold">Expiry Time:</span>{" "}
        {formatToIST(donation.expirationDate)}
      </p>

      <div className="mt-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button onClick={fetchDonorHandler} disabled={loading}>
              {loading ? "Loading..." : "Reserve"}
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex gap-4">
                <img
                  src={donation.imageUrl}
                  alt={donation.description}
                  className="w-1/2 rounded-lg"
                />
                <div className="w-1/2">
                  {
                    loading ? (
                      <p className="text-gray-500">Fetching donor details...</p>
                    ) : donorData ? (
                      <>
                        <div className="flex items-center gap[5px] mt-4">
                          <img src={donorData.profileImage} alt={donorData.name} className="w-[30px] h-[30px] rounded-full" />
                          <p className="ml-2 opacity-90">{donorData.name}</p>
                        </div>
                        <p className="text-gray-600 text-sm">@{donorData.email}</p>
                        <p className="mt-2 text-gray-700">{donorData.about}</p>
                        <div className="py-2 flex justify-between">
                          <IconAndLabel item={{label:donation.pickupLocation, icon:MapPin}} />
                          <IconAndLabel item={{label:donorData.phone, icon:Phone}} />
                        </div>
                    </>
                    ) : (
                      <p className="text-gray-500">No donor data available.</p>
                    )
                  }

                  <h2 className="mt-3 mb-2 text-2xl font-semibold">{donation.name}</h2>
                  <IconAndLabel item={{label:donation.foodType, icon:HandPlatter}} />
                  <p className="mt-2 text-gray-700">{donation.description}</p>
          
                </div>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={addDonationToUser}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Card;
