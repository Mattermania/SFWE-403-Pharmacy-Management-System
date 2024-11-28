import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Title,
  Description,
  Table,
  TableRow,
  TableHeader,
  TableData,
} from "../styles/HomePageStyles";

const InventoryReportPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  // Fetch inventory data
  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reports/inventory");
      const inventoryData = response.data;

      // Fetch user names and medication names in parallel for each inventory item
      const updatedInventory = await Promise.all(
        inventoryData.map(async (item) => {
          const [userResponse, medicationResponse] = await Promise.all([
            axios.get(`http://localhost:8080/accounts/${item.userId}`),
            axios.get(`http://localhost:8080/inventory/${item.medicationId}`)
          ]);

          return {
            ...item,
            userName: userResponse.data.name, // Assuming the API returns `name` for user
            medicationName: medicationResponse.data.name // Assuming the API returns `name` for medication
          };
        })
      );

      setInventory(updatedInventory);
      setLoading(false); // Handle loading state
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      setLoading(false); // Handle loading state
    }
  };

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

      <Table>
      <thead>
        <TableRow key="header-row">
          <TableHeader>Account Name</TableHeader>
          <TableHeader>Medication Name</TableHeader>
          <TableHeader>Quantity Changed</TableHeader>
          <TableHeader>Total Quantity</TableHeader>
          <TableHeader>Time and Date</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {inventory.length > 0 ? (
          inventory.map((item, index) => (
            <TableRow key={index}>
              <TableData>{item.userName}</TableData>
              <TableData>{item.medicationName}</TableData>
              <TableData>{item.quantityChanged}</TableData>
              <TableData>{item.totalQuantity}</TableData>
              <TableData>{item.date} {item.time}</TableData>
            </TableRow>
          ))
        ) : (
          <TableRow key="empty-row">
            <TableData colSpan="5" style={{ textAlign: "center" }}>
              No inventory logs found.
            </TableData>
          </TableRow>
        )}
      </tbody>
    </Table>
    </Container>
  );
};

export default InventoryReportPage;
