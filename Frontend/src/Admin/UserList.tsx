import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Shield, CheckCircle, XCircle, Search } from "lucide-react";

const ActiveUser = () => {
  const [search, setSearch] = React.useState("");

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Donor", registrationDate: "2024-08-01", status: "Active" },
    { id: 2, name: "Helping Hands", email: "helpinghands@example.com", role: "NGO", registrationDate: "2024-09-01", status: "Active" },
    { id: 3, name: "Jane Smith", email: "jane@example.com", role: "Donor", registrationDate: "2024-07-15", status: "Suspended" },
  ];

  const handleSuspend = (id) => {
    console.log(`User ${id} suspended`);
    // Add logic to update user status in the backend
  };

  const handleActivate = (id) => {
    console.log(`User ${id} activated`);
    // Add logic to update user status in the backend
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) || 
    user.email.toLowerCase().includes(search.toLowerCase()) || 
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        
        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-gray-500" />
          <Input 
            type="text" 
            placeholder="Search users..." 
            className="w-full" 
            onChange={(e) => setSearch(e.target.value)}
          />
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
                  <TableRow key={user.id} className={`hover:bg-gray-100 ${index % 2 ? "bg-gray-50" : ""}`}>
                    
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
                      {user.role === "Donor" ? <User className="w-4 h-4 text-blue-500" /> : <Shield className="w-4 h-4 text-green-500" />}
                      {user.role}
                    </TableCell>
                    
                    {/* Registration Date */}
                    <TableCell>{user.registrationDate}</TableCell>
                    
                    {/* Status Badge */}
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "success" : "destructive"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    
                    {/* Actions */}
                    <TableCell>
                      {user.status === "Active" ? (
                        <Button variant="destructive" size="sm" onClick={() => handleSuspend(user.id)}>
                          <XCircle className="mr-2" size={16} /> Suspend
                        </Button>
                      ) : (
                        <Button variant="success" size="sm" onClick={() => handleActivate(user.id)}>
                          <CheckCircle className="mr-2" size={16} /> Activate
                        </Button>
                      )}
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

