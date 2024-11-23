// src/pages/ProcessNonPrescriptionSale.js
import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../styles/ExcelTableStyles.css";

const ProcessNonPrescriptionSale = () => {
  const [medicationId, setMedicationId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const account = location.state?.account; // Get the logged-in staff member's account

  const handleProcessSale = async () => {
    try {
      const response = await axios.post("http://localhost:8080/inventory/process-non-prescription-sale", {
        medicationId,
        quantity,
        staffMemberId: account?.id || "unknown",
        paymentMethod,
      });
      setMessage(response.data);
      setError("");
    } catch (error) {
      setError(error.response?.data || "Error processing sale");
      setMessage("");
    }
  };

  return (
    <div className="form-container">
      <h2>Process Non-Prescription Sale</h2>
      <label>
        Medication ID:
        <input
          type="text"
          value={medicationId}
          onChange={(e) => setMedicationId(e.target.value)}
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
      </label>
      <label>
        Payment Method:
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="CASH">Cash</option>
          <option value="DEBIT">Debit</option>
          <option value="CREDIT">Credit</option>
        </select>
      </label>
      <button onClick={handleProcessSale}>Process Sale</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProcessNonPrescriptionSale;
