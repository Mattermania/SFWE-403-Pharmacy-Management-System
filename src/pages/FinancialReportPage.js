import React from "react";
import { Container, Title, Description } from "../styles/HomePageStyles";
import "../styles/ReportTableStyles.css"; // Import the table styling

const FinancialReportPage = () => {
  // Sample data for financial report
  const financialData = [
    {
      productName: "Ibuprofen",
      amountSold: 150,
      amountWasted: 5,
      totalSales: 450.0,
      profitMargin: 20,
    },
    {
      productName: "Paracetamol",
      amountSold: 200,
      amountWasted: 10,
      totalSales: 600.0,
      profitMargin: 25,
    },
    {
      productName: "Amoxicillin",
      amountSold: 100,
      amountWasted: 2,
      totalSales: 300.0,
      profitMargin: 15,
    },
    {
      productName: "Aspirin",
      amountSold: 180,
      amountWasted: 8,
      totalSales: 540.0,
      profitMargin: 18,
    },
  ];

  // Sample data for expenses
  const expenses = [
    { expenseName: "Electricity", amount: 300.0 },
    { expenseName: "Water", amount: 100.0 },
    { expenseName: "Rent", amount: 2000.0 },
    { expenseName: "Employee Salaries", amount: 5000.0 },
    { expenseName: "Supplies", amount: 800.0 },
  ];

  // Calculate total sales and total transactions
  const totalSales = financialData.reduce((sum, item) => sum + item.totalSales, 0).toFixed(2);
  const totalTransactions = financialData.reduce((sum, item) => sum + item.amountSold, 0);

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2);

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
            <th>Product Name</th>
            <th>Amount Sold</th>
            <th>Amount Wasted</th>
            <th>Total Sales</th>
            <th>Profit Margin</th>
          </tr>
        </thead>
        <tbody>
          {financialData.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td className="center">{item.amountSold}</td>
              <td className="center">{item.amountWasted}</td>
              <td className="center">${item.totalSales.toFixed(2)}</td>
              <td className="center">{item.profitMargin}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Section */}
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <p>
          <strong>Total Sales:</strong> ${totalSales}
        </p>
        <p>
          <strong>Total Transactions:</strong> {totalTransactions}
        </p>
      </div>

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