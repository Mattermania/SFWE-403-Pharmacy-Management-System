import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormContainer, Form, Button, Input } from "./styles/LoginFormStyles";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    try {
      // Explicitly flag the account for password reset
      const response = await axios.post("http://localhost:8080/accounts/forgot-password", {
        email,
      });

      if (response.status === 200) {
        setSuccessMessage("Your request has been sent. A manager will review it shortly.");
        setErrorMessage("");

        // Display confirmation popup
        setTimeout(() => {
          alert("Password reset request sent successfully!");
          navigate("/");
        }, 500);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("No account found with that email.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleForgotPassword}>
        <h2>Forgot Password</h2>
        <label>
          Enter Your Email:
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <Button type="submit">Submit</Button>
        <Button type="button" onClick={() => navigate("/")}>
          Back to Login
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ForgotPassword;