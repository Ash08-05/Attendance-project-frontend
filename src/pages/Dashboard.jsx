import React, { useState, useEffect } from "react";

const Dashboard = () => {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  // Fetch employees from backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/employees`)
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  // Get today's date and day
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Dashboard</h2>
      <p style={styles.date}>{formattedDate}</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>#</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Employee ID</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Designation</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee, index) => (
            <tr key={employee.id} style={styles.tr}>
              <td style={styles.td}>{indexOfFirstEmployee + index + 1}</td>
              <td style={styles.td}>{employee.name}</td>
              <td style={styles.td}>{employee.employee_id}</td>
              <td style={styles.td}>{employee.department}</td>
              <td style={styles.td}>{employee.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={styles.pagination}>
        {Array.from({ length: Math.ceil(employees.length / employeesPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            style={{
              ...styles.pageButton,
              backgroundColor: currentPage === i + 1 ? "#555" : "#ddd",
              color: currentPage === i + 1 ? "#fff" : "#333",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  date: {
    textAlign: "center",
    fontSize: "16px",
    color: "#666",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  th: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
    color:"black",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
     color:"black",
  },
  tr: {
    transition: "background 0.2s",
  },
  pagination: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  pageButton: {
    margin: "5px",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background 0.2s",
  },
};

// Export Dashboard Component
export default Dashboard;
