import React from "react";
import UserDashboard from "./UserDashBoard";

import { LayoutDashboard, Bell, MessageCircleCode , CircleUserRound, ChefHat } from "lucide-react";


const DonarDashboard: React.FC = () => {

    const Donar = {
        navMenu: [
            {
              name: "Dashboard",
              url: "/user/Donar",
              icon: LayoutDashboard, 
            },
            {
              title: "Donation",
              url: "#",
              icon:  ChefHat,
              isActive: false,
              items:[
                {
                  title:"New Donation",
                  url:'/user/Donar/newdonation',
                },
                {
                  title:"Donation Activity",
                  url:'/user/Donar/donationactivity',
                },
                {
                  title:"My Donations",
                  url:'/user/Donar/mydonations'
                }, 
               
              ],  
            },
           
            {
              name: "Notifications",
              url: "/user/Donar/notification",
              icon: Bell,
            },
        ],
    };

  return (
    <>
      <UserDashboard data={Donar} />
    </>
  );
};

export default DonarDashboard;
