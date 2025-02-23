import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Leaf,
  Zap,
  Users,
  UserPlus,
  FolderPlus,
  FileText,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import img from "../../assets/logobg.png";
import { Link } from "react-router-dom";

interface NgoDashboardStats {
  totalDonations: number;
  totalFoodSaved: number;
  pendingDonations: number;
  currentliveDonations: number;
}

function Dashboard() {
  // State for NGO dashboard stats from the backend
  const [ngoStats, setNgoStats] = useState<NgoDashboardStats>({
    totalDonations: 0,
    totalFoodSaved: 0,
    pendingDonations: 0,
    currentliveDonations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_Backend_URL}/api/donations/ngo-dashboard`, {
      method: "GET",
      mode: "cors", // ensure cross-origin requests work correctly
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched ngo dashboard data:", data);
        setNgoStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      });
  }, []);

  // Use the real data plus the new pending donations stat
  const dashboardStats = [
    {
      title: "Total Accepted/Delivered Donations",
      value: ngoStats.totalDonations,
      color: "bg-gray-500",
    },
    {
      title: "Total Food Saved (Kg)",
      value: ngoStats.totalFoodSaved * 0.55,
      color: "bg-green-500",
    },
    {
      title: "Available Donations",
      value: ngoStats.pendingDonations,
     
      color: "bg-gray-500",
    },
    {
      title: "Reserved Donations",
      value: ngoStats.currentliveDonations,
      color: "bg-red-500",
    },
  ];

  const totalValues = dashboardStats.reduce((sum, stat) => sum + stat.value, 0);
  const progressData = dashboardStats.map((stat) => ({
    title: stat.title,
    value: stat.value,
    percentage:
      totalValues > 0 ? Math.round((stat.value / totalValues) * 100) : 0,
    color: stat.color,
  }));

  const experiences = [
    {
      title: "Organic Compost for Agriculture",
      subtitle: "Process:",
      description:
        "Food waste is placed in composting bins with microbial cultures to decompose naturally. After 4-6 weeks, the waste turns into organic fertilizer, rich in nutrients.",
      application:
        "Used by farmers, urban gardens, and home gardeners to enrich soil.",
      icon: <Leaf className="w-6 h-6 text-white" />,
      color: "bg-blue-400",
    },
    {
      title: "Biogas Production for Renewable Energy",
      description:
        "Generates biogas (methane) collected for cooking, heating, or electricity. The byproduct can be used as a liquid fertilizer.",
      application:
        "Powers community kitchens, schools, and farms, reducing dependence on fossil fuels.",
      icon: <Zap className="w-6 h-6 text-white" />,
      color: "bg-green-500",
    },
    {
      title: "Animal Feed for Livestock Farming",
      description:
        "Food scraps safe for consumption are distributed to farms and shelters, reducing the need for commercial feed.",
      application:
        "Supports livestock farmers by lowering feed costs.",
      icon: <Users className="w-6 h-6 text-white" />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-8 animate-fade-in">
        <div className="w-full md:w-1/4 lg:w-1/5">
          <img
            src={img}
            alt="Header Image"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-full text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Together, We Can Achieve{" "}
            <span className="text-green-600">Zero Food Waste!</span>
          </h1>
          <p className="text-lg font-medium text-gray-600 mb-2">
            Congratulations! You are now part of a growing community
          </p>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Your impact starts here –{" "}
            <span className="font-semibold text-green-600">connect</span>,{" "}
            <span className="font-semibold text-green-600">collect</span>, and{" "}
            <span className="font-semibold text-green-600">change lives</span>.
            Join us in creating a sustainable future.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <Card
            key={index}
            className={`${stat.color} text-white transform transition-all hover:scale-105 animate-fade-in-up delay-${index * 100}`}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-2xl font-bold mt-2">Loading...</p>
              ) : (
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions Section */}
      {/* Quick Actions and Listings Overview Section */}
<div className="flex  flex-col lg:flex-row gap-6">
  {/* Quick Actions Section */}
  {/* Quick Actions and Listings Overview Section */}
<div className="flex flex-col lg:flex-row gap-6">
  {/* Quick Actions Section */}
  <Card className="flex-1 h-full min-h-[400px] transform transition-all hover:scale-[1.02] animate-fade-in-up delay-700">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-gray-900 h-25">Quick Actions</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Add Listing Button */}
        
          <Button className="flex flex-col items-center justify-center gap-3 p-6 w-full h-40 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all transform hover:scale-105 animate-fade-in-up delay-100">
            <UserPlus className="w-12 h-12" />
            <span className="text-lg font-semibold text-center">Add Listing</span>
          </Button>
     

        {/* Create Project Button */}
 
          <Button className="flex flex-col items-center justify-center gap-3 p-6 w-full h-40 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-all transform hover:scale-105 animate-fade-in-up delay-200">
            <FolderPlus className="w-12 h-12" />
            <span className="text-lg font-semibold text-center">Add review</span>
          </Button>
       

          <Button className="flex flex-col items-center justify-center gap-3 p-6 w-full h-40 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-all transform hover:scale-105 animate-fade-in-up delay-300">
            <FileText className="w-12 h-12" />
            <span className="text-lg font-semibold text-center">Zero Waste</span>
          </Button>
      

        {/* Track Donation Button */}
  
          <Button className="flex flex-col items-center justify-center gap-3 p-6 w-full h-40 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-all transform hover:scale-105 animate-fade-in-up delay-400">
            <BarChart className="w-12 h-12" />
            <span className="text-lg font-semibold text-center">Track Donation</span>
          </Button>
 
      </div>
    </CardContent>
  </Card>

  {/* Listings Overview (Progress Bars) */}

</div>


  {/* Listings Overview (Progress Bars) */}
  <Card className="flex-1 transform transition-all hover:scale-[1.02] h-22animate-fade-in-up delay-500">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-gray-900">
        Listings Overview
      </CardTitle>
      <CardDescription>Distribution of listing stats</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {progressData.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {item.title}
              </span>
              <Badge variant="outline" className="text-sm">
                {item.percentage}%
              </Badge>
            </div>
            <Progress value={item.percentage} className="h-2" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
</div>

      {/* Experience Section */}
      <section id="experience" className="py-6 bg-gradient-to-b from-gray-50 to-gray-100 mt-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-800 flex items-center justify-center gap-2">
          Sustainable Uses of Leftover Food: <br /> Turning Waste into Resources
        </h2>

        <div className="relative max-w-6xl mx-auto px-4 py-12">
          {/* Timeline */}
          <div className="absolute left-1/2 w-1 bg-gradient-to-b from-gray-300 to-gray-800 h-full transform -translate-x-1/2 rounded-full"></div>

          <div className="space-y-2 relative">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative w-full flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
                {/* Arrow Indicator */}
                <div
                  className={`absolute w-6 h-6 ${exp.color} rounded-full left-1/2 transform -translate-x-1/2 -translate-y-2 flex items-center justify-center shadow-lg`}
                >
                  {exp.icon}
                </div>

                <Card className="max-w-md p-4 shadow-lg transition-all transform hover:scale-[1.02] hover:shadow-xl">
                  <CardContent>
                    <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                    {exp.subtitle && <div className="text-md text-gray-600 mt-1">{exp.subtitle}</div>}
                    <p className="mt-2 text-sm text-gray-700">{exp.description}</p>
                    <p className="mt-1 text-xs text-gray-600">{exp.application}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div className="text-center mt-4">
          <Link to="/user/NGO/provider">
            <Button className="px-6 py-6 text-white bg-gradient-to-r bg-gray-800 transition-all transform hover:scale-105 shadow-md">
              Providers Helping NGOs <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Related NGOs Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related NGOs</h2>
        <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden">
          {/* First NGO Section */}
          <div className="flex-1 p-6 border-r border-red-700">
            <div className="transform transition-all hover:scale-105">
              <h3 className="text-xl font-bold text-gray-800">Food for All</h3>
              <p className="text-gray-600 mt-2">A global initiative to reduce food waste and feed the hungry.</p>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="w-px bg-red-700"></div>

          {/* Second NGO Section */}
          <div className="flex-1 p-6 border-r border-red-700">
            <div className="transform transition-all hover:scale-105">
              <h3 className="text-xl font-bold text-gray-800">Zero Hunger</h3>
              <p className="text-gray-600 mt-2">Working towards a world without hunger by 2030.</p>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="w-px bg-red-700"></div>

          {/* Third NGO Section */}
          <div className="flex-1 p-6">
            <div className="transform transition-all hover:scale-105">
              <h3 className="text-xl font-bold text-gray-800">Save the Food</h3>
              <p className="text-gray-600 mt-2">Rescuing surplus food and delivering it to those in need.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard