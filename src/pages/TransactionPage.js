import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TransactionPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch inventory
    axios
      .get("http://localhost:8080/inventory")
      .then((response) => {
        console.log("Inventory data:", response.data); // Debug log
        setInventory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
        setError("Failed to load inventory. Please try again.");
      });
  }, []);

  const addItemToCart = (item) => {
    const quantity = parseInt(
      prompt(`Enter the quantity for ${item.name}:`, "1"),
      10
    );

    if (isNaN(quantity) || quantity <= 0) {
      alert("Invalid quantity. Please try again.");
      return;
    }

    if (quantity > (item.totalQuantity || 0)) {
      alert(
        `Insufficient stock for ${item.name}. Only ${
          item.totalQuantity || 0
        } available.`
      );
      return;
    }

    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [
        ...prevCart,
        { ...item, quantity, price: parseFloat(item.price) || 0 }, // Ensure price is a valid number
      ];
    });

    // Update inventory quantity
    setInventory((prevInventory) =>
      prevInventory.map((inventoryItem) =>
        inventoryItem.id === item.id
          ? {
              ...inventoryItem,
              totalQuantity: inventoryItem.totalQuantity - quantity,
            }
          : inventoryItem
      )
    );
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
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Available Inventory</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            {item.name} - $
            {typeof item.price === "number"
              ? item.price.toFixed(2)
              : parseFloat(item.price || 0).toFixed(2)}{" "}
            (Stock: {item.totalQuantity || 0})
            <button onClick={() => addItemToCart(item)}>Add to Cart</button>
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
              {item.name} - $
              {item.price.toFixed(2)} x {item.quantity} = $
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