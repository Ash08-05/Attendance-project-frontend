import React, { useState, useEffect } from "react";

const AttendanceManagement = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [newAttendance, setNewAttendance] = useState({ employee_id: "", date: "", status: "Present" });
  const [editingRecord, setEditingRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/employees`)
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error("Error fetching employees:", err));

    fetch(`${API_BASE_URL}/attendance`)
      .then(res => res.json())
      .then(data => setAttendance(data))
      .catch(err => console.error("Error fetching attendance:", err));
  }, []);

  const handleMarkAttendance = () => {
    fetch(`${API_BASE_URL}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAttendance)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setAttendance([...attendance, { ...newAttendance, id: data.id }]);
      })
      .catch(err => console.error("Error marking attendance:", err));
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setShowModal(true);
  };

  const handleUpdateAttendance = () => {
    fetch(`${API_BASE_URL}/attendance/${editingRecord.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingRecord),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setAttendance(attendance.map(att => (att.id === editingRecord.id ? editingRecord : att)));
        setShowModal(false);
      })
      .catch(err => console.error("Error updating attendance:", err));
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/attendance/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setAttendance(attendance.filter(att => att.id !== id));
      })
      .catch(err => console.error("Error deleting attendance:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance Management</h2>

      {/* Attendance Form */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <select onChange={e => setNewAttendance({ ...newAttendance, employee_id: e.target.value })}>
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>

        <input type="date" onChange={e => setNewAttendance({ ...newAttendance, date: e.target.value })} />

        <select onChange={e => setNewAttendance({ ...newAttendance, status: e.target.value })}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="On Leave">On Leave</option>
        </select>

        <button onClick={handleMarkAttendance} style={{ padding: "5px 10px", cursor: "pointer" }}>
          Mark Attendance
        </button>
      </div>

      {/* Attendance Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
            <th style={{ padding: "8px", border: "1px solid #ddd",background:"blue" }}>Employee Name</th>
            <th style={{ padding: "8px", border: "1px solid #ddd",background:"blue" }}>Date</th>
            <th style={{ padding: "8px", border: "1px solid #ddd",background:"blue" }}>Status</th>
            <th style={{ padding: "8px", border: "1px solid #ddd",background:"blue" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record, index) => (
            <tr key={record.id ||index }>
              <td style={{ padding: "8px", border: "1px solid #ddd",color:"black" }}>{record.employee_name}</td>
              <td style={{ padding: "8px", border: "1px solid #ddd",color:"black" }}>{record.date}</td>
              <td style={{ padding: "8px", border: "1px solid #ddd",color:"black" }}>{record.status}</td>
              <td style={{ padding: "8px", border: "1px solid #ddd",color:"black" }}>
                <button 
                  onClick={() => handleEdit(record)}
                  style={{ marginRight: "5px", padding: "5px", cursor: "pointer", background: "#ffc107", border: "none" }}>
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(record.id)}
                  style={{ padding: "5px", cursor: "pointer", background: "#dc3545", color: "white", border: "none" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showModal && (
        <div style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          background: "white", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
        }}>
          <h3>Edit Attendance</h3>
          <select value={editingRecord.employee_id} onChange={e => setEditingRecord({ ...editingRecord, employee_id: e.target.value })}>
            {employees.map(emp => (
              <option key={emp.employee_id} value={emp.employee_id}>{emp.name}</option>
            ))}
          </select>

          <input type="date" value={editingRecord.date} onChange={e => setEditingRecord({ ...editingRecord, date: e.target.value })} />

          <select value={editingRecord.status} onChange={e => setEditingRecord({ ...editingRecord, status: e.target.value })}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="On Leave">On Leave</option>
          </select>

          <div style={{ marginTop: "10px" }}>
            <button 
              onClick={handleUpdateAttendance} 
              style={{ marginRight: "5px", padding: "5px", cursor: "pointer", background: "#28a745", color: "white", border: "none" }}>
              Update
            </button>
            <button 
              onClick={() => setShowModal(false)} 
              style={{ padding: "5px", cursor: "pointer", background: "#6c757d", color: "white", border: "none" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;
