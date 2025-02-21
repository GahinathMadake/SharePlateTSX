import { Button } from "@/components/ui/button";
import userImage from "../../assets/Donar_img/Dashboard.png";
import { Link } from "react-router-dom";
import Chart from "./Chart/Chartuser";
import { GraduationCap, BadgeCheck, Smile } from "lucide-react";
import { Pie, PieChart, Tooltip as ChartTooltip, Cell } from "recharts";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

interface DashboardStats {
  totalDonations: number;
  totalDeliveredFood: number;
  totalFoodSaved: number;
  topDonors: Array<{ name: string; totalDonations: number }>;
}

const missionVision = {
  mission: "Our mission is to bridge the gap between restaurants with surplus food and NGOs, ensuring that every meal reaches someone in need, reducing food waste, and making a positive impact in our community.",
  vision: "We dream of a world where no meal goes to waste, turning every leftover plate into a lifeline for those in need. Together, we create a compassionate and sustainable food cycle that nourishes communities.",
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalDonations: 0,
    totalDeliveredFood: 0,
    totalFoodSaved: 0,
    topDonors: []
  });
  const [pendingDonations, setPendingDonations] = useState([]);
  const [acceptedDonations, setAcceptedDonations] = useState([]);
  const [deliveredDonations, setDeliveredDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          totalDonationsRes,
          deliveredFoodRes,
          foodSavedRes,
          pendingRes,
          acceptedRes,
          deliveredRes
        ] = await Promise.all([
          axios.get(`${import.meta.env.VITE_Backend_URL}/api/donations/totaldonations`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_Backend_URL}/api/donations/totaldeliveredfood`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_Backend_URL}/api/donations/totalfoodsaved`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_Backend_URL}/api/donations/pending`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_Backend_URL}/api/donations/accepted`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_Backend_URL}/api/donations/delivered`, { withCredentials: true })
        ]);

        setStats({
          totalDonations: totalDonationsRes.data.totalDonations,
          totalDeliveredFood: deliveredFoodRes.data.totalDeliveredFood,
          totalFoodSaved: foodSavedRes.data.totalFoodSaved,
          topDonors: [] // Add top donors implementation if needed
        });

        setPendingDonations(pendingRes.data);
        setAcceptedDonations(acceptedRes.data);
        setDeliveredDonations(deliveredRes.data);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare chart data
  const donationData = [
    { name: "Delivered", visitors: deliveredDonations.length },
    { name: "Ongoing", visitors: acceptedDonations.length },
  ];

  const pendingData = [
    { name: "Pending", visitors: pendingDonations.length },
    { name: "Completed", visitors: deliveredDonations.length },
  ];

  const acceptedData = [
    { name: "Accepted", visitors: acceptedDonations.length },
    { name: "Delivered", visitors: deliveredDonations.length },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Welcome Section */}
        <Card className="w-full lg:w-9/12 flex flex-col lg:flex-row items-center gap-6 p-6 shadow-lg">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <h1 className="text-3xl font-bold">Hi {user?.name},</h1>
            <p className="text-lg text-gray-700">
              Every donation makes a difference. What do you want to give today?
            </p>
            <div className="flex items-center gap-2">
              <Smile className="w-6 h-6 text-yellow-500" />
              <p className="text-sm text-gray-600">Donate Food, Create Hope</p>
            </div>
            <Link to="/user/Donar/donationForm">
              <Button className="bg-gray-800 hover:bg-gray-900 text-white p-4 text-sm">
                Donate now
              </Button>
            </Link>
          </div>
          <img src={userImage} alt="User" className="w-60 md:w-72 rounded-md shadow-md" />
        </Card>

        {/* Stats Section */}
        <div className="w-full lg:w-3/12 flex flex-col gap-4">
          {[
            { 
              title: "Total Donations", 
              count: stats.totalDonations, 
              icon: GraduationCap 
            },
            { 
              title: "Food Saved (Servings)", 
              count: stats.totalFoodSaved, 
              icon: BadgeCheck 
            },
          ].map((stat, index) => (
            <div key={index} className="w-full p-4 rounded-md shadow-sm border bg-white flex flex-col items-center">
              <div className="flex justify-between w-full">
                <div className="w-[40px] h-[40px] rounded-full bg-blue-500 flex justify-center items-center">
                  <stat.icon stroke="black" fill="white" />
                </div>
                <div className="w-32">
                  <Chart />
                </div>
              </div>
              <h1 className="text-lg font-semibold">{stat.count}</h1>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          { 
            title: "Donation Status", 
            data: donationData,
            description: "Delivered vs Ongoing"
          },
          { 
            title: "Pending Donations", 
            data: pendingData,
            description: "Pending vs Completed"
          },
          { 
            title: "Accepted Donations", 
            data: acceptedData,
            description: "Accepted vs Delivered"
          },
        ].map((chart, index) => (
          <Card key={index} className="shadow-md border">
            <CardHeader className="items-center pb-0">
              <CardTitle className="text-xl font-bold">{chart.title}</CardTitle>
              <CardDescription className="text-gray-600">
                {chart.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <PieChart width={320} height={220}>
                <defs>
                  <linearGradient
                    id={`greenBlackGradient-${index}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#064e3b" />
                    <stop offset="100%" stopColor="#000000" />
                  </linearGradient>
                </defs>
                <Pie
                  data={chart.data}
                  dataKey="visitors"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={110}
                  strokeWidth={3}
                  label
                >
                  {chart.data.map((_, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={`url(#greenBlackGradient-${index})`}
                    />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission & Vision Section */}
      <div className="px-5 py-4 border shadow-sm rounded-sm bg-white mt-6">
        <h2 className="font-semibold text-xl text-gray-800">Our Mission</h2>
        <p className="text-gray-600">{missionVision.mission}</p>
        <h2 className="mt-6 font-semibold text-xl text-gray-800">Our Vision</h2>
        <p className="text-gray-600">{missionVision.vision}</p>
      </div>
    </div>
  );
};

export default Dashboard;