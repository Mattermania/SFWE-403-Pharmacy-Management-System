import React, { useState, useEffect } from "react";
import axios from "axios";
import { PharmacistContainer, Title } from "../styles/LoginFormStyles";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);

  const fetchActivityLogs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/activity-logs", {
        params: { page: 0, size: 100 },
      });
      setLogs(response.data.content);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
    }
  };

  useEffect(() => {
    fetchActivityLogs();
  }, []);

  return (
    <PharmacistContainer>
      <Title>Activity Log</Title>
      {logs.length > 0 ? (
        <table className="excel-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Pharmacist Name</th>
              <th>Prescription Number</th>
              <th>Patient Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.timestamp}</td>
                <td>{log.action}</td>
                <td>{log.pharmacistName}</td>
                <td>{log.prescriptionNumber}</td>
                <td>{log.patientDetails}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No activity logs found.</p>
      )}
    </PharmacistContainer>
  );
};

export default ActivityLog;
