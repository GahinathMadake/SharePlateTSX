
import React from 'react';
import UserDashboard from './UserDashBoard';

import { 
    LayoutDashboard,
    House,
    Captions,
    CircleUserRound,
    Bell,
} from "lucide-react";

// Importing Common
import logo from '../assets/logobg.png';

const NGODashboard: React.FC = () => {
    const NGO = {
        user: {
          name: "Rohan Wagh",
          email: "rohanWagh@gmail.com",
          avatar: "/avatars/shadcn.jpg",
        },
        Platform: {
          name: "SharePlate",
          logo: logo,
          plan: "Admin",
        },
        navMenu: [
            {
                name: "Dashboard",
                url: "/user/Admin",
                icon: LayoutDashboard, 
            },
            { 
                name: "NGO Management", 
                url: "/user/Admin/ngomanagement", 
                icon: House,
            },
            {
                title: "Courses",
                url: "#",
                icon: Captions,
                isActive: false,
                items:[
                    {
                        title:"Ongoing",
                        url:'/student/courses/ongoing'
                    },
                    {
                        title:"Completed",
                        url:'/student/courses/completed'
                    },
                    {
                        title:"All",
                        url:'/student/courses/All'
                    },
                ],
                
            },
            {
                name: "Donation Management",
                url: "/user/Admin/donationmanagement",
                icon: Bell, 
            },
            {
                name: "UserLists",
                url: "/user/admin/userList",
                icon: CircleUserRound, 
            },
            {
              name: "Content Management",
              url: "/user/admin/contentManagement",
              icon: CircleUserRound, 
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