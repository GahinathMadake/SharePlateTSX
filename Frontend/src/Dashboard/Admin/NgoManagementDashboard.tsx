import React, { useState , useEffect} from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';

const NgoManagementDashboard = () => {
  interface Request {
    _id: number;
    name: string;
    email: string;
    createdAt: string;
    isVerified: string;
    registrationNumber: string;
    phone: string;
  }
  
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'details'




  


  /*
   */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_Backend_URL}/api/ngos/pending`,
      {credentials: 'include'}
    )
      .then((res) => res.json())
      .then((data) => setRequests(data.ngos))
      .catch((err) => console.error(err));
     // console.log("reuests",requests);
      // console.log("requests",res.json());
  }, []);
  

  
  const handleApprove = async (id: number) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_Backend_URL}/api/ngos/approve/${id}`, {
        withCredentials: true, 
      });
      
  
      if (response.status !== 200) {
        throw new Error("Failed to approve NGO");
      }
  
      const updatedNgo = response.data;

      // Update state with the new status
      setRequests(requests.map(req => req._id === id ? { ...req, isVerified: updatedNgo.ngo.isVerified} : req));
      setSelectedRequest(null);
      setViewMode("table");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error approving NGO:", error.message);
      } else {
        console.error("Error approving NGO:", error);
      }
    }   
  };



  const handleReject =async (id: number) => {
  const response = await fetch(`${import.meta.env.VITE_Backend_URL}/api/ngos/reject/${id}`, {
    method: "DELETE",
    credentials: 'include',
    body: JSON.stringify({ rejectionReason }),  // Send rejection reason
  });
  
  const text = await response.text();  // Get response as text first
  console.log(text);  // Log raw response
  
  try {
      const data = JSON.parse(text);  // Try parsing the text as JSON
      
      if (!response.ok) {
          throw new Error("Failed to delete NGO");
      }
  
      // Remove the NGO from UI state
      setRequests(requests.filter(req => req._id !== id));
  
      // Use `data.rejectionData` for sending an email
      console.log("Rejected NGO details:", data.rejectionData);
  
      setSelectedRequest(null);
      setRejectionReason("");
      setViewMode("table");
  } catch (error) {
      console.error("Error rejecting NGO:", error);
  }
  

  };

  const handleViewDetails = (request: Request) => {
    setSelectedRequest(request);
    setViewMode("details");
  };

  return (
    <div className="flex min-h-screen w-full  justify-center">
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">NGO Management Dashboard</h1>
  
        {viewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="bg-white rounded-lg shadow-md w-full">
              <thead>
                <tr className="border-b">
                  <td className="p-3 w-3/12 text-sm">NGO Name</td>
                  <td className="p-3 w-3/12 text-sm">Email</td>
                  <td className="p-3 w-2/12 text-sm">Registration Date</td>
                  <td className="p-3 w-2/12 text-sm text-center">Status</td>
                  <td className="p-3 w-2/12 text-sm text-center">Actions</td>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50 transition-colors">
                    
                    <td className="p-3 text-lg font-semibold">{request.name}</td>
                    
                    <td className="p-3 text-lg font-semibold">{request.email}</td>
                    
                    <td className="p-3 text-lg font-semibold">{request.createdAt.split("T")[0]}</td>
                    
                    <td className="p-3 text-lg font-semibold">
                      <div className="w-full flex justify-center items-center">
                        <Button
                          className="rounded-full cursor-auto font-semibold bg-yellow-400 hover:bg-yellow-500"
                        >
                          
                          Pending
                        </Button>
                      </div>
                    </td>

                    <td className="p-3 text-lg text-right font-semibold">
                      <Button
                        variant="outline"
                        onClick={() => handleViewDetails(request)}
                        className="rounded-full bg-blue-400 hover:bg-blue-500 text-black font-semibold"
                      >
                        <FileText className="mr-2" size={16} /> View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl font-bold mb-4">{selectedRequest?.name}</h2>
            <div className="space-y-4">
              <p><strong>Registration Number:</strong> {selectedRequest?.registrationNumber}</p>
              <p><strong>Email:</strong> {selectedRequest?.email}</p>
              <p><strong>Phone:</strong> {selectedRequest?.phone}</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button variant="default" onClick={() => selectedRequest && handleApprove(selectedRequest._id)}>
                  <CheckCircle className="mr-2" size={16} /> Approve
                </Button>
                <Button variant="destructive" onClick={() => setViewMode("reject")}>
                  <XCircle className="mr-2" size={16} /> Reject
                </Button>
                <Button variant="outline" onClick={() => setViewMode("table")}>
                  Back to List
                </Button>
              </div>
            </div>
          </div>
        )}
  
        {/* Reject Modal */}
        <Dialog open={viewMode === "reject"} onOpenChange={() => setViewMode("details")}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reject {selectedRequest?.name}</DialogTitle>
              <DialogDescription>Provide a reason for rejecting this NGO.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Reason for rejection"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full"
              />
            </div>
            <DialogFooter>
              <Button variant="destructive" onClick={() => selectedRequest && handleReject(selectedRequest._id)}>
                Confirm Reject
              </Button>
              <Button variant="outline" onClick={() => setViewMode("details")}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );

};

export default NgoManagementDashboard;







// import { useState } from "react";
// import axios from "axios";


// export default function NgoManagementDashboard() {
//   const [donorId, setDonorId] = useState("");
//   const [matches, setMatches] = useState<{ name: string; distance: number }[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       const response = await axios.post(import.meta.env.VITE_Backend_URL+"/api/donations/match-ngos", 
//         { donorId },
//         { withCredentials: true }
//       );

//       console.log(response);
//       setMatches(response.data.matches);
//     } catch (err) {
//       console.log(err);
//       setError("Failed to fetch matches-i am here");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Find Matching NGOs</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           value={donorId}
//           onChange={(e) => setDonorId(e.target.value)}
//           placeholder="Enter Donor ID"
//           className="border p-2 w-full"
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 w-full">
//           Find NGOs
//         </button>
//       </form>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//       {matches.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Matching NGOs:</h3>
//           <ul>
//             {matches.map((ngo, index) => (
//               <li key={index} className="p-2 border-b">
//                 {ngo.name} - {ngo.distance.toFixed(2)} km away
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
