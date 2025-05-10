import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
