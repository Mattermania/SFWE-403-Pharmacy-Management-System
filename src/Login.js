import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FormContainer,
  Form,
  Button,
  Input,
  LinkText,
  AnimationContainer,
  InputContainer,
  EyeButton,
} from "./styles/LoginFormStyles";
import styled from "styled-components";
import Lottie from "lottie-react";
import pharmacyAnimation from "./animations/pharmacy_animation.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InfoSection = styled.footer`
  width: 100%;
  background-color: #f3f4f6;
  padding: 20px 10px;
  margin-top: 20px;
  border-top: 2px solid #ddd;
  color: #333;
  text-align: center;

  h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
    color: #4f74bf;
  }

  p {
    margin: 5px 0;
    font-size: 1em;
  }

  strong {
    color: #333;
  }
`;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successfulLoginMessage, setLoginMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    let userRole = "";

    if (userRole) {
      navigate("/beforepharm", { state: { role: userRole } });
      setLoginMessage("Login successful!");
      setErrorMessage("");
    } else {
      try {
        const response = await axios.get(
          "http://localhost:8080/accounts/search",
          {
            params: {
              username: username,
              email: username,
              password: password
            },
          }
        );

        if (response.status === 200 && response.data) {
          setLoginMessage("Login successful!");
          setErrorMessage("");
          navigate("/beforepharm", { state: { account: response.data } });
        } else {
          setErrorMessage("Invalid username or password.");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setErrorMessage("Invalid username or password.");
          } else {
            setErrorMessage("Error submitting request: " + error.message);
          }
        } else {
          setErrorMessage("Network error: " + error.message);
        }
      }
    }
  };

  return (
    <>
      <FormContainer>
        <AnimationContainer>
          <Lottie animationData={pharmacyAnimation} loop={false} speed={0.25} />
        </AnimationContainer>
        <Form onSubmit={handleLogin}>
          <label>
            Enter Username:
            <Input
              type="text"
              placeholder="username/email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Enter Password:
            <InputContainer>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <EyeButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </EyeButton>
            </InputContainer>
          </label>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          {successfulLoginMessage && (
            <p style={{ color: "green" }}>{successfulLoginMessage}</p>
          )}

          <Button type="submit">Login</Button>

          <LinkText to="/signup">
            <Button type="button">Signup</Button>
          </LinkText>
          <LinkText to="/forgotpassword">Forgot password?</LinkText>
        </Form>
      </FormContainer>

      {/* Pharmacy Information Section */}
      <InfoSection>
        <h2>Pharmacy Information</h2>
        <p>
          <strong>Store Hours:</strong> Monday - Friday: 9 AM - 4:30 PM, Saturday:
          11 AM - 4:30 PM, Sunday: Closed
        </p>
        <p>
          <strong>Address:</strong> 123 5Guys BLVD, GyatTown, AZ, USA
        </p>
        <p>
          <strong>Contact:</strong> Phone: (520) 456-7890 | Email:
          5Guys@5GuysPharmacy.net
        </p>
      </InfoSection>
    </>
  );
};

export default LoginForm;
