import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignOutButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Button = styled.button`
  background-color: #d9534f; /* Red color for sign-out */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #c9302c; /* Darker red on hover */
  }
`;

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear any session data if necessary (e.g., authentication tokens)
    localStorage.clear(); // Example of clearing localStorage
    navigate("/"); // Redirect to the login page
  };

  return (
    <SignOutButtonWrapper>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </SignOutButtonWrapper>
  );
};

export default SignOutButton;