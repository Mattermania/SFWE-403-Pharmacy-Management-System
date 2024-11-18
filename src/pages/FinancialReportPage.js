// src/pages/FinancialReportPage.js
import React from "react";
import { Container, Title, Description } from "../styles/HomePageStyles";

const FinancialReportPage = () => {
  return (
    <Container>
      <Title>Financial Report</Title>
      <Description>
        This page will contain a detailed financial report of the pharmacy.
      </Description>
      {/* Add report content here, e.g., tables, charts */}
    </Container>
  );
};

export default FinancialReportPage;
