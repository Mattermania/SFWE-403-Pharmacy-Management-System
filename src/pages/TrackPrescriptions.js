// src/pages/TrackPrescriptions.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ExcelTableStyles.css";

const TrackPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]); // Initialize prescriptions
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error handling state
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;

  const [newPrescription, setNewPrescription] = useState({
    patientName: "",
    description: "",
    status: "Not Processed",
  });
  
  // Fetch the prescriptions from the backend
  const fetchPrescriptions = async () => {
    if (!role || role !== "pharmacist") {
      navigate("/"); // Redirect if the role is not manager
      return; // Exit early if not manager
    }

    // You can replace this mock data with the actual API call when the backend is ready
    // setPrescriptions(mockPrescriptions);
    
    try {
      const response = await axios.get('http://localhost:8080/prescriptions'); // Replace with actual endpoint
      setPrescriptions(response.data); // Set the patient data from response
    } catch (error) {
      setError('Error fetching prescriptions: ' + (error.response?.data.message || error.message));
    } finally {
      setLoading(false); // Stop loading after trying to fetch
    }
  };

  // Run the fetchPatients function once on component mount
  useEffect(() => {
    fetchPrescriptions();
  }, [role, navigate]);

  const removePrescription = (id) => {
    setPrescriptions(prescriptions.filter((prescription) => prescription.id !== id));
    // You can also add axios delete request here to remove the prescription from the backend
    axios.delete(`http://localhost:8080/prescriptions/${id}`).then(() => {
      setPrescriptions(prescriptions.filter((prescription) => prescription.id !== id));
    });
  };

  if (loading) {
    return <p>Loading prescriptions...</p>; // Display loading message while fetching
  }

  if (error) {
    return <p>{error}</p>; // Display error if any
  }

  const handleAddPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      { ...newPrescription, id: prescriptions.length + 1 },
    ]);
    setNewPrescription({
      prescriptionName: "",
      prescription: "",
      status: "Not Processed",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription({ ...newPrescription, [name]: value });
  };

  return (
    <div className="excel-table-container">
      <h1>Track Prescriptions</h1>
      <table className="excel-table">
        <thead>
          <tr>
            <th>Prescription Name</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>{prescription.name}</td>
                <td>{prescription.description}</td>
                <td>{prescription.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No prescriptions available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Prescription Form */}
      <div className="add-prescription-form">
        <h3>Add New Prescription</h3>
        <label>
          Patient Name:
          <input
            type="text"
            name="patientName"
            value={newPrescription.patientName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newPrescription.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={newPrescription.status}
            onChange={handleInputChange}
          >
            <option value="Not Processed">Not Processed</option>
            <option value="Processing">Processing</option>
            <option value="Ready">Ready</option>
          </select>
        </label>
        <button onClick={handleAddPrescription}>Add Prescription</button>
      </div>
    </div>
  );
};

export default TrackPrescriptions;
