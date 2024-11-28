import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const TransactionPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [nonPrescriptionItems, setNonPrescriptionItems] = useState([]);
  const [prescriptionItems, setPrescriptionItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");
  const [signature, setSignature] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const account = location.state?.account;

  useEffect(() => {
    fetchUpdatedInventory();
  }, []);

  const fetchUpdatedInventory = () => {
    axios
      .get("http://localhost:8080/inventory")
      .then((response) => {
        const inventoryData = response.data;

        axios
          .get("http://localhost:8080/prescriptions")
          .then((prescriptionResponse) => {
            const prescriptions = prescriptionResponse.data;

            const prescriptionItemNames = prescriptions.map(
              (item) => item.name
            );

            const nonPrescriptions = inventoryData.filter(
              (item) => !prescriptionItemNames.includes(item.name)
            );

            setNonPrescriptionItems(nonPrescriptions);
            setPrescriptionItems(prescriptions);
            setInventory(inventoryData);
          })
          .catch((prescriptionError) => {
            console.error("Error fetching prescriptions:", prescriptionError);
            setError("Failed to load prescriptions. Please try again.");
          });
      })
      .catch((inventoryError) => {
        console.error("Error fetching inventory:", inventoryError);
        setError("Failed to load inventory. Please try again.");
      });
  };

  const addNonPrescriptionToCart = (item) => {
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
        { ...item, quantity, price: parseFloat(item.price) || 0 },
      ];
    });
  };

  const addPrescriptionToCart = (prescription) => {
    if (!prescription?.medications || prescription.medications.length === 0) {
      alert(`No medications found for prescription ${prescription.name}.`);
      return;
    }

    const quantity = parseInt(
      prompt(`Enter the quantity for prescription ${prescription.name}:`, "1"),
      10
    );

    if (isNaN(quantity) || quantity <= 0) {
      alert("Invalid quantity. Please try again.");
      return;
    }

    prescription.medications.forEach((med) => {
      if (quantity > (med.quantity || 0)) {
        alert(
          `Insufficient stock for ${med.medication.name}. Only ${
            med.quantity || 0
          } available.`
        );
        return;
      }

      setCartItems((prevCart) => [
        ...prevCart,
        {
          id: med.medication.id,
          name: med.medication.name,
          quantity,
          price: med.medication.price || 0,
        },
      ]);

      axios
        .put(
          `http://localhost:8080/prescriptionMedications/${med.id}/update`,
          { quantity: med.quantity - quantity }
        )
        .catch((error) =>
          console.error("Error updating prescription quantity:", error)
        );
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items before proceeding to checkout.");
      return;
    }

    if (hasPrescriptionInCart() && signature.trim() === "") {
      alert("Please sign to confirm the prescription purchase.");
      return;
    }

    if (paymentMethod.trim() === "") {
      alert("Please select a payment method.");
      return;
    }

    const updateRequests = cartItems.map((item) =>
      axios
        .post("http://localhost:8080/inventory/updateQuantity", {
          medicationId: item.id,
          quantitySold: item.quantity,
        })
        .then(() => {
          logOrder(item.id, item.quantity);
          console.log(`Updated inventory for item ID ${item.id}`);
        })
        .catch((error) => {
          console.error(`Error updating inventory for item ID ${item.id}:`, error);
          throw new Error(`Failed to update inventory for ${item.name}.`);
        })
    );

    logTransaction(paymentMethod);

    Promise.all(updateRequests)
      .then(() => {
        alert("Checkout successful! Items removed from inventory.");
        navigate("/order-confirmation", {
          state: { cartItems, paymentMethod, signature },
        });
        setCartItems([]);
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
        alert(error.message || "Checkout failed. Please try again.");
      });
  };

  const logTransaction = async (paymentMethod, payment) => {
    try {
      const now = new Date();
      const logData = {
        logType: "transaction",
        date: formatDate(now),
        time: formatTime(now),
        userId: account.id, // Replace with dynamic user ID if applicable
        paymentMethod: paymentMethod,
        payment: paymentMethod,
        purchasedItems: {"ALL": cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)},
      };

      await axios.post("http://localhost:8080/reports/transaction", logData);
    } catch (error) {
      console.error("Error logging transaction:", error);
      throw error; // Re-throw for error handling
    }
  };

  const logOrder = async (medicationId, quantityOrdered) => {
    const response = await axios.get(`http://localhost:8080/inventory/${medicationId}`);
    
    try {
      const now = new Date();
      const logData = {
        logType: "inventory",
        date: formatDate(now),
        time: formatTime(now),
        userId: account.id, // Replace with dynamic user ID if applicable
        medicationId: medicationId,
        quantityChanged: quantityOrdered,
        totalQuantity: response.data.totalQuantity,
        state: "SOLD"
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

  const hasPrescriptionInCart = () => {
      if (!prescriptionItems || prescriptionItems.length === 0) {
        return false; // No prescription items available
      }
      return cartItems.some((cartItem) =>
        prescriptionItems.some((prescription) =>
          (prescription.medications || []).some(
            (med) => med.medication && med.medication.id === cartItem.id
          )
        )
      );
    };

  return (
    <div>
      <h1>Transaction Page</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Available Non-Prescription Items</h2>
      <ul>
        {nonPrescriptionItems.length > 0 ? (
          nonPrescriptionItems.map((item) => (
            <li key={item.id}>
              {item.name} - $
              {parseFloat(item.price || 0).toFixed(2)} (Stock:{" "}
              {item.totalQuantity || 0})
              <button onClick={() => addNonPrescriptionToCart(item)}>
                Add to Cart
              </button>
            </li>
          ))
        ) : (
          <p>No non-prescription items available.</p>
        )}
      </ul>

      <h2>Available Prescription Items</h2>
      <ul>
        {prescriptionItems.length > 0 ? (
          prescriptionItems.map((prescription) => (
            <li key={prescription.id}>
              Prescription: {prescription.name} - Medications:{" "}
              {prescription.medications
                ?.map((med) => med.medication.name)
                .join(", ")}
              <button onClick={() => addPrescriptionToCart(prescription)}>
                Add to Cart
              </button>
            </li>
          ))
        ) : (
          <p>No prescription items available.</p>
        )}
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

      {hasPrescriptionInCart() && (
        <div>
          <h3>Signature</h3>
          <textarea
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="Sign here..."
          />
        </div>
      )}

      <h3>Payment Method</h3>
      <label>
        <input
          type="radio"
          value="CREDIT"
          checked={paymentMethod === "CREDIT"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Credit
      </label>
      <label>
        <input
          type="radio"
          value="DEBIT"
          checked={paymentMethod === "DEBIT"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Debit
      </label>
      <label>
        <input
          type="radio"
          value="CASH"
          checked={paymentMethod === "CASH"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Cash
      </label>

      <button onClick={handleCheckout} disabled={cartItems.length === 0}>
        Checkout
      </button>
    </div>
  );
};

export default TransactionPage;
