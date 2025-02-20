import React from 'react';
import UserDashboard from './UserDashBoard';

import { 
    LayoutDashboard,
    Bell,
    CircleUserRound,
    ChefHat,
} from "lucide-react";


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
                        title:"My Donations",
                        url:'/user/Donar/mydonations'
                    }, 
                    {
                        title:"Track Location",
                        url:'/user/Donar/trackloaction'
                    }, 
                ],
                
            },
           
            {
                name: "Notifications",
                url: "/user/Donar/notification",
                icon: Bell,
              },
              {
                name: "Profile",
                url: "/user/Donar/donarprofile",
                icon: CircleUserRound,
              },
           
           
            
            
        ],
      };
  return (
    <>
      <UserDashboard data={Donar}/>
    </>
  )
}

export default DonarDashboard;