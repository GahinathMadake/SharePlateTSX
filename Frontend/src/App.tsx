import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Various Pages
import LandingPage from './Pages/LandingPage';
import LoginRegister from "./Pages/LoginRegister";
import Login from "./components/common/LoginForm";
import Register from "./components/common/SignUpForm";
import ForgotPassword from "./components/common/ForgotPassword";

// Import Dashboard Components
import UserDashboard from "./Pages/UserDashBoard";
import Profile from './components/Dashboard/Profile';
import Dashboard from "./Admin/Analytics";
import NgoRegistration from "./Admin/NgoManagementDashboard";
import ActiveUser from "./Admin/UserList";
import DonationManagement from "./Admin/DonationManagement";
import ContentManagement  from "./Admin/ContentManagement";

function App() {
 

  return (

  <Router>
      <Routes>
        <Route index element={<LandingPage />} />

        <Route path="/user" element={<LoginRegister />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
        </Route>

        <Route path="/user/Admin" element={<UserDashboard />}>
           <Route index element={<Dashboard />} />
           <Route path='ngomanagement' element={<NgoRegistration />} />
           <Route path='donationmanagement' element={<DonationManagement />} />
           <Route path='userList' element={<ActiveUser/>} />
            <Route path='contentManagement' element={<ContentManagement />} />
        </Route>


      </Routes>
    </Router>

    // <div>
        
    //     <Dashboard></Dashboard>
    //     <NgoRegistration></NgoRegistration>
    //     <DonationManagement></DonationManagement>
    //     <ActiveUser></ActiveUser>
    //     <ContentManagement></ContentManagement>
        
        
    // </div>
  )
}

export default App;
