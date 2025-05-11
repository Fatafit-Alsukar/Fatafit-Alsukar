import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ServicesPage from "./Pages/OurServices/OurServices";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
function Layout() {
  const location = useLocation();
  const hideNavbarPages = ["/register"];
  return (
    <>
      {/* {!hideNavbarPages.includes(location.pathname) && <Navbar />} */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Services" element={<ServicesPage />} />
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
