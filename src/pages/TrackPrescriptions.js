import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ExcelTableStyles.css";

const TrackPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const account = location.state?.account;

  const [newPrescription, setNewPrescription] = useState({
    patientName: "",
    name: "",
    description: "",
    status: "AVAILABLE",
  });
  
  // Fetch prescriptions from the backend
  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/prescriptions'); // Replace with actual endpoint
      setPrescriptions(response.data);
    } catch (error) {
      setError('Error fetching prescriptions: ' + (error.response?.data.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Run fetchPrescriptions on component mount
  useEffect(() => {
    fetchPrescriptions();
  }, [account, navigate]);

  const removePrescription = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/prescriptions/${id}`);
      setPrescriptions(prescriptions.filter((prescription) => prescription.id !== id));
    } catch (error) {
      setError('Error deleting prescription: ' + (error.response?.data.message || error.message));
    }
  };

  const handleAddPrescription = async () => {
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      let patientId;
  
      // Fetch patient ID based on patient name
      const response = await axios.get(`http://localhost:8080/patients/name/${newPrescription.patientName}`);
      if (response.status === 200 && response.data?.id) {
        patientId = response.data.id;
      } else {
        setErrorMessage('Patient not found.');
        return; // Exit early if the patient is not found
      }
  
      // Create new prescription object
      const newPrescriptionData = {
        patient: {
          id: patientId,
        },
        name: newPrescription.name,
        description: newPrescription.description,
        status: newPrescription.status,
        medications: [],
      };
  
      // Send prescription data
      const prescriptionResponse = await axios.post('http://localhost:8080/prescriptions', newPrescriptionData);
      if (prescriptionResponse.status === 201) {
        console.log("Prescription created:", prescriptionResponse.data);
        setSuccessMessage(`Prescription created successfully.`);

        // Create a new logs object
        const now = new Date();

        const newLogData = {
          date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`,
          time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`,
          userId: account.id,
          field: "PRESCRIPTION",
          fieldId: prescriptionResponse.data.id,
          status: "ADD"
        };

        await axios.post('http://localhost:8080/logs', newLogData);
      } else {
        setErrorMessage('Error creating prescription.');
      }

      setPrescriptions([
        ...prescriptions,
        { ...newPrescription, id: prescriptions.length + 1 },
      ]);
      setNewPrescription({
        patientName: "",
        name: "",
        description: "",
        status: "AVAILABLE",
      });
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription({ ...newPrescription, [name]: value });
  };

  if (loading) {
    return <p>Loading prescriptions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
              <td colSpan="4" style={{ textAlign: "center" }}>
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
        Prescription Name:
          <input
            type="text"
            name="name"
            value={newPrescription.name}
            onChange={handleInputChange}
          />
        </label>
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
            <option value="AVAILABLE">Available</option>
            <option value="BLOCKED">Blocked</option>
            <option value="PROCESS">Process</option>
            <option value="PAID">Paid</option>
            <option value="FILLED">Filled</option>
          </select>
        </label>
        <button onClick={handleAddPrescription}>Add Prescription</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default TrackPrescriptions;
