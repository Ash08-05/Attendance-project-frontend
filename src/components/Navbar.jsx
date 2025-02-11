import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        background: "#333",
        padding: "10px 20px",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h1 style={{ fontSize: "20px", margin: 0 }}>Attendance Portal</h1>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          gap: "20px",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/employeemanagement"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            Employee Management
          </Link>
        </li>
        <li>
          <Link
            to="/attendancemanagement"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            Attendance Management
          </Link>
        </li>
        <li>
          <Link
            to="/overtimetracking"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            Overtime Tracking
          </Link>
        </li>
        <li>
          <Link
            to="/reports"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            Reports
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
