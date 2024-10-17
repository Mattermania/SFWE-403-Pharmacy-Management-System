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

  // Redirect to login if no role is present
  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  const handleNavigation = (route) => {
    navigate(route);
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

          {/* Combined Manager and Staff Buttons for Managers */}
          {role === "manager" && (
            <Section>
              <Title>Manager</Title>
              <Button onClick={() => handleNavigation("/generate-report")}>
                Generate Report
              </Button>
              <Button onClick={() => handleNavigation("/order-medication")}>
                Order Medication
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
            </Section>
          )}

          {/* Combined Pharmacist and Staff Buttons for Pharmacists */}
          {role === "pharmacist" && (
            <Section>
              <Title>Pharmacist</Title>
              <Button onClick={() => handleNavigation("/pharmacist")}>
                Get Inventory
              </Button>
              <Button onClick={() => handleNavigation("/order-medication")}>
                Order Medication
              </Button>
              <Button onClick={() => handleNavigation("/review-warnings")}>
                Review Warnings
              </Button>
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
            </Section>
          )}

          {/* Only Staff Buttons for Staff */}
          {role === "staff" && (
            <Section>
              <Title>Staff Member</Title>
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
            </Section>
          )}

          {/* Customer Role - Submit and Track Prescriptions */}
          {role === "customer" && (
            <Section>
              <Title>Customer</Title>
              <Button onClick={() => handleNavigation("/submit-prescription")}>
                Submit Prescription
              </Button>
              <Button onClick={() => handleNavigation("/track-prescriptions")}>
                Track Prescriptions
              </Button>
            </Section>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default HomePage;
