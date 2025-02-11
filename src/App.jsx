import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import AttendanceManagement from "./pages/AttendanceManagement";
import OvertimeTracking from "./pages/OvertimeTracking";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div
  style={{
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    background: "#f4f4f4",
    display: "flex",
    flexDirection: "column",
    width: "100vw", // Ensure full width
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    overflowX: "hidden", // Prevents horizontal scrolling issues
  }}
>

        {/* Navbar Component */}
        <Navbar />

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Centers content vertically
            width: "100%", // Ensures full width
            minHeight: "calc(100vh - 60px)", // Adjusts height dynamically (assuming navbar is ~60px)
            background: "#ffffff", // Set white background for content area
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Adds subtle shadow for better separation
            borderRadius: "8px", // Soft rounded corners
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employeemanagement" element={<EmployeeManagement />} />
            <Route path="/attendancemanagement" element={<AttendanceManagement />} />
            <Route path="/overtimetracking" element={<OvertimeTracking />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
