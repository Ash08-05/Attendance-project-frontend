import React, { useState, useEffect } from "react";

const EmployeeManagement = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: "", employee_id: "", department: "", designation: "" });

  // Fetch All Employees
  useEffect(() => {
    fetch(`${API_BASE_URL}/employees`)
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  // Add Employee
  const handleAddEmployee = () => {
    fetch(`${API_BASE_URL}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setEmployees([...employees, { ...formData, id: data.id }]);
        setFormData({ name: "", employee_id: "", department: "", designation: "" });
      })
      .catch((err) => console.error("Error adding employee:", err));
  };

  // Delete Employee
  const handleDeleteEmployee = (id) => {
    console.log("Deleting Employee ID:", id);
    fetch(`${API_BASE_URL}/employees/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error || "Failed to delete");
          });
        }
        return res.json();
      })
      .then((data) => {
        alert(data.message);
        setEmployees(employees.filter((emp) => emp.id !== id));
      })
      .catch((err) => console.error("Error deleting employee:", err.message));
  };
  
  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        width: "80%",
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Employee Management</h2>

      {/* Add Employee Form */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Add Employee</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              flex: "1",
              backgroundColor: "white",
            }}
          />
          <input
            type="text"
            name="employee_id"
            placeholder="Employee ID"
            value={formData.employee_id}
            onChange={handleInputChange}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              flex: "1",
              backgroundColor: "white",
            }}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleInputChange}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              flex: "1",
              backgroundColor: "white",
            }}
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleInputChange}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              flex: "1",
              backgroundColor: "white",
            }}
          />
          <button
            onClick={handleAddEmployee}
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div>
        <h3>Employee List</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "2px solid #ccc", padding: "8px",color:"black" }}>#</th>
              <th style={{ borderBottom: "2px solid #ccc", padding: "8px",color:"black" }}>Name</th>
              <th style={{ borderBottom: "2px solid #ccc", padding: "8px",color:"black" }}>Employee ID</th>
              <th style={{ borderBottom: "2px solid #ccc", padding: "8px",color:"black" }}>Department</th>
              <th style={{ borderBottom: "2px solid #ccc", padding: "8px",color:"black" }}>Designation</th>
              <th style={{ borderBottom: "2px solid #ccc", padding: "8px",color:"black" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee",color:"black" }}>{index + 1}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee",color:"black" }}>{employee.name}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee",color:"black" }}>{employee.employee_id}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee",color:"black" }}>{employee.department}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee",color:"black" }}>{employee.designation}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee",color:"black" }}>
                  <button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    style={{
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;
