import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/ExcelTableStyles.css"; // Optional: For table styling

const MedicationSpecifics = () => {
  const location = useLocation();
  const { medication } = location.state || {}; // Get medication data passed from UpdateInventory
  
  const [errorMessage, setErrorMessage] = useState("");

  // Use useMemo to compute expirationData with error handling
  const expirationData = useMemo(() => {
    if (!medication) {
      setErrorMessage("Medication not found.");
      return [];
    }

    if (!medication.medicationInventory) {
      return [];
    }

    return medication.medicationInventory;
  }, [medication]);

  return (
    <div className="excel-table-container">
      <h1>Medication Details: {medication?.name}</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table className="excel-table">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {expirationData.length > 0 ? (
            expirationData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.quantity}</td>
                <td>{entry.expirationDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                No stock available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationSpecifics;
