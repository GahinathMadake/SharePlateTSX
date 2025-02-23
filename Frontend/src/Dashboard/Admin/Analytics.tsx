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


const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [totalDonations, setTotalDonations] =useState("");
  const [totalNgos, setTotalNgos] =useState("");  
  const [pendingNgosCount, setPendingNgosCount] =useState("");
  const [totalDeliveredFood, setTotalDeliveredFood] =useState("");
  const [yearlyChartData, setYearlyChartData] = useState({});
  const[totalFoodSaved,setTotalFoodSaved]=useState(0);
  interface Donor {
    name: string;
    totalDonations: number;
  }
  
  const [topDonors, setTopDonors] = useState<Donor[]>([]);
  
  useEffect(() => {
    fetchTotalDonations();
    fetchTotalNgos();
    fetchPendingNgos();
    fetchTotalDeliveredFood();
    fetchYearlyData();
    calculateEnvironmentImpact();
    fetchTopDonors();
  },[])

const fetchYearlyData = async () => {

   try {
    
    const response = await fetch(`${import.meta.env.VITE_Backend_URL}/user/yearly-chart-data`,
      {credentials: 'include'}
    );
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
      const response = await axios.get(`${import.meta.env.VITE_Backend_URL}/api/donations/totaldonations`,
        {withCredentials: true}
      );
      setTotalDonations(response.data.totalDonations);
    } catch (error) {
      console.error("Error fetching total donations:", error);
    }
  };

  
  const fetchTotalNgos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_Backend_URL}/api/ngos/totalngos`,
        {withCredentials: true}
      );
      setTotalNgos(response.data.totalNgos);
    } catch (error) {
      console.error("Error fetching total ngos:", error);
    }
  };

  const fetchPendingNgos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_Backend_URL}/api/ngos/pending`,
        {withCredentials: true}
      );
      console.log("ngos data",response.data);
      setPendingNgosCount(response.data.PendingNgosCount);
    } catch (error) {
      console.error("Error fetching pending ngos:", error);
    }
  };


  const fetchTotalDeliveredFood = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_Backend_URL}/totaldeliveredfood`,
        {withCredentials: true}
      );
      setTotalDeliveredFood(response.data.totalDeliveredFood);
    } catch (error) {
      console.error("Error fetching total delivered food:", error);
    }

  };


  const fetchTopDonors =async ()=>{
    try{
      
      const response = await axios.get(`${import.meta.env.VITE_Backend_URL}/api/donations/topdonors`, {
        withCredentials: true,
      });
      console.log(response.data);
      setTopDonors(response.data);

    }catch(error){
      console.error("Error fetching top donors:", error);
    }
  }


  const calculateEnvironmentImpact =async () =>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_Backend_URL}/api/donations/totalfoodsaved`, {
        withCredentials: true,
      });
      setTotalFoodSaved(response.data.totalFoodSaved);
    } catch (error) {
      console.error("Error fetching total food saved:", error);
    }
  }
  
  const mealWeight = 0.5; // kg per meal (adjust as needed)
  const emissionFactor = 2.5; // kg CO₂ per kg of food
  const co2PerTree = 5; // kg CO₂ sequestered per tree
  const waterFootprint = 10; // liters of water per kg of food
  
  const totalFoodWeight = totalFoodSaved * mealWeight;
  

   // Calculations
   const co2Saved = totalFoodWeight * emissionFactor;
   const treesPlanted = co2Saved / co2PerTree;
   const mealsProvided = totalFoodSaved; // No change, since quantity = meals
   const waterSaved = totalFoodWeight * waterFootprint;

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

<Card className="hover:shadow-lg transition-shadow duration-300">
  <CardHeader>
    <CardTitle className="text-lg sm:text-xl">Environmental Impact</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4 sm:space-y-6">
      {/* Carbon Footprint Reduction */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm sm:text-base">Carbon Footprint Reduction</h4>
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm text-gray-500">CO₂ Emissions Saved (This Month)</p>
          <span className="text-sm sm:text-base font-bold text-green-600">{co2Saved} kg</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm text-gray-500">Equivalent Impact (Lifetime)</p>
          <span className="text-sm sm:text-base font-bold text-blue-600">{treesPlanted} Tress Planted</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Food Waste Reduction Impact */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm sm:text-base">Food Waste Reduction Impact</h4>
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm text-gray-500">Meals Provided (This Month)</p>
          <span className="text-sm sm:text-base font-bold text-green-600">{mealsProvided} Meals</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm text-gray-500">Water Saved (Lifetime)</p>
          <span className="text-sm sm:text-base font-bold text-blue-600">{waterSaved} Gallons</span>
        </div>
      </div>
    </div>
  </CardContent>
</Card>
</div> 
     

      {/* Top Donors */}
      
      {/* Top Donors */}
<Card className="hover:shadow-lg transition-shadow duration-300">
  <CardHeader>
    <CardTitle className="text-lg sm:text-xl">Top Donors</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      {topDonors.map((donor, index) => (
        <div key={index} className="flex items-center space-x-4">
          {/* Icon */}
          <div className="p-2 bg-blue-100 rounded-full">
            <Users className="w-5 h-5 text-blue-600" /> {/* Replace with your desired icon */}
          </div>
          {/* Donor Details */}
          <div className="flex-1">
            <p className="font-medium text-sm sm:text-base">{donor.name}</p>
            <p className="text-xs sm:text-sm text-gray-500">Total Donations: {donor.totalDonations} Servings</p>
          </div>
          {/* Rank Badge */}
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
            <span className="text-sm font-semibold text-green-600">#{index + 1}</span>
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