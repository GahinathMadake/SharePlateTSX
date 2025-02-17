import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const MyDonations: React.FC = () => {
  const [view, setView] = useState<"table" | "graph">("table");

  const pastDonations = [
    { id: 1, date: "2024-01-15", ngo: "NGO A", persons: 50, status: "Completed" },
    { id: 2, date: "2024-02-20", ngo: "NGO B", persons: 75, status: "Completed" },
    { id: 3, date: "2024-03-10", ngo: "NGO C", persons: 60, status: "Completed" },
    { id: 4, date: "2024-04-05", ngo: "NGO D", persons: 90, status: "Completed" },
  ];

  const chartData = [
    { month: "January", ngoA: 50, ngoB: 75, ngoC: 60, ngoD: 90 },
    { month: "February", ngoA: 60, ngoB: 80, ngoC: 70, ngoD: 100 },
    { month: "March", ngoA: 55, ngoB: 85, ngoC: 65, ngoD: 95 },
    { month: "April", ngoA: 70, ngoB: 90, ngoC: 75, ngoD: 110 },
  ];

  const pieChartData = [
    { name: "NGO A", value: 50, fill: "#8884d8" },
    { name: "NGO B", value: 75, fill: "#82ca9d" },
    { name: "NGO C", value: 60, fill: "#ffc658" },
    { name: "NGO D", value: 90, fill: "#ff8042" },
  ];

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Past Donations</h1>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
        <Button
          variant={view === "table" ? "default" : "outline"}
          onClick={() => setView("table")}
          className="w-full sm:w-auto"
        >
          Show Table
        </Button>
        <Button
          variant={view === "graph" ? "default" : "outline"}
          onClick={() => setView("graph")}
          className="w-full sm:w-auto"
        >
          Show Graph
        </Button>
      </div>

      {view === "table" ? (
        <Card>
          <CardHeader>
            <CardTitle>Donation History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 sm:p-4">Date</th>
                    <th className="p-2 sm:p-4">NGO</th>
                    <th className="p-2 sm:p-4">Persons Fed</th>
                    <th className="p-2 sm:p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pastDonations.map((donation) => (
                    <tr key={donation.id} className="border-t">
                      <td className="p-2 sm:p-4">{donation.date}</td>
                      <td className="p-2 sm:p-4">{donation.ngo}</td>
                      <td className="p-2 sm:p-4">{donation.persons}</td>
                      <td className="p-2 sm:p-4 text-green-600">{donation.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Persons Fed per NGO (Monthly)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ngoA" fill="#8884d8" name="NGO A" />
                  <Bar dataKey="ngoB" fill="#82ca9d" name="NGO B" />
                  <Bar dataKey="ngoC" fill="#ffc658" name="NGO C" />
                  <Bar dataKey="ngoD" fill="#ff8042" name="NGO D" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Persons Fed per NGO</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={70}
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
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