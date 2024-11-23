// src/pages/ProcessPrescriptionPurchase.js
import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../styles/ExcelTableStyles.css"; // Import your CSS styles

const ProcessPrescriptionPurchase = () => {
  const [prescriptionId, setPrescriptionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [customerConfirmed, setCustomerConfirmed] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const account = location.state?.account; // Get the logged-in staff member's account

  const handleProcessPurchase = async () => {
    if (!customerConfirmed) {
      setError("Please confirm customer signature before proceeding.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/prescriptions/process-purchase", {
        prescriptionId,
        staffMemberId: account?.id || "unknown",
        paymentMethod,
        customerConfirmed,
      });
      setMessage(response.data);
      setError("");
    } catch (error) {
      setError(error.response?.data || "Error processing purchase");
      setMessage("");
    }
  };

  return (
    <div className="form-container">
      <h2>Process Prescription Purchase</h2>
      <label>
        Prescription ID:
        <input
          type="text"
          value={prescriptionId}
          onChange={(e) => setPrescriptionId(e.target.value)}
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
      <label>
        Customer has signed:
        <input
          type="checkbox"
          checked={customerConfirmed}
          onChange={(e) => setCustomerConfirmed(e.target.checked)}
        />
      </label>
      <button onClick={handleProcessPurchase}>Process Purchase</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProcessPrescriptionPurchase;
