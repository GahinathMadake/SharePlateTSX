import { Button } from "@/components/ui/button";
import userImage from "../../assets/Donar_img/Dashboard.png";
import { Link } from "react-router-dom";
import Chart from "./Chart/Chartuser";
import { GraduationCap, BadgeCheck, Smile } from "lucide-react";
import {
  Pie,
  PieChart,
  Tooltip as ChartTooltip,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

interface DashboardStats {
  totalDonations: number;
  totalDeliveredFood: number;
  totalFoodSaved: number;
  topDonors: Array<{ name: string; totalDonations: number }>;
}

const missionVision = {
  mission:
    "Our mission is to bridge the gap between restaurants with surplus food and NGOs, ensuring that every meal reaches someone in need, reducing food waste, and making a positive impact in our community.",
  vision:
    "We dream of a world where no meal goes to waste, turning every leftover plate into a lifeline for those in need. Together, we create a compassionate and sustainable food cycle that nourishes communities.",
};

const CHART_COLORS = {
  green: ["#064e3b", "#065f46", "#047857", "#059669", "#10b981"],
  blue: ["#1e3a8a", "#1e40af", "#1d4ed8", "#2563eb", "#3b82f6"],
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalDonations: 0,
    totalDeliveredFood: 0,
    totalFoodSaved: 0,
    topDonors: [],
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
          deliveredRes,
        ] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_Backend_URL}/api/donations/totaldonations`,
            { withCredentials: true }
          ),
          axios.get(
            `${
              import.meta.env.VITE_Backend_URL
            }/api/donations/totaldeliveredfood`,
            { withCredentials: true }
          ),
          axios.get(
            `${import.meta.env.VITE_Backend_URL}/api/donations/totalfoodsaved`,
            { withCredentials: true }
          ),
          axios.get(
            `${import.meta.env.VITE_Backend_URL}/api/donations/pending`,
            { withCredentials: true }
          ),
          axios.get(
            `${import.meta.env.VITE_Backend_URL}/api/donations/accepteddonationsbydonor`,
            { withCredentials: true }
          ),
          axios.get(
            `${import.meta.env.VITE_Backend_URL}/api/donations/delivered`,
            { withCredentials: true }
          ),
        ]);

        setStats({
          totalDonations: totalDonationsRes.data.totalDonations,
          totalDeliveredFood: deliveredFoodRes.data.totalDeliveredFood,
          totalFoodSaved: foodSavedRes.data.totalFoodSaved,
          topDonors: [], // Add top donors implementation if needed
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
  const barChartData = [
    { name: "Pending", value: pendingDonations.length },
    { name: "Res", value: acceptedDonations.length },
    { name: "Delivered", value: deliveredDonations.length },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Welcome Section */}
        <Card className="w-full lg:w-9/12 flex flex-col lg:flex-row items-center lg:justify-between gap-6 p-6 shadow-lg bg-white">
          {/* Left Section: Text Content */}
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-800">
              Hi {user?.name},
            </h1>
            <p className="text-lg text-gray-600">
              Every donation makes a difference. What do you want to give today?
            </p>
            <div className="flex items-center gap-2">
              <Smile className="w-6 h-6 text-yellow-500" />
              <p className="text-sm text-gray-500">Donate Food, Create Hope</p>
            </div>
            <Link to="/user/Donar/donationForm">
              <Button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 text-sm">
                Donate now
              </Button>
            </Link>
          </div>

          {/* Right Section: Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={userImage}
              alt="User"
              className="w-60 h-full md:w-72  rounded-md shadow-md object-cover"
            />
          </div>
        </Card>

        {/* Stats Section */}
        <div className="w-full lg:w-3/12 flex flex-col gap-4">
          {[
            {
              title: "Total Donations",
              count: stats.totalDonations,
              icon: GraduationCap,
            },
            {
              title: "Food Saved (Servings)",
              count: stats.totalFoodSaved,
              icon: BadgeCheck,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="w-full p-4 rounded-md shadow-sm border bg-white flex flex-col items-center"
            >
              <div className="flex justify-between w-full">
                <div className="w-[40px] h-[40px] rounded-full bg-blue-500 flex justify-center items-center">
                  <stat.icon stroke="black" fill="white" />
                </div>
                <div className="w-32">
                  <Chart />
                </div>
              </div>
              <h1 className="text-lg font-semibold text-gray-800">
                {stat.count}
              </h1>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      {/* Charts Section */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Bar Chart Section */}
        <Card className="flex-1 shadow-md border bg-white p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Donation Status Overview
            </CardTitle>
            <CardDescription className="text-gray-600">
              Current status of all your donations
            </CardDescription>
          </CardHeader>
          <CardContent className="w-[400px] h-[800px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData}
                margin={{ top: 20, right: 50, left: 20, bottom: 10 }}
              >
                <defs>
                  <linearGradient
                    id="barGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#064e3b" /> {/* Green */}
                    <stop offset="80%" stopColor="#000000" /> {/* Black */}
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 19, fill: "#6b7280" }}
                />
                <YAxis tick={{ fontSize: 20, fill: "#6b7280" }} />
                <ChartTooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "6px",
                    color: "#f3f4f6",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: "10px",
                  }}
                />
                <Bar
                  dataKey="value"
                  name="Number of Donations"
                  fill="url(#barGradient)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Charts Column */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Pie Chart 1 */}
          <Card className="shadow-md border bg-white p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Donation Size Distribution
              </CardTitle>
              <CardDescription className="text-gray-600">
                Analysis by portion sizes
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient
                      id="pieGradient1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#064e3b" /> {/* Green */}
                      <stop offset="80%" stopColor="#000000" /> {/* Black */}
                    </linearGradient>
                  </defs>
                  <Pie
                    data={[
                      { name: "Small", value: 10 },
                      { name: "Medium", value: 20 },
                      { name: "Large", value: 30 },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="url(#pieGradient1)"
                    label
                  >
                    <Cell key="cell-0" fill="url(#pieGradient1)" />
                    <Cell key="cell-1" fill="url(#pieGradient1)" />
                    <Cell key="cell-2" fill="url(#pieGradient1)" />
                  </Pie>
                  <ChartTooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "6px",
                      color: "#f3f4f6",
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: "10px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart 2 */}
          <Card className="shadow-md border bg-white p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Donation Status
              </CardTitle>
              <CardDescription className="text-gray-600">
                Delivered vs Ongoing
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient
                      id="pieGradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#064e3b" /> {/* Green */}
                      <stop offset="80%" stopColor="#000000" /> {/* Black */}
                    </linearGradient>
                  </defs>
                  <Pie
                    data={[
                      { name: "Delivered", value: deliveredDonations.length },
                      { name: "Ongoing", value: acceptedDonations.length },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="url(#pieGradient2)"
                    label
                  >
                    <Cell key="cell-0" fill="url(#pieGradient2)" />
                    <Cell key="cell-1" fill="url(#pieGradient2)" />
                  </Pie>
                  <ChartTooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "6px",
                      color: "#f3f4f6",
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: "10px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
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
