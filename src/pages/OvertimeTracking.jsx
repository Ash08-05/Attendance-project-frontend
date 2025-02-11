import React, { useState, useEffect } from "react";
import "../components/OvertimeManagement.css" // Import CSS

const OvertimeManagement = () => {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

  const [employees, setEmployees] = useState([]);
  const [overtime, setOvertime] = useState([]);
  const [newOvertime, setNewOvertime] = useState({ employee_id: "", date: "", hours: "" });
  const [editOvertime, setEditOvertime] = useState(null);
  const [summary, setSummary] = useState({ weekly: 0, monthly: 0 });

  useEffect(() => {
    fetch(`${API_BASE_URL}/employees`)
      .then(res => res.json())
      .then(data => Array.isArray(data) && setEmployees(data))
      .catch(err => console.error("Error fetching employees:", err));

    fetch(`${API_BASE_URL}/overtime`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOvertime(data);
          calculateSummary(data);
        }
      })
      .catch(err => console.error("Error fetching overtime:", err));
  }, []);

  const calculateSummary = (data) => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    const weeklyTotal = data
      .filter(entry => new Date(entry.date) >= weekStart)
      .reduce((sum, entry) => sum + parseFloat(entry.hours), 0);

    const monthlyTotal = data
      .filter(entry => new Date(entry.date) >= monthStart)
      .reduce((sum, entry) => sum + parseFloat(entry.hours), 0);

    setSummary({ weekly: weeklyTotal, monthly: monthlyTotal });
  };

  const handleAddOrUpdateOvertime = () => {
    if (!newOvertime.employee_id || !newOvertime.date || !newOvertime.hours) {
      alert("Please fill all fields.");
      return;
    }

    const url = editOvertime
      ? `${API_BASE_URL}/overtime/${editOvertime.id}`
      : `${API_BASE_URL}/overtime`;

    const method = editOvertime ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOvertime),
    })
      .then(res => res.json())
      .then((data) => {
        alert(data.message);
        if (editOvertime) {
          setOvertime(overtime.map(entry => (entry.id === editOvertime.id ? { ...entry, ...newOvertime } : entry)));
          setEditOvertime(null);
        } else {
          setOvertime([...overtime, { ...newOvertime, id: data.id }]);
        }
        setNewOvertime({ employee_id: "", date: "", hours: "" });
        calculateSummary(overtime);
      })
      .catch(err => console.error("Error adding/updating overtime:", err));
  };

  const handleDeleteOvertime = (id) => {
    fetch(`${API_BASE_URL}/overtime/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => {
        const updatedOvertime = overtime.filter((entry) => entry.id !== id);
        setOvertime(updatedOvertime);
        calculateSummary(updatedOvertime);
      })
      .catch(err => console.error("Error deleting overtime:", err));
  };

  const handleEditOvertime = (record) => {
    setNewOvertime({ employee_id: record.employee_id, date: record.date, hours: record.hours });
    setEditOvertime(record);
  };

  return (
    <div className="overtime-container">
      <h2>Overtime Management</h2>

      {/* Overtime Input Section */}
      <div className="overtime-form">
        <label>Employee</label>
        <select value={newOvertime.employee_id} onChange={(e) => setNewOvertime({ ...newOvertime, employee_id: e.target.value })}>
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>

        <label>Date</label>
        <input type="date" value={newOvertime.date} onChange={(e) => setNewOvertime({ ...newOvertime, date: e.target.value })} />

        <label>Overtime Hours</label>
        <input type="number" min="0" step="0.5" value={newOvertime.hours} onChange={(e) => setNewOvertime({ ...newOvertime, hours: e.target.value })} />

        <button onClick={handleAddOrUpdateOvertime} className="submit-btn">
          {editOvertime ? "Update Overtime" : "Add Overtime"}
        </button>
      </div>

      {/* Summary Section */}
      <div className="overtime-summary">
        <p>🟢 Weekly Overtime: {summary.weekly} hours</p>
        <p>🔵 Monthly Overtime: {summary.monthly} hours</p>
      </div>

      {/* Overtime Records Table */}
      <h3>Overtime Records</h3>
      <table className="overtime-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {overtime.map((record) => (
    <tr key={record.id}>
      <td>{record.employee_name}</td>
      <td>{new Date(record.date).toLocaleString()}</td> {/* Display Date & Time */}
      <td>{record.hours}</td>
      <td>
        <button onClick={() => handleEditOvertime(record)} className="edit-btn">Edit</button>
        <button onClick={() => handleDeleteOvertime(record.id)} className="delete-btn">Delete</button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default OvertimeManagement;
