
import React from "react";
import { Container, Title, Description } from "../styles/HomePageStyles";

const InventoryReportPage = () => {
  return (
    <Container>
      <Title>Inventory Report</Title>
      <Description>
        This page will contain a detailed inventory report of the pharmacy.
      </Description>
      {/* Add report content here, e.g., tables, charts */}
    </Container>
  );
};

export default InventoryReportPage;
