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
import SignOutButton from "../components/SignOutButton"; // Import the SignOutButton

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const account = location.state?.account;
  const [lowInventory, setLowInventory] = useState([]);

  // Redirect to login page if account is not available
  useEffect(() => {
    if (!account) {
      navigate("/");
    }
  }, [account, navigate]);

  // Debugging to check account state
  useEffect(() => {
    console.log("Account state:", account);
    if (!account) {
      navigate("/");
    }
  }, [account, navigate]);

  // Fetch low inventory data
  useEffect(() => {
    axios
      .get("http://localhost:8080/inventory") // Replace with your API endpoint
      .then((response) => {
        const lowStockItems = response.data.filter(
          (item) => item.totalQuantity <= 10 // Include items with zero stock
        );
        setLowInventory(lowStockItems); // Set state with filtered items
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });
  }, []);

  // Navigate to specific routes
  const handleNavigation = (route) => {
    navigate(route, { state: { account } });
  };

  return (
    <Container>
      <SignOutButton /> {/* Add the SignOutButton */}
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
            {/* Role-specific buttons */}
            {account.role.toLowerCase() === "manager" && (
              <>
                <Button onClick={() => handleNavigation("/view-customers")}>
                  View Customers
                </Button>
                <Button onClick={() => handleNavigation("/generate-report")}>
                  Generate Report
                </Button>
                <Button onClick={() => handleNavigation("/order-medicine")}>
                  Order Medicine
                </Button>
                <Button onClick={() => handleNavigation("/add-medication")}>
                  Add Medication
                </Button>
                <Button onClick={() => handleNavigation("/update-inventory")}>
                  Update Inventory
                </Button>
                <Button onClick={() => handleNavigation("/manage-roles")}>
                  Manage User Roles
                </Button>
                <Button onClick={() => handleNavigation("/activity-log")}>
                  View Activity Log
                </Button> {/* Add this button */}
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
                  onClick={() => handleNavigation("/track-prescriptions")}
                >
                  Track Prescriptions
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
