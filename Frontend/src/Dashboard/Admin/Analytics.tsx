import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart, Legend } from 'recharts';
import { ArrowUpRight, Users, Package, Clock, AlertCircle, CheckCircle, MapPin, Calendar, Target } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import axios from 'axios';

// TypeScript interfaces for our data
interface MetricCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

interface Campaign {
  name: string;
  progress: number;
  color: string;
  target: string;
  endDate: string;
  location: string;
}

interface ChartData {
  name: string;
  donations: number;
  redistributed: number;
}

interface RecentActivity {
  type: string;
  description: string;
  date: string;
  icon: React.ReactNode;
}

// Sample data for different years
const yearlyChartData: { [key: string]: ChartData[] } = {
  "2023": [
    { name: 'Jan', donations: 4000, redistributed: 2400 },
    { name: 'Feb', donations: 3000, redistributed: 1398 },
    { name: 'Mar', donations: 2000, redistributed: 9800 },
    { name: 'Apr', donations: 2780, redistributed: 3908 },
    { name: 'May', donations: 1890, redistributed: 4800 },
    { name: 'Jun', donations: 2390, redistributed: 3800 },
  ],
  "2024": [
    { name: 'Jan', donations: 5000, redistributed: 3000 },
    { name: 'Feb', donations: 3500, redistributed: 2000 },
    { name: 'Mar', donations: 2500, redistributed: 10000 },
    { name: 'Apr', donations: 3000, redistributed: 4500 },
    { name: 'May', donations: 2200, redistributed: 5000 },
    { name: 'Jun', donations: 2800, redistributed: 4000 },
  ],
  "2025": [
    { name: 'Jan', donations: 6000, redistributed: 3500 },
    { name: 'Feb', donations: 4000, redistributed: 2500 },
    { name: 'Mar', donations: 3000, redistributed: 12000 },
    { name: 'Apr', donations: 3500, redistributed: 5000 },
    { name: 'May', donations: 2500, redistributed: 6000 },
    { name: 'Jun', donations: 3000, redistributed: 4500 },
  ],
};

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [totalDonations, setTotalDonations] =useState("");
  const [totalNgos, setTotalNgos] =useState("");  
  const [pendingNgosCount, setPendingNgosCount] =useState("");
  const [totalDeliveredFood, setTotalDeliveredFood] =useState("");
  const [yearlyChartData, setYearlyChartData] = useState({});



  useEffect(() => {
    fetchTotalDonations();
    fetchTotalNgos();
    fetchPendingNgos();
    fetchTotalDeliveredFood();
    fetchYearlyData();
  },[])

const fetchYearlyData = async () => {

   try {
    
    const response = await fetch("http://localhost:5000/user/yearly-chart-data");
    const data = await response.json();
    setYearlyChartData(data);

   }
   catch(error) {
    console.error("Error fetching yearly data", error);
  }



}

const chartData = yearlyChartData[selectedYear] || [];


  const fetchTotalDonations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/donations/totaldonations");
      setTotalDonations(response.data.totalDonations);
    } catch (error) {
      console.error("Error fetching total donations:", error);
    }
  };

  
  const fetchTotalNgos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/ngos/totalngos");
      setTotalNgos(response.data.totalNgos);
    } catch (error) {
      console.error("Error fetching total ngos:", error);
    }
  };

  const fetchPendingNgos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/ngos/pending");
      console.log("ngos data",response.data);
      setPendingNgosCount(response.data.PendingNgosCount);
    } catch (error) {
      console.error("Error fetching pending ngos:", error);
    }
  };


  const fetchTotalDeliveredFood = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/donations/totaldeliveredfood");
      setTotalDeliveredFood(response.data.totalDeliveredFood);
    } catch (error) {
      console.error("Error fetching total delivered food:", error);
    }

  };



  const metrics: MetricCard[] = [
    {
      title: "Total Donations",
      value: totalDonations,
      change: "+12.5%",
      icon: <ArrowUpRight className="text-green-500" size={24} />
    },
    {
      title: "Active NGOs",
      value: totalNgos,
      change: "+4.3%",
      icon: <Users className="text-blue-500" size={24} />
    },
    {
      title: "Pending Requests",
      value: pendingNgosCount || "0",
      change: "-2.1%",
      icon: <Clock className="text-yellow-500" size={24} />
    },
    {
      title: "Food Redistributed",
      value: totalDeliveredFood,
      change: "+18.7%",
      icon: <Package className="text-purple-500" size={24} />
    }
  ];

  const campaigns: Campaign[] = [
    {
      name: "Holiday Food Drive",
      progress: 75,
      color: "bg-blue-500",
      target: "100,000 kg",
      endDate: "Dec 31, 2024",
      location: "New York, USA"
    },
    {
      name: "Community Outreach",
      progress: 45,
      color: "bg-green-500",
      target: "50,000 kg",
      endDate: "Nov 15, 2024",
      location: "London, UK"
    },
    {
      name: "Restaurant Partnership",
      progress: 60,
      color: "bg-yellow-500",
      target: "75,000 kg",
      endDate: "Oct 1, 2024",
      location: "Sydney, Australia"
    }
  ];

  const recentActivities: RecentActivity[] = [
    {
      type: "New Donation",
      description: "Received 500 kg from Fresh Foods Inc.",
      date: "2024-09-15",
      icon: <CheckCircle className="text-green-500" size={18} />
    },
    {
      type: "Issue Reported",
      description: "NGO 'Helping Hands' reported a delivery delay.",
      date: "2024-09-14",
      icon: <AlertCircle className="text-red-500" size={18} />
    },
    {
      type: "Campaign Update",
      description: "Holiday Food Drive reached 75% of its target.",
      date: "2024-09-13",
      icon: <Target className="text-blue-500" size={18} />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Food Redistribution Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin</p>
        </div>
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-500">
          <span className="text-lg sm:text-xl text-white">A</span>
        </Avatar>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">{metric.title}</p>
                  <h3 className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">{metric.value}</h3>
                  <p className="text-xs sm:text-sm text-green-600 mt-1">{metric.change} from last month</p>
                </div>
                {metric.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Food Redistribution Trends */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <CardTitle className="text-lg sm:text-xl mb-2 sm:mb-0">Food Redistribution Trends</CardTitle>
          <Select value={selectedYear} onValueChange={(value) => setSelectedYear(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(yearlyChartData).map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="donations" fill="#8884d8" name="Donations" />
            <Bar dataKey="redistributed" fill="#82ca9d" name="Redistributed" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

        {/* Active Campaigns */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-6">
              {campaigns.map((campaign, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">{campaign.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">Target: {campaign.target}</p>
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center">
                        <MapPin className="mr-1" size={12} /> {campaign.location}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 flex items-center mt-2 sm:mt-0">
                      <Calendar className="mr-1" size={12} /> Ends: {campaign.endDate}
                    </span>
                  </div>
                  <Progress value={campaign.progress} className={campaign.color} />
                  <p className="text-xs sm:text-sm text-gray-600 text-right">{campaign.progress}% Complete</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                {activity.icon}
                <div>
                  <p className="font-medium text-sm sm:text-base">{activity.type}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{activity.description}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;