// src/pages/GenerateReportPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, Button, Section, Description } from "../styles/HomePageStyles";

const GenerateReportPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <Container>
      <Title>Generate Report</Title>
      <Description>Select the type of report to generate:</Description>
      <Section>
        <Button onClick={() => handleNavigation("/financial-report")}>
          Financial Report
        </Button>
        <Button onClick={() => handleNavigation("/inventory-report")}>
          Inventory Report
        </Button>
      </Section>
    </Container>
  );
};

export default GenerateReportPage;
