// src/pages/OrderMedicine.js
import React, { useState } from "react";
import { Container, Title, Description } from "../styles/PageStyles";
import "../styles/TextboxAlignment.css"; // Import CSS for alignment

const OrderMedicine = () => {
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs (basic validation example)
    if (!medicineName || !quantity || !supplier) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Example of using sample data instead of making an API call
    try {
      // Sample data logic to simulate placing an order
      const sampleResponse = {
        status: 200, // Simulated successful response status
        message: "Order placed successfully!", // Simulated response message
      };

      if (sampleResponse.status === 200) {
        setMessage(sampleResponse.message);
        // Clear form fields
        setMedicineName("");
        setQuantity("");
        setSupplier("");
      } else {
        setMessage("Failed to place the order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("An error occurred while placing the order.");
    }
  };

  return (
    <Container>
      <Title>Order Medicine</Title>
      <Description>
        This page is accessible only by the Manager to order medicines for the pharmacy.
      </Description>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label className="form-label">Medicine Name:</label>
          <input
            className="form-input"
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            placeholder="Enter medicine name"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Quantity:</label>
          <input
            className="form-input"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Supplier:</label>
          <input
            className="form-input"
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            placeholder="Enter supplier name"
            required
          />
        </div>
        <button type="submit" className="form-button">
          Place Order
        </button>
      </form>
      {message && <p>{message}</p>}
    </Container>
  );
};

export default OrderMedicine;