import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ExcelTableStyles.css"; // Import CSS for styling the table

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
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

  useEffect(() => {
    if (!role || role !== "manager") {
      navigate("/"); // Redirect only if the role is not manager
    } else {
      // You can replace this mock data with the actual API call when the backend is ready
      setCustomers(mockCustomers);

      // Uncomment below to make an API call to fetch real customers from your backend
      /*
      axios
        .get("http://localhost:8080/patients") // Assuming the API endpoint
        .then((response) => {
          setCustomers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching patients", error);
        });
      */
    }
  }, [role, navigate]);

  const removeCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    // You can also add axios delete request here to remove the customer from the backend
    /*
    axios.delete(`http://localhost:8080/patients/${id}`).then(() => {
      setCustomers(customers.filter((customer) => customer.id !== id));
    });
    */
  };

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
                <td>{customer.dateOfBirth}</td>
                <td>{customer.insurance.name}</td>
                <td>{customer.insurance.memberId}</td>
                <td>{customer.status}</td>
                <td>
                  <button onClick={() => removeCustomer(customer.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
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
