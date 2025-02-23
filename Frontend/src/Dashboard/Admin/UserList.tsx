
import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Shield, CheckCircle, XCircle, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import axios from "axios";

const ActiveUser = () => {
  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("all"); // "all", "donor", or "ngo"
  interface User {
    _id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    status: string; // Add this line
  }
  
  const [users, setUsers] = useState<User[]>([]);

 
  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);   //role based rendering 



  const fetchUsers = async () => {
    try {
      console.log(roleFilter);
      const response = await axios.get(`${import.meta.env.VITE_Backend_URL}/user/role/?role=${roleFilter}`,
        {withCredentials: true}
      );
      setUsers(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // const handleSuspend = (id) => {
  //   console.log(`User ${id} suspended`);
  //   // Add logic to update user status in the backend
  // };

  // const handleActivate = (id) => {
  //   console.log(`User ${id} activated`);
  //   // Add logic to update user status in the backend
  // };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase()) || 
                          user.role.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex min-h-screen w-full bg-gray-50 justify-center">
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl">
        {/* Search Bar and Role Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-5 h-5 text-gray-500" />
            <Input 
              type="text" 
              placeholder="Search users..." 
              className="w-full" 
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="donar">Donar</SelectItem>
                <SelectItem value="ngo">NGO</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <Table className="w-full border rounded-lg shadow-md">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <TableRow key={user._id} className={`hover:bg-gray-100 ${index % 2 ? "bg-gray-50" : ""}`}>
                    {/* User Avatar & Name */}
                    <TableCell className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {user.name}
                    </TableCell>
                    
                    {/* Email */}
                    <TableCell>{user.email}</TableCell>
                    
                    {/* Role with Icon */}
                    <TableCell className="flex items-center gap-2">
                      {user.role === "Donar" ? <User className="w-4 h-4 text-blue-500" /> : <Shield className="w-4 h-4 text-green-500" />}
                      {user.role}
                    </TableCell>
                    
                    {/* Registration Date */}
                    <TableCell>{user.createdAt}</TableCell>
                    
                    {/* Status Badge */}
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    
                    {/* Actions */}
                    <TableCell>
                    
                        <Button variant="success" size="sm" onClick={() => handleActivate(user.id)}>
                          <CheckCircle className="mr-2" size={16} /> Activate
                        </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6" className="text-center py-4 text-gray-500">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ActiveUser;

