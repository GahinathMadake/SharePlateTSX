import React from "react";
import IconAndLabel from '../common/IconandLable';

import { MapPin , HandPlatter} from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CourseProps {
  course: {
    title: string;
    branch: string;
    duration: string;
    about: string;
    imageURL: string;
    author: string;
    authorImage: string;
  };
}

const listing = {
    name:"Dal Bhatti",
    description:"It is the food of hotel which remaining, It is available to Deliver for Donation",
    Quantity: 17,
    Pickuplocation: "Alandi, Pune",
    FoodType: "Vegetarian",
    Donar: "John Doe",
    DonarPhone: "+918767443738",
    PickupTime: Date.now(),
    ExpiryTime: Date.now(),
}

const Card: React.FC<CourseProps> = ({ course }) => {
  return (
    <div className="w-[300px] p-3 bg-sidebar rounded-lg shadow-xl border">
      <img src={course.imageURL} alt={course.title} className="w-full object-cover rounded-md" />

      <div className="py-2 flex justify-between">
        <IconAndLabel item={{label:listing.Pickuplocation, icon:MapPin}} />
        <IconAndLabel item={{label:listing.FoodType, icon:HandPlatter}} />
      </div>
      
      <h1 className="opacity-90 py-1 text-xl font-semibold">{listing.name}</h1>
      <p className="opacity-70">{listing.description}</p>
      <p className="text-md my-2">
        <span className=" font-semibold">Expiry Time:</span>
        <span>{listing.ExpiryTime}</span>
      </p>

      <div className="mt-4">
        <Button>Reserve</Button>
      </div>
    
      {/* <div className="my-3 flex justify-between items-center gap[5px]">
        <div className="flex">
            <img src={course.authorImage} alt={course.author} className="w-[30px] h-[30px] rounded-full" />
            <p className="ml-2 opacity-90">{course.author}</p>
        </div>
      </div> */}
    </div>
  );
};

export default Card;
