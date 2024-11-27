import React, { useState, useEffect } from "react";
import axios from "axios";
import { PharmacistContainer, Title } from "../styles/LoginFormStyles";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const [error, setError] = useState("");

  const fetchActivityLogs = async (currentPage = 0) => {
    try {
      const response = await axios.get("http://localhost:8080/reports/activity", {
        params: { page: currentPage, size: 10 }, // Set page size as 10
      });
      setLogs(response.data.content); // Backend returns logs in `content`
      setTotalPages(response.data.totalPages); // Total pages from response
      setError("");
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      setError("Failed to fetch activity logs. Please try again later.");
    }
  };

  useEffect(() => {
    fetchActivityLogs(page); // Fetch logs when page changes
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <PharmacistContainer>
      <Title>Activity Log</Title>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {logs.length > 0 ? (
        <table className="excel-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Activity</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.date}</td>
                <td>{log.time}</td>
                <td>{log.activity}</td>
                <td>{log.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No activity logs available.</p>
      )}
      {/* Pagination Controls */}
      <div>
        <button onClick={handlePrevPage} disabled={page === 0}>
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages - 1}>
          Next
        </button>
      </div>
    </PharmacistContainer>
  );
};

export default ActivityLog;
