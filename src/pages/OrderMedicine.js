import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";import { Container, Title, Description } from "../styles/PageStyles";
import "../styles/ExcelTableStyles.css"; // Import CSS for the Excel-style table

const OrderMedication = () => {
  const [inventory, setInventory] = useState([]);
  const [orderDetails, setOrderDetails] = useState({ name: "", quantity: 0, expirationDate: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const account = location.state?.account;

  useEffect(() => {
    fetchInventory();
  }, []);

  // Fetch current inventory
  const fetchInventory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/inventory");
      setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setErrorMessage("Failed to fetch inventory.");
    }
  };

  const handlePlaceOrder = async () => {
    const { name, quantity, expirationDate } = orderDetails;

    setErrorMessage("");
    setSuccessMessage("");

    // Check if medication exists in inventory
    const targetMedication = inventory.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );

    if (!targetMedication) {
      setErrorMessage("Medication not found in inventory.");
      setSuccessMessage("");
      return;
    }

    try {
      // Prepare data for updating inventory
      const updatedInventory = [{ expirationDate, quantity: parseInt(quantity, 10) }];
      const newQuantity = targetMedication.quantity + parseInt(quantity, 10);

      // Update inventory
      const response = await axios.post(
        `http://localhost:8080/inventory/addInventory/${targetMedication.id}`,
        updatedInventory
      );

      // Log the order
      await logOrder(response.data.id, quantity, response.data.totalQuantity);

      // Refresh inventory
      await fetchInventory();

      setErrorMessage("");
      setSuccessMessage("Order placed successfully.");
    } catch (error) {
      console.error("Error placing order:", error);
      setErrorMessage("Failed to place order.");
      setSuccessMessage("");
    }
  };

  const logOrder = async (medicationId, quantityOrdered, totalQuantity) => {
    try {
      const now = new Date();
      const logData = {
        logType: "inventory",
        date: formatDate(now),
        time: formatTime(now),
        userId: account.id, // Replace with dynamic user ID if applicable
        medicationId: medicationId,
        quantityChanged: quantityOrdered,
        totalQuantity,
        state: "PURCHASED",
      };

      await axios.post("http://localhost:8080/reports/inventory", logData);
    } catch (error) {
      console.error("Error logging order:", error);
      throw error; // Re-throw for error handling
    }
  };

  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  return (
    <Container>
      <Title>Order Medicine</Title>
      <Description>
        This page is accessible only by the Manager to order medicines for the pharmacy.
      </Description>
      {/* Order Form */}
      <div className="update-inventory-form">
        <h3>Place Order</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePlaceOrder();
          }}
        >
          <label>
            Medication Name:
            <input
              type="text"
              name="name"
              value={orderDetails.name}
              onChange={handleInputChange}
              placeholder="Enter medicine name"
              required
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={orderDetails.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity"
              required
              min="1"
            />
          </label>
          <label>
            Expiration Date:
            <input
              type="date"
              name="expirationDate"
              value={orderDetails.expirationDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Place Order</button>
        </form>

        {/* Status Messages */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </Container>
  );
};

export default OrderMedication;
