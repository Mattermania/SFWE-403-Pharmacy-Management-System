// src/pages/TrackPrescriptions.js
import React, { useState } from "react";
import "../styles/ExcelTableStyles.css";

const TrackPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      customerName: "John Doe",
      prescription: "Amoxicillin",
      status: "Processing",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      prescription: "Ibuprofen",
      status: "Ready",
    },
  ]);

  const [newPrescription, setNewPrescription] = useState({
    customerName: "",
    prescription: "",
    status: "Not Processed",
  });

  const handleAddPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      { ...newPrescription, id: prescriptions.length + 1 },
    ]);
    setNewPrescription({
      customerName: "",
      prescription: "",
      status: "Not Processed",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription({ ...newPrescription, [name]: value });
  };

  return (
    <div className="excel-table-container">
      <h1>Track Prescriptions</h1>
      <table className="excel-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Prescription</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>{prescription.customerName}</td>
                <td>{prescription.prescription}</td>
                <td>{prescription.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No prescriptions available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Prescription Form */}
      <div className="add-prescription-form">
        <h3>Add New Prescription</h3>
        <label>
          Customer Name:
          <input
            type="text"
            name="customerName"
            value={newPrescription.customerName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Prescription:
          <input
            type="text"
            name="prescription"
            value={newPrescription.prescription}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={newPrescription.status}
            onChange={handleInputChange}
          >
            <option value="Not Processed">Not Processed</option>
            <option value="Processing">Processing</option>
            <option value="Ready">Ready</option>
          </select>
        </label>
        <button onClick={handleAddPrescription}>Add Prescription</button>
      </div>
    </div>
  );
};

export default TrackPrescriptions;
