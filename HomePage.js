// src/pages/HomePage.js

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
      .get("http://localhost:8080/inventory")
      .then((response) => {
        // Filter medications with `totalQuantity <= 10`, including `0`
        const lowStockItems = response.data.filter(
          (item) => item.totalQuantity <= 10
        );
        setLowInventory(lowStockItems);
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
            {account.role.charAt(0).toUpperCase() + account.role.slice(1)}!
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

            {/* Role-specific buttons */}
            {account.role.toLowerCase() === "manager" && (
              <>
                {/* Existing buttons */}
                <Button onClick={() => handleNavigation("/view-customers")}>
                  View Customers
                </Button>
                {/* ... other manager buttons ... */}
              </>
            )}

            {/* Pharmacist Buttons */}
            {account.role.toLowerCase() === "pharmacist" && (
              <>
                {/* Existing buttons */}
                <Button onClick={() => handleNavigation("/pharmacist")}>
                  Get Inventory
                </Button>
                {/* ... other pharmacist buttons ... */}
              </>
            )}

            {/* Staff-only buttons */}
            {account.role.toLowerCase() === "staff" && (
              <>
                {/* Existing buttons */}
                <Button onClick={() => handleNavigation("/enter-prescription")}>
                  Enter Prescription
                </Button>
                {/* ... other staff buttons ... */}

                {/* New buttons added for processing sales */}
                <Button
                  onClick={() => handleNavigation("/process-prescription-purchase")}
                >
                  Process Prescription Purchase
                </Button>
                <Button
                  onClick={() => handleNavigation("/process-non-prescription-sale")}
                >
                  Process Non-Prescription Sale
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
