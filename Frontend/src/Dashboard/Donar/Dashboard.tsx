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
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Legend 
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
  totalFoodSaved: number;
}

const missionVision = {
  mission: "Our mission is to bridge the gap between restaurants with surplus food and NGOs, ensuring that every meal reaches someone in need, reducing food waste, and making a positive impact in our community.",
  vision: "We dream of a world where no meal goes to waste, turning every leftover plate into a lifeline for those in need. Together, we create a compassionate and sustainable food cycle that nourishes communities.",
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalDonations: 0,
    totalFoodSaved: 0
  });
  const [myDonations, setMyDonations] = useState<any[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDashboardData = async () => {
      try {
        const myDonationsRes = await axios.get(
          `${import.meta.env.VITE_Backend_URL}/api/donations/my-donations`, 
          { withCredentials: true }
        );

        setMyDonations(myDonationsRes.data);

        // Calculate monthly statistics
        const monthlyData = myDonationsRes.data.reduce((acc: any, donation: any) => {
          const month = new Date(donation.createdAt).toLocaleString('default', { month: 'short' });
          if (!acc[month]) acc[month] = { month, count: 0, quantity: 0 };
          acc[month].count += 1;
          acc[month].quantity += donation.quantity;
          return acc;
        }, {});

        setMonthlyStats(Object.values(monthlyData));

        const deliveredDonations = myDonationsRes.data.filter(
          (donation: any) => donation.status === 'delivered'
        );

        setStats({
          totalDonations: deliveredDonations.length,
          totalFoodSaved: deliveredDonations.reduce(
            (acc: number, curr: any) => acc + curr.quantity, 0
          )
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDashboardData();
  }, []);

  const statusDistribution = [
    { name: "Awaiting Review", value: myDonations.filter(d => d.status === 'pending').length },
    { name: "In Progress", value: myDonations.filter(d => d.status === 'accepted').length },
    { name: "Delivered", value: myDonations.filter(d => d.status === 'delivered').length }
  ];

  const quantityDistribution = [
    { 
      name: "Small (1-5 portions)",
      value: myDonations.filter(d => d.quantity <= 5).length
    },
    {
      name: "Medium (6-15 portions)",
      value: myDonations.filter(d => d.quantity > 5 && d.quantity <= 15).length
    },
    {
      name: "Large (>15 portions)",
      value: myDonations.filter(d => d.quantity > 15).length
    }
  ];

  const CHART_COLORS = {
    green: ['rgba(134, 239, 172, 0.9)', 'rgba(74, 222, 128, 0.9)', 'rgba(34, 197, 94, 0.9)'],
    blue: ['rgba(147, 197, 253, 0.9)', 'rgba(96, 165, 250, 0.9)', 'rgba(59, 130, 246, 0.9)']
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <Card className="w-full lg:w-9/12 flex flex-col lg:flex-row items-center gap-6 p-6 shadow-lg">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-lg text-gray-700">
              Your Donation Dashboard
            </p>
            <div className="flex items-center gap-2">
              <Smile className="w-6 h-6 text-yellow-500" />
              <p className="text-sm text-gray-600">Making a positive impact in our community</p>
            </div>
            <Link to="/user/Donar/donationForm">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3">
                Start New Donation
              </Button>
            </Link>
          </div>
          <img src={userImage} alt="Dashboard" className="w-60 md:w-72 rounded-lg shadow-md" />
        </Card>

        <div className="w-full lg:w-3/12 flex flex-col gap-4">
          {[
            { 
              title: "Total Donations Made", 
              count: myDonations.length, 
              icon: GraduationCap 
            },
            { 
              title: "Total Portions Donated", 
              count: stats.totalFoodSaved, 
              icon: BadgeCheck 
            },
          ].map((stat, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <stat.icon className="text-white" />
                </div>
                <span className="text-2xl font-bold">{stat.count}</span>
              </div>
              <p className="text-gray-600">{stat.title}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Donation Status Overview</CardTitle>
            <CardDescription>Current status of all your donations</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={statusDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                label
              >
                {statusDistribution.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CHART_COLORS.green[index]}
                  />
                ))}
              </Pie>
              <ChartTooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>

        {/* Quantity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Donation Size Distribution</CardTitle>
            <CardDescription>Analysis by portion sizes</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={quantityDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                label
              >
                {quantityDistribution.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CHART_COLORS.blue[index]}
                  />
                ))}
              </Pie>
              <ChartTooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Donation Trends</CardTitle>
            <CardDescription>Number of donations and total portions per month</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyStats}>
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" stroke="#22c55e" />
                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                <ChartTooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="count"
                  name="Number of Donations"
                  fill="rgba(34, 197, 94, 0.8)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="quantity"
                  name="Total Portions"
                  fill="rgba(59, 130, 246, 0.8)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Mission & Vision */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Our Mission & Vision</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Mission</h3>
              <p className="text-gray-600">{missionVision.mission}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Vision</h3>
              <p className="text-gray-600">{missionVision.vision}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;