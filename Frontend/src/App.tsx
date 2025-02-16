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

        <Route path="/user/:userType" element={<UserDashboard />}>
           <Route index element={<Profile />} />
        </Route>


      </Routes>
    </Router>
  )
}

export default App;
