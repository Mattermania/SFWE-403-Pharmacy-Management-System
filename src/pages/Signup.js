import React, { useState } from "react";
import axios from "axios";
import { FormContainer, Form, Input, Button, EyeButton, InputContainer } from '../styles/LoginFormStyles';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("CASHIER");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Validation
    if (!username || !name || !phoneNumber || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      setSuccessMessage("");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Invalid email format.");
      setSuccessMessage("");
      return;
    }

    if (!/^\+?[0-9]{7,15}$/.test(phoneNumber)) {
      setErrorMessage("Invalid phone number.");
      setSuccessMessage("");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setSuccessMessage("");
      return;
    }

    const accountData = {
      username,
      password,
      name,
      phoneNumber,
      email,
      role,
    };

    try {
      setIsSubmitting(true);
      const response = await axios.post("http://localhost:8080/accounts", accountData);

      if (response.status === 201) {
        setSuccessMessage("Account created successfully.");
        setErrorMessage("");
        // Reset form
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        setPhoneNumber("");
        setEmail("");
        setRole("CASHIER");
      } else {
        setErrorMessage(`Error creating account: ${response.status}`);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      // setErrorMessage(
      //   `Error submitting request: ${error.response?.data?.message || error.message}`
      // );
      setErrorMessage(`Account with this username and/or email already exists`);
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSignUp}>
        <label>
          Username:
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Name:
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email:
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Phone Number:
          <Input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>

        <label>
          Password:
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </label>

        <label>
          Confirm Password:
          <Input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </label>

        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="CASHIER">Cashier</option>
            <option value="TECHNICIAN">Technician</option>
            <option value="PHARMACIST">Pharmacist</option>
            <option value="MANAGER">Manager</option>
          </select>
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>

        {errorMessage && (
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
        )}
        {successMessage && (
          <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>
        )}
      </Form>
    </FormContainer>
  );
};

export default SignUpForm;