import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TransactionPage = () => {
  const [paidPrescriptions, setPaidPrescriptions] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch PAID prescriptions on load
  useEffect(() => {
    axios
      .get("http://localhost:8080/prescriptions/paid")
      .then((response) => {
        setPaidPrescriptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching paid prescriptions:", error);
        alert("Failed to load paid prescriptions. Please try again.");
      });
  }, []);

  const addPrescriptionToCart = (prescription) => {
    const newCartItems = prescription.medications.map((medicationEntry) => ({
      name: medicationEntry.medication.name,
      quantity: medicationEntry.quantity,
      price: parseFloat(medicationEntry.medication.price) || 0,
      id: medicationEntry.medication.id,
    }));
    setCartItems((prevCart) => [...prevCart, ...newCartItems]);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items before proceeding to checkout.");
      return;
    }

    navigate("/order-confirmation", { state: { cartItems } });
  };

  return (
    <div>
      <h1>Transaction Page</h1>

      <h2>Paid Prescriptions</h2>
      <ul>
        {paidPrescriptions.map((prescription) => (
          <li key={prescription.id}>
            {prescription.name} - {prescription.patient.name}
            <button
              onClick={() => addPrescriptionToCart(prescription)}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity} = $
              {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleCheckout} disabled={cartItems.length === 0}>
        Checkout
      </button>
    </div>
  );
};

export default TransactionPage;