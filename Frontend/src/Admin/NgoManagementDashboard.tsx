import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const NgoManagementDashboard = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Helping Hands",
      email: "helpinghands@example.com",
      registrationDate: "2024-09-01",
      status: "Pending",
      registrationNumber: "123456789",
      phone: "+1234567890",
      address: "123 Main St, New York, NY",
      documents: [
        { name: "Registration Certificate", url: "https://example.com/doc1.pdf" },
        { name: "Tax ID", url: "https://example.com/doc2.pdf" },
      ],
    },
    {
      id: 2,
      name: "Food for All",
      email: "foodforall@example.com",
      registrationDate: "2024-09-05",
      status: "Pending",
      registrationNumber: "987654321",
      phone: "+9876543210",
      address: "456 Elm St, London, UK",
      documents: [
        { name: "Registration Certificate", url: "https://example.com/doc3.pdf" },
        { name: "Tax ID", url: "https://example.com/doc4.pdf" },
      ],
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'details'

  const handleApprove = (id) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: "Approved" } : req));
    setSelectedRequest(null);
    setViewMode("table");
  };

  const handleReject = (id) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: "Rejected", rejectionReason } : req));
    setSelectedRequest(null);
    setRejectionReason("");
    setViewMode("table");
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setViewMode("details");
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 justify-center">
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">NGO Management Dashboard</h1>

        {viewMode === "table" ? (
          <div className="overflow-x-auto">
            <Table className="bg-white rounded-lg shadow-md w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">NGO Name</TableHead>
                  <TableHead className="text-left">Email</TableHead>
                  <TableHead className="text-left">Registration Date</TableHead>
                  <TableHead className="text-left">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.registrationDate}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          request.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : request.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(request)}>
                        <FileText className="mr-2" size={16} /> View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl font-bold mb-4">{selectedRequest?.name}</h2>
            <div className="space-y-4">
              <p><strong>Registration Number:</strong> {selectedRequest?.registrationNumber}</p>
              <p><strong>Email:</strong> {selectedRequest?.email}</p>
              <p><strong>Phone:</strong> {selectedRequest?.phone}</p>
              <p><strong>Address:</strong> {selectedRequest?.address}</p>
              <div>
                <h3 className="font-bold mb-2">Documents</h3>
                <ul className="space-y-2">
                  {selectedRequest?.documents.map((doc, index) => (
                    <li key={index}>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        <FileText className="inline mr-2" size={16} /> {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button variant="success" onClick={() => handleApprove(selectedRequest?.id)}>
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
              <Button variant="destructive" onClick={() => handleReject(selectedRequest?.id)}>
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





// import React, { useState } from "react";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { CheckCircle, XCircle, FileText } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";

// const NgoManagementDashboard = () => {
//   const [requests, setRequests] = useState([
//     {
//       id: 1,
//       name: "Helping Hands",
//       email: "helpinghands@example.com",
//       registrationDate: "2024-09-01",
//       status: "Pending",
//       registrationNumber: "123456789",
//       phone: "+1234567890",
//       address: "123 Main St, New York, NY",
//       documents: [
//         { name: "Registration Certificate", url: "https://example.com/doc1.pdf" },
//         { name: "Tax ID", url: "https://example.com/doc2.pdf" },
//       ],
//     },
//     {
//       id: 2,
//       name: "Food for All",
//       email: "foodforall@example.com",
//       registrationDate: "2024-09-05",
//       status: "Pending",
//       registrationNumber: "987654321",
//       phone: "+9876543210",
//       address: "456 Elm St, London, UK",
//       documents: [
//         { name: "Registration Certificate", url: "https://example.com/doc3.pdf" },
//         { name: "Tax ID", url: "https://example.com/doc4.pdf" },
//       ],
//     },
//   ]);

//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [viewMode, setViewMode] = useState("table"); // 'table' or 'details'

//   const handleApprove = (id) => {
//     setRequests(requests.map(req => req.id === id ? { ...req, status: "Approved" } : req));
//     setSelectedRequest(null);
//     setViewMode("table");
//   };

//   const handleReject = (id) => {
//     setRequests(requests.map(req => req.id === id ? { ...req, status: "Rejected", rejectionReason } : req));
//     setSelectedRequest(null);
//     setRejectionReason("");
//     setViewMode("table");
//   };

//   const handleViewDetails = (request) => {
//     setSelectedRequest(request);
//     setViewMode("details");
//   };

//   return (
//     <div className="flex min-h-screen w-full bg-gray-50 justify-center">
//       <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">NGO Management Dashboard</h1>

//         {viewMode === "table" ? (
//           <div className="overflow-x-auto">
//             <Table className="bg-white rounded-lg shadow-md w-full">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="text-left">NGO Name</TableHead>
//                   <TableHead className="text-left">Email</TableHead>
//                   <TableHead className="text-left">Registration Date</TableHead>
//                   <TableHead className="text-left">Status</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {requests.map((request) => (
//                   <TableRow key={request.id} className="hover:bg-gray-50 transition-colors">
//                     <TableCell className="font-medium">{request.name}</TableCell>
//                     <TableCell>{request.email}</TableCell>
//                     <TableCell>{request.registrationDate}</TableCell>
//                     <TableCell>
//                       <span
//                         className={`px-2 py-1 rounded-full text-sm ${
//                           request.status === "Pending"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : request.status === "Approved"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {request.status}
//                       </span>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <Button variant="outline" size="sm" onClick={() => handleViewDetails(request)}>
//                         <FileText className="mr-2" size={16} /> View Details
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//             <h2 className="text-xl font-bold mb-4">{selectedRequest?.name}</h2>
//             <div className="space-y-4">
//               <p><strong>Registration Number:</strong> {selectedRequest?.registrationNumber}</p>
//               <p><strong>Email:</strong> {selectedRequest?.email}</p>
//               <p><strong>Phone:</strong> {selectedRequest?.phone}</p>
//               <p><strong>Address:</strong> {selectedRequest?.address}</p>
//               <div>
//                 <h3 className="font-bold mb-2">Documents</h3>
//                 <ul className="space-y-2">
//                   {selectedRequest?.documents.map((doc, index) => (
//                     <li key={index}>
//                       <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                         <FileText className="inline mr-2" size={16} /> {doc.name}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//                 <Button variant="success" onClick={() => handleApprove(selectedRequest?.id)}>
//                   <CheckCircle className="mr-2" size={16} /> Approve
//                 </Button>
//                 <Button variant="destructive" onClick={() => setViewMode("reject")}>
//                   <XCircle className="mr-2" size={16} /> Reject
//                 </Button>
//                 <Button variant="outline" onClick={() => setViewMode("table")}>
//                   Back to List
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Reject Modal */}
//         <Dialog open={viewMode === "reject"} onOpenChange={() => setViewMode("details")}>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Reject {selectedRequest?.name}</DialogTitle>
//               <DialogDescription>Provide a reason for rejecting this NGO.</DialogDescription>
//             </DialogHeader>
//             <div className="space-y-4">
//               <Textarea
//                 placeholder="Reason for rejection"
//                 value={rejectionReason}
//                 onChange={(e) => setRejectionReason(e.target.value)}
//                 className="w-full"
//               />
//             </div>
//             <DialogFooter>
//               <Button variant="destructive" onClick={() => handleReject(selectedRequest?.id)}>
//                 Confirm Reject
//               </Button>
//               <Button variant="outline" onClick={() => setViewMode("details")}>
//                 Cancel
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default NgoManagementDashboard;