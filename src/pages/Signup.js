import React, { useState } from "react";
import { usePendingAccounts } from "../context/PendingAccountsContext"; // Import the context
import {
  FormContainer,
  Form,
  Input,
  Button,
} from "../styles/LoginFormStyles";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("customer");
  const { addPendingAccount } = usePendingAccounts(); // Access context functions

  const handleSignUp = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newAccount = { username, password, email, phoneNumber, name, role };
    addPendingAccount(newAccount); // Add to pending accounts
    alert("Account created and pending approval!");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setPhoneNumber("");
    setName("");
    setRole("customer");
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSignUp}>
        <label>
          Name:
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Username:
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Phone Number:
          <Input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="staff">Staff Member</option>
            <option value="manager">Manager</option>
          </select>
        </label>
        <Button type="submit">Sign Up</Button>
      </Form>
    </FormContainer>
  );
};

export default SignUpForm;