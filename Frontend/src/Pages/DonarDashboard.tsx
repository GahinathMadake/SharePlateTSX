import React from "react";
import UserDashboard from "./UserDashBoard";

import { LayoutDashboard, Bell,MessageCircleCode , CircleUserRound, ChefHat } from "lucide-react";

// Importing Common
import logo from "../assets/logobg.png";

const DonarDashboard: React.FC = () => {
  const Donar = {
    user: {
      name: "Shreyash Padase",
      email: "shreyash@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    Platform: {
      name: "SharePlate",
      logo: logo,
      plan: "Donar",
    },
    navMenu: [
      {
        name: "Dashboard",
        url: "/user/Donar",
        icon: LayoutDashboard,
      },
      {
        title: "Donation",
        url: "#",
        icon: ChefHat,
        isActive: false,

        items: [
          {
            title: "New Donation",
            url: "/user/Donar/newdonation",
          },
          {
            title: "My Donations",
            url: "/user/Donar/mydonations",
          },
          {
            title: "Track Location",
            url: "/user/Donar/trackloaction",
          },
        ],
      },

      {
        name: "Notifications",
        url: "/user/Donar/notification",
        icon: Bell,
      },
      {
        name: "Review",
        url: "/user/Donar/Review",
        icon: MessageCircleCode ,
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
      <UserDashboard data={Donar} />
    </>
  );
};

export default DonarDashboard;
