// src/pages/HomePage.js
import {
  Container,
  Title,
  Button,
  Section,
  Description,
} from "../styles/HomePageStyles";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const account = location.state?.account;
  const [warnings, setWarnings] = useState({ lowStock: 0, expired: 0 });

  useEffect(() => {
    if (!account) {
      navigate("/");
    } else if (
      account.role.toLowerCase() === "manager" ||
      account.role.toLowerCase() === "pharmacist"
    ) {
      fetchWarnings();
    }
  }, [account, navigate]);

  const fetchWarnings = async () => {
    try {
      const [lowStockResponse, expiredResponse] = await Promise.all([
        axios.get("http://localhost:8080/inventory/low-stock-warnings/count"),
        axios.get("http://localhost:8080/inventory/expired-medications/count"),
      ]);

      const lowStock = lowStockResponse.data;
      const expired = expiredResponse.data;

      setWarnings({ lowStock, expired });

      if (lowStock > 0 || expired > 0) {
        alert(
          `Warning:\n${lowStock} medications are low in stock.\n` +
            `${expired} medications are expired or nearing expiration.`
        );
      }
    } catch (error) {
      console.error("Error fetching warnings:", error);
    }
  };

  const handleNavigation = (route) => {
    navigate(route, { state: { account } });
  };

  return (
    <Container>
      <Title>Pharmacy Management System</Title>
      {account ? (
        <>
          <Description>
            Welcome,{" "}
            {account.role.charAt(0).toUpperCase() + account.role.slice(1)}! Select an action below:
          </Description>

          <Section>
            <Title>{account.role.charAt(0).toUpperCase() + account.role.slice(1)}</Title>

            {/* Add Customer button available for Manager, Pharmacist, and Staff */}
            <Button onClick={() => handleNavigation("/add-customer")}>Add Customer</Button>

            {/* View Customers button available only for Manager */}
            {account.role.toLowerCase() === "manager" && (
              <>
                <Button onClick={() => handleNavigation("/view-customers")}>View Customers</Button>
                <Button onClick={() => handleNavigation("/generate-report")}>Generate Report</Button>
                <Button onClick={() => handleNavigation("/order-medication")}>
                  Order Medication
                </Button>
                <Button onClick={() => handleNavigation("/update-inventory")}>
                  Update Inventory
                </Button>
                <Button onClick={() => handleNavigation("/remove-access")}>Remove Access</Button>
                <Button onClick={() => handleNavigation("/create-user")}>
                  Create User Account
                </Button>
                <Button onClick={() => handleNavigation("/manage-roles")}>Manage User Roles</Button>

                {/* Staff Buttons */}
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

            {/* Pharmacist Buttons, with additional Staff Buttons */}
            {account.role.toLowerCase() === "pharmacist" && (
              <>
                <Button onClick={() => handleNavigation("/pharmacist")}>Get Inventory</Button>
                <Button onClick={() => handleNavigation("/order-medication")}>Order Medication</Button>
                <Button onClick={() => handleNavigation("/review-warnings")}>Review Warnings</Button>
                <Button onClick={() => handleNavigation("/sign-prescription")}>
                  Sign for Prescription
                </Button>

                {/* Staff Buttons */}
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
