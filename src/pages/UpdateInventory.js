// src/pages/UpdateInventory.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ExcelTableStyles.css"; // Import CSS for the Excel-style table

const UpdateInventory = () => {
  const navigate = useNavigate();

  // Temporary mock data for inventory
  const mockInventory = [
    { id: 1, name: "Amoxicillin", quantity: 50 },
    { id: 2, name: "Ibuprofen", quantity: 100 },
    { id: 3, name: "Lisinopril", quantity: 30 },
  ];

  const [inventory, setInventory] = useState(mockInventory); // Start with mock data
  const [medication, setMedication] = useState("");
  const [amount, setAmount] = useState(0);
  const [action, setAction] = useState("add"); // "add" or "remove"

  useEffect(() => {
    // Uncomment this block to fetch data from the backend when available
    /*
    axios
      .get("http://localhost:8080/api/inventory") // Replace with actual endpoint
      .then((response) => {
        setInventory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory", error);
      });
    */
  }, []);

  const handleUpdateInventory = () => {
    const updatedInventory = inventory.map((item) => {
      if (item.name.toLowerCase() === medication.toLowerCase()) {
        let newQuantity =
          action === "add"
            ? item.quantity + parseInt(amount)
            : item.quantity - parseInt(amount);

        // Ensure the quantity doesn't go below zero
        newQuantity = newQuantity < 0 ? 0 : newQuantity;

        // Uncomment this block to update data in the backend
        /*
        axios
          .put(`http://localhost:8080/api/inventory/${item.id}`, {
            ...item,
            quantity: newQuantity,
          })
          .then(() => {
            console.log("Inventory updated successfully");
          })
          .catch((error) => {
            console.error("Error updating inventory", error);
          });
        */

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setInventory(updatedInventory);
    setMedication("");
    setAmount(0);
  };

  const handleMedicationClick = (medicationId) => {
    navigate(`/medication-specifics/${medicationId}`, { state: { inventory } });
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
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>
                <button
                  onClick={() => handleMedicationClick(item.id)}
                  className="medication-link"
                >
                  {item.name}
                </button>
              </td>
              <td style={{ color: item.quantity < 50 ? "red" : "black" }}>
                {item.quantity}
              </td>
            </tr>
          ))}
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
          Action:
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="add">Add</option>
            <option value="remove">Remove</option>
          </select>
        </label>
        <button onClick={handleUpdateInventory}>Update Inventory</button>
      </div>
    </div>
  );
};

export default UpdateInventory;
