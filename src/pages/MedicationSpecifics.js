// src/pages/MedicationSpecifics.js
import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/ExcelTableStyles.css"; // Optional: For table styling

const MedicationSpecifics = () => {
  const location = useLocation();
  const { inventory } = location.state || {}; // Get inventory data passed from UpdateInventory

  const selectedMedication = inventory?.find(
    (item) => item.id === parseInt(location.pathname.split("/").pop())
  );

  // Temporary mock data for expiration tracking
  const expirationData = [
    { quantity: 50, expirationDate: "2024-11-10" },
    { quantity: 100, expirationDate: "2024-11-20" },
  ];

  return (
    <div className="excel-table-container">
      <h1>Medication Details: {selectedMedication?.name}</h1>
      <table className="excel-table">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {expirationData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.quantity}</td>
              <td>{entry.expirationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationSpecifics;
