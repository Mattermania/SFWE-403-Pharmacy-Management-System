import React, { useState } from 'react';
import { FormContainer, Form, Input, Button, EyeButton, InputContainer } from '../styles/LoginFormStyles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer'); 
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();
    // Add your sign-up logic here
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
          Email:
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </label>

        <label>
          Confirm Password:
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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