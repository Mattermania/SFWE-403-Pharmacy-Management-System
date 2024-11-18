import {
  Container,
  Title,
  Button,
  Section,
  Description,
} from "../styles/HomePageStyles";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;

  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  const handleNavigation = (route) => {
    navigate(route, { state: { role } });
  };

  return (
    <Container>
      <Title>Pharmacy Management System</Title>
      {role ? (
        <>
          <Description>
            Welcome, {role.charAt(0).toUpperCase() + role.slice(1)}! Select an
            action below:
          </Description>

          <Section>
            <Title>{role.charAt(0).toUpperCase() + role.slice(1)}</Title>

            {/* Add Customer button available for Manager, Pharmacist, and Staff */}
            <Button onClick={() => handleNavigation("/add-customer")}>
              Add Customer
            </Button>

            {/* View Customers button available only for Manager */}
            {role === "manager" && (
              <>
                <Button onClick={() => handleNavigation("/view-customers")}>
                  View Customers
                </Button>
                <Button
                  onClick={() => handleNavigation("/generate-report")}
                >
                  Generate Report
                </Button>
                <Button
                  onClick={() => handleNavigation("/order-medication")}
                >
                  Order Medication
                </Button>
                <Button
                  onClick={() => handleNavigation("/update-inventory")}
                >
                  Update Inventory
                </Button>
                <Button
                  onClick={() => handleNavigation("/remove-access")}
                >
                  Remove Access
                </Button>
                <Button
                  onClick={() => handleNavigation("/create-user")}
                >
                  Create User Account
                </Button>
                <Button
                  onClick={() => handleNavigation("/manage-roles")}
                >
                  Manage User Roles
                </Button>

                {/* New implementation: Unlock Accounts button */}
                <Button
                  onClick={() => handleNavigation("/unlock-accounts")}
                >
                  Unlock Accounts
                </Button>

                {/* Staff Buttons */}
                <Button
                  onClick={() => handleNavigation("/enter-prescription")}
                >
                  Enter Prescription
                </Button>
                <Button
                  onClick={() => handleNavigation("/process-prescription")}
                >
                  Process Prescription
                </Button>
                <Button
                  onClick={() => handleNavigation("/request-refill")}
                >
                  Request Refill Authorization
                </Button>
                <Button
                  onClick={() => handleNavigation("/check-inventory")}
                >
                  Check Inventory
                </Button>
                <Button
                  onClick={() => handleNavigation("/receive-warning")}
                >
                  Receive Warning
                </Button>
                <Button
                  onClick={() => handleNavigation("/track-prescriptions")}
                >
                  Track Prescriptions
                </Button>
              </>
            )}

            {/* Pharmacist Buttons, with additional Staff Buttons */}
            {role === "pharmacist" && (
              <>
                <Button onClick={() => handleNavigation("/pharmacist")}>
                  Get Inventory
                </Button>
                <Button
                  onClick={() => handleNavigation("/order-medication")}
                >
                  Order Medication
                </Button>
                <Button
                  onClick={() => handleNavigation("/review-warnings")}
                >
                  Review Warnings
                </Button>
                <Button
                  onClick={() => handleNavigation("/sign-prescription")}
                >
                  Sign for Prescription
                </Button>

                {/* Staff Buttons */}
                <Button
                  onClick={() => handleNavigation("/enter-prescription")}
                >
                  Enter Prescription
                </Button>
                <Button
                  onClick={() => handleNavigation("/process-prescription")}
                >
                  Process Prescription
                </Button>
                <Button
                  onClick={() => handleNavigation("/request-refill")}
                >
                  Request Refill Authorization
                </Button>
                <Button
                  onClick={() => handleNavigation("/check-inventory")}
                >
                  Check Inventory
                </Button>
                <Button
                  onClick={() => handleNavigation("/receive-warning")}
                >
                  Receive Warning
                </Button>
                <Button
                  onClick={() => handleNavigation("/track-prescriptions")}
                >
                  Track Prescriptions
                </Button>
              </>
            )}

            {/* Staff-only buttons */}
            {role === "staff" && (
              <>
                <Button
                  onClick={() => handleNavigation("/enter-prescription")}
                >
                  Enter Prescription
                </Button>
                <Button
                  onClick={() => handleNavigation("/process-prescription")}
                >
                  Process Prescription
                </Button>
                <Button
                  onClick={() => handleNavigation("/request-refill")}
                >
                  Request Refill Authorization
                </Button>
                <Button
                  onClick={() => handleNavigation("/check-inventory")}
                >
                  Check Inventory
                </Button>
                <Button
                  onClick={() => handleNavigation("/receive-warning")}
                >
                  Receive Warning
                </Button>
                <Button
                  onClick={() => handleNavigation("/track-prescriptions")}
                >
                  Track Prescriptions
                </Button>
              </>
            )}

            {/* Customer-specific buttons */}
            {role === "customer" && (
              <>
                <Button
                  onClick={() => handleNavigation("/submit-prescription")}
                >
                  Submit Prescription
                </Button>
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



//New Implementation
// Inside the manager-specific buttons
{role === "manager" && (
  <>
    {/* Existing buttons */}
    <Button onClick={() => handleNavigation("/activity-log")}>
      View Activity Log
    </Button>
    {/* Other buttons */}
  </>
)}


