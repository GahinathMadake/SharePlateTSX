import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const Pastdonation: React.FC = () => {
  // Sample data for past donations
  const pastDonations = [
    { id: 1, date: "2024-01-15", ngo: "NGO A", persons: 50, status: "Completed" },
    { id: 2, date: "2024-02-20", ngo: "NGO B", persons: 75, status: "Completed" },
    { id: 3, date: "2024-03-10", ngo: "NGO C", persons: 60, status: "Completed" },
    { id: 4, date: "2024-04-05", ngo: "NGO D", persons: 90, status: "Completed" },
  ];

  // Data for the bar chart (persons fed per NGO per month)
  const barChartData = [
    { month: "January", ngoA: 50, ngoB: 75, ngoC: 60, ngoD: 90 },
    { month: "February", ngoA: 60, ngoB: 80, ngoC: 70, ngoD: 100 },
    { month: "March", ngoA: 55, ngoB: 85, ngoC: 65, ngoD: 95 },
    { month: "April", ngoA: 70, ngoB: 90, ngoC: 75, ngoD: 110 },
  ];

  // Data for the pie chart (total persons fed per NGO)
  const pieChartData = [
    { name: "NGO A", value: 50, fill: "#8884d8" },
    { name: "NGO B", value: 75, fill: "#82ca9d" },
    { name: "NGO C", value: 60, fill: "#ffc658" },
    { name: "NGO D", value: 90, fill: "#ff8042" },
  ];

  // Data for the line chart (persons fed per NGO over time)
  const lineChartData = [
    { month: "January", ngoA: 50, ngoB: 75, ngoC: 60, ngoD: 90 },
    { month: "February", ngoA: 60, ngoB: 80, ngoC: 70, ngoD: 100 },
    { month: "March", ngoA: 55, ngoB: 85, ngoC: 65, ngoD: 95 },
    { month: "April", ngoA: 70, ngoB: 90, ngoC: 75, ngoD: 110 },
  ];

  // Data for the stacked bar chart (persons fed per NGO per month)
  const stackedBarChartData = [
    { month: "January", ngoA: 50, ngoB: 75, ngoC: 60, ngoD: 90 },
    { month: "February", ngoA: 60, ngoB: 80, ngoC: 70, ngoD: 100 },
    { month: "March", ngoA: 55, ngoB: 85, ngoC: 65, ngoD: 95 },
    { month: "April", ngoA: 70, ngoB: 90, ngoC: 75, ngoD: 110 },
  ];

  // State to toggle between table and graph view
  const [showGraph, setShowGraph] = useState(false);

  // Custom colors for charts
  const colors = {
    ngoA: "#8884d8", // Purple
    ngoB: "#82ca9d", // Green
    ngoC: "#ffc658", // Yellow
    ngoD: "#ff8042", // Orange
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Past Donations</h1>

      {/* Toggle Button */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowGraph(!showGraph)}
          className={`px-4 py-2 rounded-lg ${
            showGraph ? "bg-blue-500 text-white" : "bg-white text-gray-700"
          }`}
        >
          {showGraph ? "Show Table" : "Show Graph"}
        </button>
      </div>

      {/* Conditionally Render Table or Graphs */}
      {!showGraph ? (
        <Card>
          <CardHeader>
            <CardTitle>Donation History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NGO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Persons Fed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pastDonations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donation.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donation.ngo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donation.persons}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Showing all past donations.</p>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart Card */}
          <Card>
            <CardHeader>
              <CardTitle>Persons Fed per NGO (Monthly)</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center mt-5">
              <BarChart width={650} height={450} data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ngoA" fill={colors.ngoA} name="NGO A" barSize={50} />
                <Bar dataKey="ngoB" fill={colors.ngoB} name="NGO B" barSize={50} />
                <Bar dataKey="ngoC" fill={colors.ngoC} name="NGO C" barSize={50} />
                <Bar dataKey="ngoD" fill={colors.ngoD} name="NGO D" barSize={50} />
              </BarChart>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">Total persons fed per NGO per month.</p>
            </CardFooter>
          </Card>

          {/* Pie Chart Card */}
          <Card>
            <CardHeader>
              <CardTitle>Total Persons Fed per NGO</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <PieChart width={500} height={500}>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={170}
                  innerRadius={90}
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">Distribution of persons fed across NGOs.</p>
            </CardFooter>
          </Card>

          {/* Line Chart Card */}
          <Card>
            <CardHeader>
              <CardTitle>Persons Fed Over Time</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <LineChart width={650} height={450} data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ngoA" stroke={colors.ngoA} name="NGO A" />
                <Line type="monotone" dataKey="ngoB" stroke={colors.ngoB} name="NGO B" />
                <Line type="monotone" dataKey="ngoC" stroke={colors.ngoC} name="NGO C" />
                <Line type="monotone" dataKey="ngoD" stroke={colors.ngoD} name="NGO D" />
              </LineChart>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">Trend of persons fed over time.</p>
            </CardFooter>
          </Card>

          {/* Stacked Bar Chart Card */}
          <Card>
            <CardHeader>
              <CardTitle>Persons Fed per NGO (Stacked)</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <BarChart width={650} height={450} data={stackedBarChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ngoA" stackId="a" fill={colors.ngoA} name="NGO A" />
                <Bar dataKey="ngoB" stackId="a" fill={colors.ngoB} name="NGO B" />
                <Bar dataKey="ngoC" stackId="a" fill={colors.ngoC} name="NGO C" />
                <Bar dataKey="ngoD" stackId="a" fill={colors.ngoD} name="NGO D" />
              </BarChart>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">Stacked distribution of persons fed per NGO.</p>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Pastdonation;