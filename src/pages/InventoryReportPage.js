
import axios from "axios";
import {
  Container,
  Title,
  Description,
  Table,
  TableRow,
  TableHeader,
  TableData,
  WarningText,
} from "../styles/HomePageStyles";

import React, { useState, useEffect } from "react";


const InventoryReportPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch inventory data from the backend
    axios
      .get("http://localhost:8080/inventory")
      .then((response) => {
        setInventory(response.data); // Set inventory data from API response
        setLoading(false); // Data loaded
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
        setLoading(false); // Handle loading state
      });
  }, []);

  // Render loading state
  if (loading) {
    return (
      <Container>
        <Title>Loading Inventory...</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Inventory Report</Title>
      <Description>
        Below is the detailed inventory report of all medications in the
        pharmacy.
      </Description>

      {inventory.length >= 0 ? (
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Medication Name</TableHeader>
              <TableHeader>Manufacturer</TableHeader>
              <TableHeader>Total Quantity</TableHeader>
              <TableHeader>Stock Details (Expiration Date and Quantity)</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {inventory.map((medication) => (
              <TableRow key={medication.id}>
                <TableData>{medication.name}</TableData>
                <TableData>{medication.manufacturer}</TableData>
                <TableData>
                  {medication.medication_inventory.reduce(
                    (total, stock) => total + stock.quantity,
                    0
                  )}
                  {medication.medication_inventory.reduce(
                    (total, stock) => total + stock.quantity,
                    0
                  ) <= 10 && (
                    <WarningText> (Low Stock)</WarningText>
                  )}
                </TableData>
                <TableData>
                  {medication.medication_inventory.map((stock, index) => (
                    <div key={index}>
                      {stock.expirationDate} - {stock.quantity} units
                    </div>
                  ))}
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No medications found in the inventory.</p>
      )}
    </Container>
  );
};

export default InventoryReportPage;
