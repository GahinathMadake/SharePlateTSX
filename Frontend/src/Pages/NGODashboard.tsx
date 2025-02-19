
import React from 'react';
import UserDashboard from './UserDashBoard';

import { 
    LayoutDashboard,
    ListChecks,
    HandPlatter,
    Star,
} from "lucide-react";

// Importing Common
import logo from '../assets/logobg.png';

const NGODashboard: React.FC = () => {
    const NGO = {
        user: {
          name: "Gahinath Madake",
          role: "NGO",
          email: "gahinathmadake@gmail.com",
          avatar: "/avatars/shadcn.jpg",
        },
        Platform: {
          name: "SharePlate",
          logo: logo,
          plan: "NGO",
        },
        navMenu: [
            {
                name: "Dashboard",
                url: "/user/NGO",
                icon: LayoutDashboard, 
            },
            { 
                name: "Listings", 
                url: "/user/NGO/listings", 
                icon: ListChecks,
            },
            {
                title: "Donations",
                url: "#",
                icon: HandPlatter,
                isActive: false,
                items:[
                    {
                        title:"Track Donations",
                        url:'/user/NGO/trackdonations'
                    },
                    {
                        title:"Donation History",
                        url:'/user/NGO/donationHistory'
                    },
                ],
                
            },
            {
                name: "Donar",
                url: "/user/ngo/review",
                icon: Star,
            },
        ],
      };

  return (
    <>
      <UserDashboard data={NGO}/>
    </>
  )
}

export default NGODashboard;