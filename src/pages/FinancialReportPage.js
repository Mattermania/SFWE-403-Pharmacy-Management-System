import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ReportTableStyles.css"; // Import the table styling
import {
  Container,
  Title,
  Description,
} from "../styles/HomePageStyles";

const FinancialReportPage = () => {
  const [financialData, setFinancialData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [financialSummary, setFinancialSummary] = useState({
    totalQuantity: 0,
    totalSold: 0,
    totalExpired: 0,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinancialData();
    fetchTransactionData();
  }, []);

  // Fetch and process transaction logs
  const fetchTransactionData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reports/inventory");
      const data = response.data;

      // Group transactions by unique medicationId
      const groupedData = data.reduce((acc, log) => {
        const key = log.medicationId;

        if (!acc[key]) {
          acc[key] = {
            medicationId: key,
            totalQuantity: 0,
            totalSold: 0,
            totalExpired: 0,
          };
        }

        // Accumulate totals based on the state
        if (log.state === "CREATED" || log.state === "PURCHASED") {
          acc[key].totalQuantity += log.quantityChanged;
        } else if (log.state === "SOLD") {
          acc[key].totalSold += log.quantityChanged;
        } else if (log.state === "EXPIRED") {
          acc[key].totalExpired += log.quantityChanged;
        }

        return acc;
      }, {});

      // Fetch additional data (medication details) and append it to the grouped data
      const updatedGroupedData = await Promise.all(
        Object.keys(groupedData).map(async (key) => {
          // Fetch medication details for each medicationId
          const medicationResponse = await axios.get(`http://localhost:8080/inventory/${key}`);
          const medicationData = medicationResponse.data;

          // Add medication details to the grouped data
          return {
            ...groupedData[key],
            medicationName: medicationData.name || 'N/A', // Assuming 'name' is available
            price: medicationData.price || 0,           // Assuming 'price' is available
          };
        })
      );

      // Set the processed data to the state
      setTransactionData(updatedGroupedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
      setLoading(false);
    }
  };

  // Fetch inventory data
  const fetchFinancialData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reports/transaction");
      const responseData = response.data;

      // Fetch user names and medication names in parallel for each inventory item
      const financialData = await Promise.all(
        responseData.map(async (item) => {
          try {
            // Fetch user data using userId
            const userResponse = await axios.get(`http://localhost:8080/accounts/${item.userId}`);
            
            // Return the item with additional userName
            return {
              ...item,
              userName: userResponse.data.name, // Assuming the API returns `name` for the user
            };
          } catch (error) {
            return {
              ...item,
              userName: "N/A",
            }
          }
        })
      );
      

      setFinancialData(financialData);
      setLoading(false); // Handle loading state
    } catch (error) {
      console.error("Error fetching financial data:", error);
      setLoading(false); // Handle loading state
    }
  };

  // Sample data for expenses
  const expenses = [
    { expenseName: "Electricity", amount: 300.0 },
    { expenseName: "Water", amount: 100.0 },
    { expenseName: "Rent", amount: 2000.0 },
    { expenseName: "Employee Salaries", amount: 5000.0 },
    { expenseName: "Supplies", amount: 800.0 },
  ];

  // Calculate total sales and total transactions
  const totalSales = 0; // financialData.reduce((sum, item) => sum + item.totalSales, 0).toFixed(2);
  const totalTransactions = 0; // financialData.reduce((sum, item) => sum + item.amountSold, 0);

  // Calculate total expenses
  const totalExpenses = 0; // expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2);

  // Timestamp for the report generation
  const reportDate = new Date().toLocaleString();

  return (
    <Container>
      <Title>Financial Report</Title>
      <Description>
        Below is the financial report for the pharmacy, including total sales, profit margins, and expenses.
      </Description>

      {/* Date and Time */}
      <p style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>
        Report Generated: {reportDate}
      </p>

      {/* Financial Data Table */}
      <table className="report-table">
        <thead>
          <tr>
            <th>Medication Name</th>
            <th>Price</th>
            <th>Total Sold</th>
            <th>Total Expired</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {transactionData.map((item, index) => (
            <tr key={index}>
              <td className="center">{item.medicationName}</td>
              <td className="center">${item.price}</td>
              <td className="center">{item.totalSold}</td>
              <td className="center">{item.totalExpired}</td>
              <td className="center">${item.price * item.totalSold}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Financial Data Table */}
      <table className="report-table">
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Payment Method</th>
            <th>Total Cost</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {financialData.map((item, index) => (
            <tr key={index}>
              <td className="center">{item.userName}</td>
              <td className="center">{item.payment}</td>
              <td className="center">${item.totalCost}</td>
              <td className="center">{item.date} {item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Expenses Table */}
      <h3 style={{ marginTop: "40px" }}>Expenses Breakdown</h3>
      <table className="report-table">
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.expenseName}</td>
              <td className="center">${expense.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Expenses */}
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <p>
          <strong>Total Expenses:</strong> ${totalExpenses}
        </p>
      </div>
    </Container>
  );
};

export default FinancialReportPage;