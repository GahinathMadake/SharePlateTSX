

// // Import Various Pages
// import LandingPage from './Pages/LandingPage';
// import LoginRegister from "./Pages/LoginRegister";
// import Login from "./components/common/LoginForm";
// import Register from "./components/common/SignUpForm";

// // Import Dashboard Components
// import UserDashboard from "./Pages/UserDashBoard";
// import Profile from './components/Dashboard/Profile';
import RestaurantDashBoard from "./Pages/RestaurantDashBoard";


function App() {
  
  return (

    <div>

{/*    
  <Router>
      <Routes>
        <Route index element={<LandingPage />} />

        <Route path="/user" element={<LoginRegister />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
        </Route>

        <Route path="/user/:userType" element={<UserDashboard />}>
           <Route index element={<Profile />} />
        </Route>

        

      </Routes>
    </Router>
*/}
    <RestaurantDashBoard /> 
    </div>
  )
}

export default App;
