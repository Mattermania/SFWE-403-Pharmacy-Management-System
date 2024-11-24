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
    // Simulate fetching inventory data from the backend
    const fetchInventory = async () => {
      try {
        // Uncomment the line below if you want to actually fetch from an API
        // const response = await axios.get("http://localhost:8080/inventory");
        // setInventory(response.data);

        // Dummy data for testing
        const dummyData = [
          {
            accountName: "HealthCare Clinic",
            medicationName: "Ibuprofen",
            quantityChange: "+20",
            totalQuantity: "100",
            timestamp: "2024-11-23 10:30 AM",
          },
          {
            accountName: "General Hospital",
            medicationName: "Paracetamol",
            quantityChange: "-10",
            totalQuantity: "50",
            timestamp: "2024-11-22 2:45 PM",
          },
          {
            accountName: "City Pharmacy",
            medicationName: "Amoxicillin",
            quantityChange: "+5",
            totalQuantity: "30",
            timestamp: "2024-11-21 1:15 PM",
          },
          {
            accountName: "Wellness Center",
            medicationName: "Aspirin",
            quantityChange: "-5",
            totalQuantity: "60",
            timestamp: "2024-11-20 9:00 AM",
          },
        ];

        // Use dummy data for testing
        setInventory(dummyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
        setLoading(false); // Handle loading state
      }
    };

    fetchInventory();
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
              <TableHeader>Account Name</TableHeader>
              <TableHeader>Medication Name</TableHeader>
              <TableHeader>Quantity Change</TableHeader>
              <TableHeader>Total Quantity</TableHeader>
              <TableHeader>Time and Date</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {inventory.map((item, index) => (
              <TableRow key={index}>
                <TableData>{item.accountName}</TableData>
                <TableData>{item.medicationName}</TableData>
                <TableData>{item.quantityChange}</TableData>
                <TableData>{item.totalQuantity}</TableData>
                <TableData>{item.timestamp}</TableData>
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
