import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import PatientRequest from "./Pages/PatientRequest/PatientRequest";
import Login from "./Pages/Login/Login";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import VolunteerRequest from "./Pages/VolunteerRequest/VolunteerRequest";
import MembershipRequest from "./Pages/MembershipRequest/MembershipRequest";
function Layout() {
  return (
    <>
    <Routes> 
    <Route path="/patientrequest" element={<PatientRequest/>} />
    <Route path="/login" element={<Login/>}/>
    <Route path="/changepassword" element={<ChangePassword/>} />
    <Route path="/volunteerrequest" element={<VolunteerRequest/>} />
    <Route path="/membershiprequest" element={<MembershipRequest/>} />
    </Routes>
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
