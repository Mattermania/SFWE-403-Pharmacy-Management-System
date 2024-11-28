import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { PharmacistContainer, Title, Button } from "../styles/LoginFormStyles";
import "../styles/ExcelTableStyles.css"; // Import table styling

const ManagePrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const account = location.state?.account;

  const [newPrescription, setNewPrescription] = useState({
    patientName: "",
    name: "",
    description: "",
    status: "AVAILABLE",
  });

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/prescriptions");
      setPrescriptions(data);
      setErrorMessage("");
    } catch (error) {
      handleError(error, "Error fetching prescriptions.");
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error, defaultMsg) => {
    const status = error.response?.status;
    if (status === 400) {
      setErrorMessage("Prescription already filled.");
    } else if (status === 404) {
      setErrorMessage("Insufficient quantities available.");
    } else {
      setErrorMessage(error.response?.data?.message || defaultMsg || error.message);
    }
  };

  const handleFillPrescription = async (id) => {
    try {
      const responseMessage = await axios.post("http://localhost:8080/prescriptions/fill", null, { params: { prescriptionId: id } });
      setSuccessMessage(responseMessage);
      fetchPrescriptions();
  
      const response = await axios.get(`http://localhost:8080/prescriptions/${id}`);
      
      for (let medication of response.data.medications) {
        logOrder(medication.medication.id, medication.quantity, medication.medication.totalQuantity);
      }
    } catch (error) {
      handleError(error, "Error filling prescription.");
    }
  };
  

  const handleAddPrescription = async (e) => {
    e.preventDefault();
    setLoadingAction(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { data } = await axios.get(`http://localhost:8080/patients/name/${newPrescription.patientName}`);
      if (data?.id) {
        const newPrescriptionData = {
          patient: { id: data.id },
          name: newPrescription.name,
          description: newPrescription.description,
          status: newPrescription.status,
          medications: [],
        };
        await axios.post("http://localhost:8080/prescriptions", newPrescriptionData);
        setSuccessMessage("Prescription created successfully.");
        fetchPrescriptions();
      } else {
        setErrorMessage("Patient not found.");
      }
    } catch (error) {
      handleError(error, "Error creating prescription.");
    } finally {
      setLoadingAction(false);
    }
  };

  const logOrder = async (medicationId, quantityOrdered, totalQuantity) => {
    try {
      const now = new Date();
      const logData = {
        logType: "inventory",
        date: formatDate(now),
        time: formatTime(now),
        userId: account.id, // Replace with dynamic user ID if applicable
        medicationId: medicationId,
        quantityChanged: quantityOrdered,
        totalQuantity,
        state: "SOLD",
      };

      await axios.post("http://localhost:8080/reports/inventory", logData);
    } catch (error) {
      console.error("Error logging order:", error);
      throw error; // Re-throw for error handling
    }
  };

  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  const resetForm = () => {
    setNewPrescription({ patientName: "", name: "", description: "", status: "AVAILABLE" });
  };

  if (loading) return <p>Loading prescriptions...</p>;

  return (
    <PharmacistContainer>
      <Title>Prescriptions</Title>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="excel-table-container">
        <table className="excel-table">
          <thead>
            <tr>
              <th>Prescription Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
                  <tr key={prescription.id}>
                <td>
                  <button
                    onClick={() => navigate(`/prescription-specifics/${prescription.id}`, { state: { prescription } })}
                    className="prescription-link"
                  >
                    {prescription.name}
                  </button>
                </td>
                <td>{prescription.description}</td>
                <td>{prescription.status}</td>
                <td>
                  <Button onClick={() => handleFillPrescription(prescription.id)} disabled={loadingAction}>
                    {loadingAction ? "Processing..." : "Fill Prescription"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddPrescriptionForm
        newPrescription={newPrescription}
        setNewPrescription={setNewPrescription}
        onSubmit={handleAddPrescription}
        loadingAction={loadingAction}
      />
    </PharmacistContainer>
  );
};

const AddPrescriptionForm = ({ newPrescription, setNewPrescription, onSubmit, loadingAction }) => (
  <div style={{ marginTop: "20px" }}>
    <Title>Add New Prescription</Title>
    <form onSubmit={onSubmit}>
      <label>
        Prescription Name:
        <input
          type="text"
          value={newPrescription.name}
          onChange={(e) => setNewPrescription({ ...newPrescription, name: e.target.value })}
        />
      </label>
      <label>
        Patient Name:
        <input
          type="text"
          value={newPrescription.patientName}
          onChange={(e) => setNewPrescription({ ...newPrescription, patientName: e.target.value })}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={newPrescription.description}
          onChange={(e) => setNewPrescription({ ...newPrescription, description: e.target.value })}
        />
      </label>
      <label>
        Status:
        <select
          value={newPrescription.status}
          onChange={(e) => setNewPrescription({ ...newPrescription, status: e.target.value })}
        >
          <option value="AVAILABLE">Available</option>
          <option value="BLOCKED">Blocked</option>
          <option value="PROCESS">Process</option>
          <option value="PAID">Paid</option>
          <option value="FILLED">Filled</option>
        </select>
      </label>
      <Button type="submit" disabled={loadingAction}>
        {loadingAction ? "Adding..." : "Add Prescription"}
      </Button>
    </form>
  </div>
);

export default ManagePrescriptions;
