import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ExcelTableStyles.css"; // Import CSS for the Excel-style table

const ViewInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, []);

  // Fetch inventory data
  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory", error);
      setErrorMessage("Failed to fetch inventory.");
    }
  };

  const handleMedicationClick = (medication) => {
    navigate(`/medication-specifics/${medication.id}`, { state: { medication } });
  };

  return (
    <div className="excel-table-container">
      <h1>View Inventory</h1>

      {/* Inventory Table */}
      <table className="excel-table">
        <thead>
          <tr>
            <th>Medication Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length > 0 ? (
            inventory.map((medication) => (
              <tr key={medication.id}>
                <td>
                  <button
                    onClick={() => handleMedicationClick(medication)}
                    className="medication-link"
                  >
                    {medication.name}
                  </button>
                </td>
                <td
                  style={{
                    color: (medication?.totalQuantity || 0) < 50 ? "red" : "black",
                  }}
                >
                  {medication?.totalQuantity || 0}
                </td>
                <td>${medication?.price.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No medications available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Status Messages */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default ViewInventory;
