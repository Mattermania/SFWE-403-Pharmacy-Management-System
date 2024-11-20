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

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const account = location.state?.account;
  const [lowInventory, setLowInventory] = useState([]);

  useEffect(() => {
    if (!account) {
      navigate("/");
    }
  }, [account, navigate]);

  // Fetch low inventory data
  useEffect(() => {
    axios
      .get("http://localhost:8080/inventory") // Replace with your API endpoint
      .then((response) => {
        // Filter medications with `totalQuantity <= 10`, including `0`
        const lowStockItems = response.data.filter(
          (item) => item.totalQuantity <= 10 // Include items with zero stock
        );
        setLowInventory(lowStockItems); // Set state with filtered items
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });
  }, []);
  

  const handleNavigation = (route) => {
    navigate(route, { state: { account } });
  };

  return (
    <Container>
      {/* Alert Banner for Low Inventory */}
{lowInventory.length > 0 && (
  <AlertBox>
    <strong>Low Inventory Alert:</strong>
    <ul>
      {lowInventory.map((item) => (
        <li key={item.id}>
          {item.name}: {item.totalQuantity === 0 ? "Out of Stock" : `${item.totalQuantity} remaining`}
        </li>
      ))}
    </ul>
  </AlertBox>
)}


      <Title>Pharmacy Management System</Title>
      {account ? (
        <>
          <Description>
            Welcome, {account.role.charAt(0).toUpperCase() + account.role.slice(1)}! Select an
            action below:
          </Description>

          <Section>
            <Title>{account.role.charAt(0).toUpperCase() + account.role.slice(1)}</Title>

            {/* Buttons available to all roles */}
            <Button onClick={() => handleNavigation("/add-customer")}>
              Add Customer
            </Button>

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
                <Button onClick={() => handleNavigation("/update-inventory")}>
                  Update Inventory
                </Button>
                <Button onClick={() => handleNavigation("/remove-access")}>
                  Remove Access
                </Button>
                <Button onClick={() => handleNavigation("/create-user")}>
                  Create User Account
                </Button>
                <Button onClick={() => handleNavigation("/manage-roles")}>
                  Manage User Roles
                </Button>
                 {/* New implementation: Unlock Accounts button */}
                <Button
                  onClick={() => handleNavigation("/unlock-accounts")}>
                  Unlock Accounts
                </Button>
                {/* New implementation: View Activity Log button */}
                <Button onClick={() => handleNavigation("/activity-log")}>
                  View Activity Log
                </Button>
                <Button onClick={() => handleNavigation("/enter-prescription")}>
                  Enter Prescription
                </Button>
                <Button onClick={() => handleNavigation("/process-prescription")}>
                  Process Prescription
                </Button>
                <Button onClick={() => handleNavigation("/request-refill")}>
                  Request Refill Authorization
                </Button>
                <Button onClick={() => handleNavigation("/check-inventory")}>
                  Check Inventory
                </Button>
                <Button onClick={() => handleNavigation("/receive-warning")}>
                  Receive Warning
                </Button>
                <Button onClick={() => handleNavigation("/track-prescriptions")}>
                  Track Prescriptions
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
                <Button onClick={() => handleNavigation("/review-warnings")}>
                  Review Warnings
                </Button>
                <Button onClick={() => handleNavigation("/sign-prescription")}>
                  Sign for Prescription
                </Button>
                <Button onClick={() => handleNavigation("/enter-prescription")}>
                  Enter Prescription
                </Button>
                <Button onClick={() => handleNavigation("/process-prescription")}>
                  Process Prescription
                </Button>
                <Button onClick={() => handleNavigation("/request-refill")}>
                  Request Refill Authorization
                </Button>
                <Button onClick={() => handleNavigation("/check-inventory")}>
                  Check Inventory
                </Button>
                <Button onClick={() => handleNavigation("/receive-warning")}>
                  Receive Warning
                </Button>
                <Button onClick={() => handleNavigation("/track-prescriptions")}>
                  Track Prescriptions
                </Button>
              </>
            )}

            {/* Staff-only buttons */}
            {account.role.toLowerCase() === "staff" && (
              <>
                <Button onClick={() => handleNavigation("/enter-prescription")}>
                  Enter Prescription
                </Button>
                <Button onClick={() => handleNavigation("/process-prescription")}>
                  Process Prescription
                </Button>
                <Button onClick={() => handleNavigation("/request-refill")}>
                  Request Refill Authorization
                </Button>
                <Button onClick={() => handleNavigation("/check-inventory")}>
                  Check Inventory
                </Button>
                <Button onClick={() => handleNavigation("/receive-warning")}>
                  Receive Warning
                </Button>
                <Button onClick={() => handleNavigation("/track-prescriptions")}>
                  Track Prescriptions
                </Button>
              </>
            )}

            {/* Customer-specific buttons */}
            {account.role.toLowerCase() === "customer" && (
              <>
                <Button onClick={() => handleNavigation("/submit-prescription")}>
                  Submit Prescription
                </Button>
                <Button onClick={() => handleNavigation("/track-prescriptions")}>
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
