import {BrowserRouter as  Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from './ProtectedRoutes';
import ProtectedApp from "./ProtectAPP";

// Import Various Pages
import LandingPage from '../Pages/LandingPage';
import LoginRegister from "../Pages/LoginRegister";
import Login from "../components/common/LoginForm";
import Register from "../components/common/SignUpForm";
import ForgotPassword from "../components/common/ForgotPassword";

// Import Dashboard Components
import AdminDashboard from "../Pages/AdminDashboard";
import NGODashboard from "../Pages/NGODashboard";
import DonarDashboard from "../Pages/DonarDashboard";

// Admin Dashboard Components
import Dashboard from "../Dashboard/Admin/Analytics";
import NgoRegistration from "../Dashboard/Admin/NgoManagementDashboard";
import ActiveUser from "../Dashboard/Admin/UserList";
import DonationManagement from "../Dashboard/Admin/DonationManagement";
import ContentManagement  from "../Dashboard/Admin/ContentManagement";
import ReviewAdmin from "../Dashboard/Admin/Reviewadmin";

// Donar Dashboard Components
import DonarDash from "../Dashboard/Donar/Dashboard";
import NewDonations from "../Dashboard/Donar/Donations/NewDonations";
import MyDonations from "../Dashboard/Donar/Donations/MyDonations";
import DonationForm from "../Dashboard/Donar/Donations/DonationForm";
import Notification from "../Dashboard/Donar/Notification";
import Reviewdonar from "../Dashboard/Donar/Reviewdonar";
import Donationactivity from "@/Dashboard/Donar/Donations/Donationactivity";


// Import NGO Components
import NGODash from '../Dashboard/ngo/Dashboard';
import AvailableDonations from "../Dashboard/ngo/AvailableDonations";
import Donations from "../Dashboard/ngo/Donations/MyDonations";
import TrackDonations from "../Dashboard/ngo/Donations/TrackDonations";
import Donor from "@/Dashboard/ngo/Donor";
import Provider from "../Dashboard/ngo/Provider";

import Profile from '../Dashboard/common/Profile';
import Review from "../Dashboard/ngo/Review";
import Contact from "../Dashboard/common/Contact";

function App(){

  return (
      <Routes>
        <Route element={<ProtectedApp />}>
            <Route index element={<LandingPage />} />

            <Route path="/user" element={<LoginRegister />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Register />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            </Route>

            <Route element={<ProtectedRoutes allowedRoles={["Admin"]} />}>
                <Route path="/user/Admin" element={<AdminDashboard />}>
                    <Route index element={<Dashboard />} />
                    <Route path='ngomanagement' element={<NgoRegistration />} />
                    <Route path='donationmanagement' element={<DonationManagement />} />
                    <Route path='userList' element={<ActiveUser/>} />
                    <Route path='contentManagement' element={<ContentManagement />} />

                    //<Route path='Reviewdonar' element={<Reviewdonar/>}/>
                    <Route path='Reviewadmin' element={<ReviewAdmin />} />

                </Route>
            </Route>
            

            <Route element={<ProtectedRoutes allowedRoles={["NGO"]} />}>
                <Route path="/user/NGO" element={<NGODashboard />}>
                    <Route index element={<NGODash />} />
                    <Route path="listings" element={<AvailableDonations />} />
                    <Route path="trackdonations" element={<TrackDonations />} />
                    <Route path="donationhistory" element={<Donations />} />
                    <Route path="allDonor" element={<Donor />} />
                    <Route path="provider" element={<Provider/>}/>
                    {/* User Profiles */}
                    <Route path="id/:userId" element={<Profile />} />
                    <Route path="reviews" element={<Review />} />
                    <Route path="contact" element={<Contact />} />
                </Route>
            </Route>
            
            <Route element={<ProtectedRoutes allowedRoles={["Donar"]} />}>
                <Route path="/user/Donar" element={<DonarDashboard />}>
                    <Route index element={<DonarDash />} />
                    <Route path='newdonation' element={<NewDonations />} />
                    <Route path='mydonations' element={<MyDonations />} />
                    <Route path='donationForm' element={<DonationForm/>}/>
                    <Route path='notification' element={<Notification/>}/>
                    <Route path='donationactivity' element={<Donationactivity/>}/>
                    
                    
                    <Route index element={<NGODash />} />

                    {/* User Profile  */}
                    <Route path="id/:userId" element={<Profile />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="reviews" element={<Reviewdonar/>}/>
                </Route>
            </Route>

            </Route>

      </Routes>
 )
}

export default App;
