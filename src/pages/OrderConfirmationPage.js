import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.cartItems || [];
  const account = location.state?.account;
  const timestamp = new Date().toLocaleString();

  const pharmacyInfo = {
    name: "5Guys Pharmacy",
    address: "123 5Guys BLVD, GyatTown, AZ, USA",
    phone: "(520) 456-7890",
    email: "5Guys@5GuysPharmacy.net",
  };

  const calculateSubtotal = () =>
    order.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const calculateTaxes = (subtotal) => {
    const stateTax = 0.056;
    const countyTax = 0.005;
    return {
      stateTax: (subtotal * stateTax).toFixed(2),
      countyTax: (subtotal * countyTax).toFixed(2),
    };
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const { stateTax, countyTax } = calculateTaxes(subtotal);
    return (subtotal + parseFloat(stateTax) + parseFloat(countyTax)).toFixed(2);
  };

  const printReceipt = () => {
    window.print();
  };

  const handleReturnToHome = () => {
    navigate("/beforepharm", { state: { account } });
  };

  useEffect(() => {
    if (order.length === 0) {
      navigate("/transaction");
    }
  }, [order, navigate]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Order Confirmation</h1>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h3>Pharmacy Information</h3>
        <p>
          <strong>{pharmacyInfo.name}</strong>
          <br />
          {pharmacyInfo.address}
          <br />
          Phone: {pharmacyInfo.phone}
          <br />
          Email: {pharmacyInfo.email}
        </p>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Order Date:</strong> {timestamp}
        </p>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h3>Items Ordered</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Item</th>
              <th style={{ textAlign: "right", padding: "8px" }}>Quantity</th>
              <th style={{ textAlign: "right", padding: "8px" }}>Price</th>
              <th style={{ textAlign: "right", padding: "8px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: "8px" }}>{item.name}</td>
                <td style={{ textAlign: "right", padding: "8px" }}>
                  {item.quantity}
                </td>
                <td style={{ textAlign: "right", padding: "8px" }}>
                  ${item.price.toFixed(2)}
                </td>
                <td style={{ textAlign: "right", padding: "8px" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <p>
          <strong>Subtotal:</strong> ${calculateSubtotal()}
        </p>
        <p>
          <strong>State Tax (5.6%):</strong> $
          {calculateTaxes(parseFloat(calculateSubtotal())).stateTax}
        </p>
        <p>
          <strong>County Tax (0.5%):</strong> $
          {calculateTaxes(parseFloat(calculateSubtotal())).countyTax}
        </p>
        <h3>
          <strong>Total:</strong> ${calculateTotal()}
        </h3>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={printReceipt}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Print Receipt
        </button>
        <button
          onClick={handleReturnToHome}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
