import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { format } from 'date-fns';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Donation {
  _id: string;
  foodType: string;
  quantity: number;
  expirationDate: string;
  pickupLocation: string;
  description: string;
  imageUrl: string;
  donor: {
    _id: string;
    name: string;
  };
  status: 'pending' | 'accepted' | 'delivered';
  createdAt: string;
}

const GRADIENT_IDS = ['gradient-1', 'gradient-2', 'gradient-3'];

const MyDonations: React.FC = () => {
  const [view, setView] = useState<"table" | "graph">("table");
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);


  
        const response = await axios.get<Donation[]>(
          `${import.meta.env.VITE_Backend_URL}/api/donations/my-donations`,
            {withCredentials: true}


        );
        setDonations(response.data);
      } catch (err) {
        console.error('Error fetching donations:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch donations');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const prepareChartData = () => {
    const monthlyData = donations.reduce((acc: any, donation) => {
      const month = format(new Date(donation.createdAt), 'MMMM');
      if (!acc[month]) {
        acc[month] = { month, total: 0 };
      }
      acc[month].total += donation.quantity;
      return acc;
    }, {});

    return Object.values(monthlyData);
  };

  const preparePieData = () => {
    const statusCount = donations.reduce((acc: any, donation) => {
      if (!acc[donation.status]) {
        acc[donation.status] = 0;
      }
      acc[donation.status]++;
      return acc;
    }, {});

    return Object.entries(statusCount).map(([name, value]) => ({
      name,
      value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">My Donations</h1>
      
      <div className="flex gap-4 mb-6">
        <Button 
          variant={view === "table" ? "default" : "outline"}
          onClick={() => setView("table")}
        >
          Table View
        </Button>
        <Button 
          variant={view === "graph" ? "default" : "outline"}
          onClick={() => setView("graph")}
        >
          Graph View
        </Button>
      </div>

      {view === "table" ? (
        <Card>
          <CardHeader>
            <CardTitle>Donation History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Food Type</th>
                    <th className="text-left p-4">Quantity</th>
                    <th className="text-left p-4">Expiration</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Location</th>
                    <th className="text-left p-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation._id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        {format(new Date(donation.createdAt), 'MMM dd, yyyy')}
                      </td>
                      <td className="p-4">{donation.foodType}</td>
                      <td className="p-4">{donation.quantity}</td>
                      <td className="p-4">
                        {format(new Date(donation.expirationDate), 'MMM dd, yyyy')}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          donation.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          donation.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="p-4">{donation.pickupLocation}</td>
                      <td className="p-4">{donation.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="items-center pb-0">
              <CardTitle className="text-xl font-bold">Monthly Donations</CardTitle>
              <CardDescription className="text-gray-600">
                Quantity by Month
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prepareChartData()}>
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#064e3b" />
                      <stop offset="100%" stopColor="#000000" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="url(#barGradient)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="items-center pb-0">
              <CardTitle className="text-xl font-bold">
                Donation Status Distribution
              </CardTitle>
              <CardDescription className="text-gray-600">
                Status Breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {GRADIENT_IDS.map((id, index) => (
                      <linearGradient
                        key={id}
                        id={id}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#064e3b" />
                        <stop 
                          offset="100%" 
                          stopColor={index === 0 ? "#000000" : 
                                   index === 1 ? "#1f2937" : 
                                   "#374151"}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={preparePieData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={65}
                    outerRadius={110}
                    strokeWidth={3}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {preparePieData().map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#${GRADIENT_IDS[index % GRADIENT_IDS.length]})`}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MyDonations;