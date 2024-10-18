import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ExcelTableStyles.css"; // Import CSS for styling the table

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]); // Initialize customers
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error handling state
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;

  // Temporary mock data for customers
  const mockCustomers = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      dob: "1990-05-12",
      insurance: {
        name: "Blue Cross",
      memberId: "12345678"
      },
      status: "AVAILABLE"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      dob: "1985-09-17",
      insurance: {
        name: "Aetna",
        memberId: "98765432"
      },
      status: "AVAILABLE"
    },
    {
      id: "3",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      dob: "1978-12-21",
      insurance: {
        name: "Cigna",
      memberId: "55555555"
      },
      status: "AVAILABLE"
    },
  ];

  // Fetch the patients from the backend
  const fetchPatients = async () => {
    if (!role || role !== "manager") {
      navigate("/"); // Redirect if the role is not manager
      return; // Exit early if not manager
    }

    // You can replace this mock data with the actual API call when the backend is ready
    // setCustomers(mockCustomers);
    
    try {
      const response = await axios.get('http://localhost:8080/patients'); // Replace with actual endpoint
      setCustomers(response.data); // Set the patient data from response
    } catch (error) {
      setError('Error fetching patients: ' + (error.response?.data.message || error.message));
    } finally {
      setLoading(false); // Stop loading after trying to fetch
    }
  };

  // Run the fetchPatients function once on component mount
  useEffect(() => {
    fetchPatients();
  }, [role, navigate]);

  const removeCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    // You can also add axios delete request here to remove the customer from the backend
    axios.delete(`http://localhost:8080/patients/${id}`).then(() => {
      setCustomers(customers.filter((customer) => customer.id !== id));
    });
  };

  if (loading) {
    return <p>Loading customers...</p>; // Display loading message while fetching
  }

  if (error) {
    return <p>{error}</p>; // Display error if any
  }

  return (
    <div className="excel-table-container">
      <h1>Customer List</h1>
      <table className="excel-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Insurance</th>
            <th>Member ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.dob}</td> {/* Corrected from dateOfBirth to dob */}
                <td>{customer.insurance.insuranceProvider}</td>
                <td>{customer.insurance.memberId}</td>
                <td>{customer.prescriptionStatus}</td>
                <td>
                  <button onClick={() => removeCustomer(customer.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No customers available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCustomers;
