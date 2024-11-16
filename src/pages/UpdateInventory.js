// src/pages/UpdateInventory.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ExcelTableStyles.css"; // Import CSS for the Excel-style table

const UpdateInventory = () => {
  const [inventory, setInventory] = useState([]); // Start with mock data
  const [medication, setMedication] = useState("");
  const [amount, setAmount] = useState(0);
  const [expirationDate, setExpirationDate] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const account = location.state?.account;
  // const [action, setAction] = useState("add"); // "add" or "remove"

  useEffect(() => {
    axios
      .get("http://localhost:8080/inventory") // Replace with actual endpoint
      .then((response) => {
        setInventory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory", error);
      });
  }, []);

  const handleUpdateInventory = async () => {
    let targetMedication;

    // Ensure the expiration date is valid
    if (!expirationDate) {
        setErrorMessage("Expiration date is required." + account.role);
        setSuccessMessage("");
        return;
    }

    // Find the medication from the inventory
    inventory.map((item) => {
        if (item.name.toLowerCase() === medication.toLowerCase()) {
            targetMedication = item;
        }
    });

    // Check if the medication was found
    if (!targetMedication) {
        setErrorMessage("Medication not found.");
        setSuccessMessage("");
        return;
    }

    // Calculate the new quantity
    let newQuantity = targetMedication.quantity + parseInt(amount);
    // Ensure the quantity doesn't go below zero
    newQuantity = newQuantity < 0 ? 0 : newQuantity;

    // Prepare the data for the API request
    const newInventory = [
        { expirationDate: expirationDate, quantity: parseInt(amount) }
    ];

    try {
        // Make the POST request to update the inventory
        await axios.post(`http://localhost:8080/inventory/addInventory/${targetMedication.id}`, newInventory);

        // On success, update the inventory and show success message
        axios
        .get("http://localhost:8080/inventory") // Replace with actual endpoint
        .then((response) => {
          setInventory(response.data);
        })
        .catch((error) => {
          console.error("Error fetching inventory", error);
        });

        setErrorMessage(""); // Clear error messages
        setSuccessMessage("Inventory updated successfully");

    } catch (error) {
        // Handle errors and show error message
        console.error("Error updating inventory", error);
        setErrorMessage("Error updating inventory");
        setSuccessMessage("");
    }
};

  

  const handleMedicationClick = (medication) => {
    navigate(`/medication-specifics/${medication.id}`, { state: { medication } });
  };

  return (
    <div className="excel-table-container">
      <h1>Update Inventory</h1>
      <table className="excel-table">
        <thead>
          <tr>
            <th>Medication Name</th>
            <th>Quantity</th>
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
                <td style={{ color: (medication?.totalQuantity || 0) < 50 ? "red" : "black" }}>
                  {medication?.totalQuantity || 0}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No medications available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="update-inventory-form">
        <h3>Update Inventory</h3>
        <label>
          Medication Name:
          <input
            type="text"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Expiration Date:
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </label>
        {/* <label>
          Action:
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="add">Add</option>
            <option value="remove">Remove</option>
          </select>
        </label> */}
        <button onClick={handleUpdateInventory}>Update Inventory</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default UpdateInventory;
