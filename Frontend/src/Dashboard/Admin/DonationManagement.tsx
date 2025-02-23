
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Package, AlertCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";


interface Donation {
  _id: string;
  donor: string;
  ngo?: string;
  foodType: string;
  quantity: number;
  expirationDate: string;
  pickupLocation: string;
  status: "pending" | "accepted" | "delivered";
  createdAt: string;
}

const FoodDonationManagement = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [status, setStatus] = useState<"pending" | "accepted" | "delivered">("pending");

  useEffect(() => {
    fetchDonations();
  }, [status]);

  const fetchDonations = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_Backend_URL}/api/donations/alldonations`,
        {withCredentials: true}
      );
      setDonations(response.data);
      console.log("Donations:", response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const handleTabChange = (newStatus: "pending" | "accepted" | "delivered") => {
    setStatus(newStatus);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "accepted":
        return <Badge variant="secondary">Accepted</Badge>;
      case "delivered":
        return <Badge variant="secondary">Delivered</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };


return (
  <div className="flex min-h-screen w-full justify-center font-sans bg-gray-50">
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Food Donation Management</h1>

      <Tabs defaultValue="pending" onValueChange={handleTabChange}>
        {/* Tabs List */}
        <TabsList className="flex space-x-4 border-b border-gray-200 pb-2">
          <TabsTrigger
            value="pending"
            className="data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-all"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            className="data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-all"
          >
            Accepted
          </TabsTrigger>
          <TabsTrigger
            value="delivered"
            className="data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-all"
          >
            Delivered
          </TabsTrigger>
        </TabsList>

        {/* Pending Donations */}
        <TabsContent value="pending" className="mt-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 w-3/12 text-sm font-medium text-gray-600 text-left">Type</th>
                  <th className="p-3 w-3/12 text-sm font-medium text-gray-600 text-left">Quantity</th>
                  <th className="p-3 w-3/12 text-sm font-medium text-gray-600 text-left">Donor</th>
                  <th className="p-3 w-2/12 text-sm font-medium text-gray-600 text-left">Date</th>
                  <th className="p-3 w-1/12 text-sm font-medium text-gray-600 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations
                  .filter((donation) => donation.status === "pending")
                  .map((donation) => (
                    <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-sm text-gray-800">{donation.foodType}</td>
                      <td className="p-3 text-sm text-gray-800">{donation.quantity}</td>
                      <td className="p-3 text-sm text-gray-800">{donation.donor}</td>
                      <td className="p-3 text-sm text-gray-800">{donation.createdAt.split("T")[0]}</td>
                      <td className="p-3 text-sm text-gray-800">
                        <div className="w-full flex justify-center items-center">
                          <Button
                            className="rounded-full cursor-auto text-xs font-semibold bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          >
                            Pending
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Accepted Donations */}
        <TabsContent value="accepted" className="mt-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 w-3/12 text-sm font-medium text-gray-600 text-left">Type</th>
                  <th className="p-3 w-3/12 text-sm font-medium text-gray-600 text-left">Quantity</th>
                  <th className="p-3 w-3/12 text-sm font-medium text-gray-600 text-left">Donor</th>
                  <th className="p-3 w-2/12 text-sm font-medium text-gray-600 text-left">Date</th>
                  <th className="p-3 w-1/12 text-sm font-medium text-gray-600 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations
                  .filter((donation) => donation.status === "accepted")
                  .map((donation) => (
                    <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-sm text-gray-800">{donation.foodType}</td>
                      <td className="p-3 text-sm text-gray-800">{donation.quantity}</td>
                      <td className="p-3 text-sm text-gray-800">{donation.donor}</td>
                      <td className="p-3 text-sm text-gray-800">{donation.createdAt.split("T")[0]}</td>
                      <td className="p-3 text-sm text-gray-800">
                        <div className="w-full flex justify-center items-center">
                          <Button
                            className="rounded-full cursor-auto text-xs font-semibold bg-green-100 text-green-800 hover:bg-green-200"
                          >
                            Accepted
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Delivered Donations */}
        <TabsContent value="delivered" className="mt-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 w-3/12 text-sm font-medium text-gray-600 text-left">Type</th>
                  <th className="p-3 w-3/12 text-sm font-medium text-gray-600 text-left">Quantity</th>
                  <th className="p-3 w-3/12 text-sm font-medium text-gray-600 text-left">Donor</th>
                  <th className="p-3 w-2/12 text-sm font-medium text-gray-600 text-left">Date</th>
                  <th className="p-3 w-1/12 text-sm font-medium text-gray-600 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations
                  .filter((donation) => donation.status === "delivered")
                  .map((donation) => (
                    <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-sm text-gray-800">{donation.foodType}</td>
                      <td className="p-3 text-sm text-gray-800">{donation.quantity}</td>
                      <td className="p-3 text-sm text-gray-800">{donation.donor}</td>
                      <td className="p-3 text-sm text-gray-800">{donation.createdAt.split("T")[0]}</td>
                      <td className="p-3 text-sm text-gray-800">
                        <div className="w-full flex justify-center items-center">
                          <Button
                            className="rounded-full cursor-auto text-xs font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200"
                          >
                            Delivered
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Expired/Rejected Donations
        <TabsContent value="expired" className="mt-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 w-3/12 text-sm font-medium text-gray-600 text-left">Type</th>
                  <th className="p-3 w-3/12 text-sm font-medium text-gray-600 text-left">Quantity</th>
                  <th className="p-3 w-3/12 text-sm font-medium text-gray-600 text-left">Donor</th>
                  <th className="p-3 w-2/12 text-sm font-medium text-gray-600 text-left">Date</th>
                  <th className="p-3 w-1/12 text-sm font-medium text-gray-600 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations
                  .filter((donation) => donation.status === "accepted")
                  .map((donation) => (
                    <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-sm text-gray-800">{donation.foodType}</td>
                      <td className="p-3 text-sm text-gray-800">{donation.quantity}</td>
                      <td className="p-3 text-sm text-gray-800">{donation.donor}</td>
                      <td className="p-3 text-sm text-gray-800">{donation.createdAt.split("T")[0]}</td>
                      <td className="p-3 text-sm text-gray-800">
                        <div className="w-full flex justify-center items-center">
                          <Button
                            className="rounded-full cursor-auto text-xs font-semibold bg-red-100 text-red-800 hover:bg-red-200"
                          >
                            Expired/Rejected
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  </div>
);
};

export default FoodDonationManagement;
