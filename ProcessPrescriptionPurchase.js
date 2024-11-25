// src/pages/ProcessPrescriptionPurchase.js

import React, { useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas"; // Added import for electronic signature
import "../styles/ProcessPrescriptionPurchase.css"; // Import your CSS styles

const ProcessPrescriptionPurchase = () => {
  const [prescriptionId, setPrescriptionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [signingMethod, setSigningMethod] = useState("MANUAL"); // New state for signing method
  const [customerConfirmed, setCustomerConfirmed] = useState(false);
  const [signatureData, setSignatureData] = useState(null); // To store the signature image data
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const account = location.state?.account; // Get the logged-in staff member's account
  const sigCanvasRef = useRef({}); // Reference to the signature canvas

  const handleProcessPurchase = async () => {
    setError("");
    setMessage("");

    // Validation for manual signing
    if (signingMethod === "MANUAL" && !customerConfirmed) {
      setError("Please confirm customer signature before proceeding.");
      return;
    }

    // Validation for electronic signing
    if (signingMethod === "ELECTRONIC" && !signatureData) {
      setError("Please capture the customer's electronic signature.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/prescriptions/process-purchase",
        {
          prescriptionId,
          staffMemberId: account?.id || "unknown",
          paymentMethod,
          customerConfirmed: signingMethod === "MANUAL" ? customerConfirmed : true,
          electronicSignature: signatureData, // Include signature data if electronic signing
        }
      );
      setMessage(response.data);
      setError("");

      // Clear the form
      setPrescriptionId("");
      setPaymentMethod("CASH");
      setSigningMethod("MANUAL");
      setCustomerConfirmed(false);
      setSignatureData(null);
      if (sigCanvasRef.current) {
        sigCanvasRef.current.clear();
      }
    } catch (error) {
      setError(error.response?.data || "Error processing purchase");
      setMessage("");
    }
  };

  // Handle capturing the signature data
  const handleSignature = () => {
    if (sigCanvasRef.current) {
      const signature = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
      setSignatureData(signature);
    }
  };

  // Clear the signature pad
  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
      setSignatureData(null);
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

      {/* New signing method selection */}
      <label>
        Signing Method:
        <select value={signingMethod} onChange={(e) => setSigningMethod(e.target.value)}>
          <option value="MANUAL">Manual</option>
          <option value="ELECTRONIC">Electronic</option>
        </select>
      </label>

      {/* Conditional rendering based on signing method */}
      {signingMethod === "MANUAL" && (
        <label>
          Customer has signed:
          <input
            type="checkbox"
            checked={customerConfirmed}
            onChange={(e) => setCustomerConfirmed(e.target.checked)}
          />
        </label>
      )}

      {signingMethod === "ELECTRONIC" && (
        <div>
          <p>Please have the customer sign below:</p>
          {/* Signature pad component */}
          <SignatureCanvas
            penColor="black"
            canvasProps={{ className: "signature-canvas" }}
            ref={sigCanvasRef}
            onEnd={handleSignature}
          />
          <button onClick={clearSignature}>Clear Signature</button>
        </div>
      )}

      <button onClick={handleProcessPurchase}>Process Purchase</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProcessPrescriptionPurchase;
