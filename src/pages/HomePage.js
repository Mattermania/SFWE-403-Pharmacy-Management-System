import {
  Container,
  Title,
  Button,
  Section,
  Description,
  AlertBox,
} from "../styles/HomePageStyles";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SignOutButton from "../components/SignOutButton";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const account = location.state?.account;
  const [lowInventory, setLowInventory] = useState([]);
  const [expiringInventory, setExpiringInventory] = useState([]);

  // Redirect to login page if account is not available
  useEffect(() => {
    if (!account) {
      navigate("/");
    }
  }, [account, navigate]);

  // Fetch inventory data (both low inventory and expiring inventory)
  useEffect(() => {
    axios
      .get("http://localhost:8080/inventory") // Replace with your API endpoint
      .then((response) => {
        const lowStockItems = response.data.filter(
          (item) => item.totalQuantity <= 120
        );
        const expiringItems = response.data.filter((item) =>
          item.medicationInventory.some((stock) => {
            const expirationDate = new Date(stock.expirationDate);
            const today = new Date();
            const daysUntilExpiration =
              (expirationDate - today) / (1000 * 60 * 60 * 24);
            return daysUntilExpiration > 0 && daysUntilExpiration <= 14;
          })
        );

        setLowInventory(lowStockItems);
        setExpiringInventory(expiringItems);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });
  }, []);

  const handleRemoveStock = (medicationId) => {
      axios
        .delete(`http://localhost:8080/inventory/remove/${medicationId}`)
        .then(() => {
          setExpiringInventory((prev) =>
            prev.filter((medication) => medication.id !== medicationId)
          );
          alert("Medication stock removed successfully.");
        })
        .catch((error) => {
          console.error("Error removing medication stock:", error);
          alert(
            error.response?.data || "Failed to remove medication stock. Please try again."
          );
        });
    };

  // Navigate to specific routes
  const handleNavigation = (route) => {
    navigate(route, { state: { account } });
  };

  return (
    <Container>
      <SignOutButton />
      {/* Alert Banner for Low Inventory */}
      {lowInventory.length > 0 && (
        <AlertBox>
          <strong>Low Inventory Alert:</strong>
          <ul>
            {lowInventory.map((item) => (
              <li key={item.id}>
                {item.name}:{" "}
                {item.totalQuantity === 0
                  ? "Out of Stock"
                  : `${item.totalQuantity} remaining`}
              </li>
            ))}
          </ul>
        </AlertBox>
      )}

      {/* Alert Banner for Expiring Inventory */}
      {expiringInventory.length > 0 && (
        <AlertBox>
          <strong>Expiring Soon:</strong>
          <ul>
            {expiringInventory.map((medication) => (
              <li key={medication.id}>
                {medication.name}:{" "}
                {medication.medicationInventory.map((stock, index) => {
                  const expirationDate = new Date(stock.expirationDate);
                  return (
                    <span key={index}>
                      {stock.quantity} units expire on{" "}
                      {expirationDate.toLocaleDateString()}
                    </span>
                  );
                })}
                <button
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemoveStock(medication.id)}
                >
                  Remove Expired
                </button>
              </li>
            ))}
          </ul>
        </AlertBox>
      )}

<Title>Pharmacy Management System</Title>
      {account ? (
        <>
          <Description>
            Welcome,{" "}
            {account.name}!
            Select an action below:
          </Description>

          <Section>
            <Title>
              {account.role.charAt(0).toUpperCase() + account.role.slice(1)}
            </Title>

            {/* Buttons available to all roles */}
            <Button onClick={() => handleNavigation("/add-customer")}>
              Add Customer
            </Button>
            <Button onClick={() => handleNavigation("/transaction")}>
              Complete a Transaction
            </Button> {/* Transaction button */}

            {/* Role-specific buttons */}
            {account.role.toLowerCase() === "manager" && (
              <>
                <Button onClick={() => handleNavigation("/generate-report")}>
                  Generate Report
                </Button>
                <Button onClick={() => handleNavigation("/order-medicine")}>
                  Order Medicine
                </Button>
                <Button onClick={() => handleNavigation("/add-medication")}>
                  Add Medication
                </Button>
                <Button onClick={() => handleNavigation("/view-inventory")}>
                  View Inventory
                </Button>
                <Button onClick={() => handleNavigation("/manage-roles")}>
                  Manage User Roles
                </Button>
              </>
            )}

            {/* Pharmacist Buttons */}
            {account.role.toLowerCase() === "pharmacist" && (
              <>
                <Button onClick={() => handleNavigation("/pharmacist")}>
                  Get Inventory
                </Button>
                <Button onClick={() => handleNavigation("/order-medicine")}>
                  Order Medicine
                </Button>
              </>
            )}

            {/* Staff-only buttons */}
            {account.role.toLowerCase() === "staff" && (
              <>
              </>
            )}

            {/* Staff-specific buttons */}
            {(
              <>
                <Button
                  onClick={() => handleNavigation("/manage-prescriptions")}>
                  Manage Prescriptions
                </Button>
                <Button onClick={() => handleNavigation("/view-customers")}>
                  View Customers
                </Button>
              </>
            )}
          </Section>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default HomePage;
