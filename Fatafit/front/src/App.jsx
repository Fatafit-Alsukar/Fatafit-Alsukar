import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

import PatientRequest from "./Pages/PatientRequest/PatientRequest";
import Login from "./Pages/Login/Login";  
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import VolunteerRequest from "./Pages/VolunteerRequest/VolunteerRequest";
import MembershipRequest from "./Pages/MembershipRequest/MembershipRequest";
import Activities from "./Pages/Activities/Activities";
import Dashboard from "./Dashboard/Dashboard";
import ServicesPage from "./Pages/OurServices/OurServices";

function Layout() {
  return (
    <>
      {/* {!hideNavbarPages.includes(location.pathname) && <Navbar />} */}
      <Routes>
        <Route path="/patientrequest" element={<PatientRequest/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/changepassword" element={<ChangePassword/>} />
        <Route path="/volunteerrequest" element={<VolunteerRequest/>} />
        <Route path="/membershiprequest" element={<MembershipRequest/>} />
        <Route path="/Services" element={<ServicesPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Activities" element={<Activities />} />
      </Routes>
      {/* {!hideNavbarPages.includes(location.pathname) && <Footer />} */}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
