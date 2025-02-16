import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Package, AlertCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const FoodDonationManagement = () => {
  const [donations, setDonations] = useState([
    {
      id: 1,
      type: "Food",
      quantity: "50 kg",
      donor: "John Doe",
      date: "2024-09-01",
      status: "Pending",
    },
    {
      id: 2,
      type: "Clothes",
      quantity: "100 pieces",
      donor: "Jane Smith",
      date: "2024-09-05",
      status: "Active",
    },
    {
      id: 3,
      type: "Food",
      quantity: "30 kg",
      donor: "Alice Johnson",
      date: "2024-09-10",
      status: "Completed",
    },
    {
      id: 4,
      type: "Food",
      quantity: "20 kg",
      donor: "Bob Brown",
      date: "2024-09-15",
      status: "Expired",
    },
    {
      id: 5,
      type: "Clothes",
      quantity: "50 pieces",
      donor: "Charlie Davis",
      date: "2024-09-20",
      status: "Rejected",
    },
  ]);

  const handleApprove = (id) => {
    setDonations(donations.map(donation => donation.id === id ? { ...donation, status: "Active" } : donation));
  };

  const handleReject = (id) => {
    setDonations(donations.map(donation => donation.id === id ? { ...donation, status: "Rejected" } : donation));
  };

  const handleComplete = (id) => {
    setDonations(donations.map(donation => donation.id === id ? { ...donation, status: "Completed" } : donation));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <Badge variant="warning">Pending</Badge>;
      case "Active":
        return <Badge variant="success">Active</Badge>;
      case "Completed":
        return <Badge variant="primary">Completed</Badge>;
      case "Expired":
        return <Badge variant="destructive">Expired</Badge>;
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
  <div className="flex min-h-screen w-full bg-gray-50 justify-center">
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Food Donation Management</h1>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="expired">Expired/Rejected</TabsTrigger>
        </TabsList>

        {/* Pending Donations */}
        <TabsContent value="pending">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations
                  .filter((donation) => donation.status === "Pending")
                  .map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>{donation.type}</TableCell>
                      <TableCell>{donation.quantity}</TableCell>
                      <TableCell>{donation.donor}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>{getStatusBadge(donation.status)}</TableCell>
                      <TableCell>
                        <Button variant="success" size="sm" onClick={() => handleApprove(donation.id)}>
                          <CheckCircle className="mr-2" size={16} /> Approve
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleReject(donation.id)}>
                          <XCircle className="mr-2" size={16} /> Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Active Donations */}
        <TabsContent value="active">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations
                  .filter((donation) => donation.status === "Active")
                  .map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>{donation.type}</TableCell>
                      <TableCell>{donation.quantity}</TableCell>
                      <TableCell>{donation.donor}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>{getStatusBadge(donation.status)}</TableCell>
                      <TableCell>
                        <Button variant="primary" size="sm" onClick={() => handleComplete(donation.id)}>
                          <Package className="mr-2" size={16} /> Complete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Completed Donations */}
        <TabsContent value="completed">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations
                  .filter((donation) => donation.status === "Completed")
                  .map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>{donation.type}</TableCell>
                      <TableCell>{donation.quantity}</TableCell>
                      <TableCell>{donation.donor}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>{getStatusBadge(donation.status)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Expired/Rejected Donations */}
        <TabsContent value="expired">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations
                  .filter((donation) => donation.status === "Expired" || donation.status === "Rejected")
                  .map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>{donation.type}</TableCell>
                      <TableCell>{donation.quantity}</TableCell>
                      <TableCell>{donation.donor}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>{getStatusBadge(donation.status)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default FoodDonationManagement;
