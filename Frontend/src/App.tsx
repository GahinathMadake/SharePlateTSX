import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Various Pages
import LandingPage from './Pages/LandingPage';
import LoginRegister from "./Pages/LoginRegister";
import Login from "./components/common/LoginForm";
import Register from "./components/common/SignUpForm";
import ForgotPassword from "./components/common/ForgotPassword";

// Import Dashboard Components
import AdminDashboard from "./Pages/AdminDashboard";
import NGODashboard from "./Pages/NGODashboard";
import DonarDashboard from "./Pages/DonarDashboard";

import Dashboard from "./Dashboard/Admin/Analytics";
import NgoRegistration from "./Dashboard/Admin/NgoManagementDashboard";
import ActiveUser from "./Dashboard/Admin/UserList";
import DonationManagement from "./Dashboard/Admin/DonationManagement";
import ContentManagement  from "./Dashboard/Admin/ContentManagement";

// Import NGO Components
import NGODash from './Dashboard/ngo/Dashboard';
import AvailableDonations from "./Dashboard/ngo/AvailableDonations";
import MyDonations from "./Dashboard/ngo/Donations/MyDonations";
import TrackDonations from "./Dashboard/ngo/Donations/TrackDonations";

import Profile from './Dashboard/common/Profile';
import Review from "./Dashboard/ngo/Review";
import Contact from "./Dashboard/common/Contact";


function App(){

  return (

  <Router>
      <Routes>
        <Route index element={<LandingPage />} />

        <Route path="/user" element={<LoginRegister />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
        </Route>

        <Route path="/user/Admin" element={<AdminDashboard />}>
           <Route index element={<Dashboard />} />
           <Route path='ngomanagement' element={<NgoRegistration />} />
           <Route path='donationmanagement' element={<DonationManagement />} />
           <Route path='userList' element={<ActiveUser/>} />
          <Route path='contentManagement' element={<ContentManagement />} />
        </Route>

        <Route path="/user/NGO" element={<NGODashboard />}>
           <Route index element={<NGODash />} />
           <Route path="listings" element={<AvailableDonations />} />
           <Route path="trackdonations" element={<TrackDonations />} />
           <Route path="donationhistory" element={<MyDonations />} />

           {/* User Profiles */}
           <Route path="id/:userId" element={<Profile />} />
           <Route path="reviews" element={<Review />} />
           <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/user/Donar" element={<DonarDashboard />}>
           <Route index element={<NGODash />} />
        </Route>

      </Routes>
    </Router>
        
  )
}

export default App;
