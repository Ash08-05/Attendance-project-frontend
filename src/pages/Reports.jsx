import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportsPage = () => {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/report`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Report Data:", data); // Debugging
        setReports(data);
      })
      .catch((err) => console.error("❌ Error fetching reports:", err));
  }, []);
  
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Attendance & Overtime Report", 14, 10);

    const tableColumn = ["Employee Name", "Present", "Absent", "On Leave", "Total Overtime"];
    const tableRows = [];

    reports.forEach((row) => {
      tableRows.push([
        row.employee_name,  // Updated key (was 'name')
        row.total_present,
        row.total_absent,
        row.total_leave,
        row.total_overtime,
      ]);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Attendance_Report.pdf");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Attendance & Overtime Report</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ background: "#007bff", color: "white" }}>
            <th style={thStyle}>Employee Name</th>
            <th style={thStyle}>Present</th>
            <th style={thStyle}>Absent</th>
            <th style={thStyle}>On Leave</th>
            <th style={thStyle}>Total Overtime</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index} style={index % 2 === 0 ? rowEven : rowOdd}>
              <td style={tdStyle}>{report.employee_name}</td>
              <td style={tdStyle}>{report.total_present}</td>
              <td style={tdStyle}>{report.total_absent}</td>
              <td style={tdStyle}>{report.total_leave}</td>
              <td style={tdStyle}>{report.total_overtime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={generatePDF}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#4C7B8B",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Download Report (PDF)
      </button>
    </div>
  );
};

// Styles
const thStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "left",
  background:"#3674B5",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  color:"black",
};

const rowEven = {
  backgroundColor: "#f2f2f2",
};

const rowOdd = {
  backgroundColor: "#ffffff",
};

export default ReportsPage;
