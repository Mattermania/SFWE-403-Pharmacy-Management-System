import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormContainer, Form, Button, Input, LinkText, AnimationContainer, InputContainer, EyeButton } from './styles/LoginFormStyles';
import Lottie from 'lottie-react';
import pharmacyAnimation from './animations/pharmacy_animation.json';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successfulLoginMessage, setLoginMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        let userRole = "";

        if (username === "manager" && password === "1234") {
            userRole = "manager";
          } else if (username === "pharmacist" && password === "1234") {
            userRole = "pharmacist";
          } else if (username === "staff" && password === "1234") {
            userRole = "staff";
          } 

          if (userRole) {
            navigate("/beforepharm", { state: { role: userRole } });
            setLoginMessage("Login successful!");
            setErrorMessage("");
          }
        try {
            const response = await axios.get('http://localhost:8080/accounts/search', { 
                params: { 
                    username: username, 
                    email: username, 
                    password: password 
                }
            });

            if (response.status === 200 && response.data) {
                setLoginMessage('Login successful!');
                setErrorMessage('');

                if (response.data.role == "CASHIER") {
                    // Redirect to cashier page
                    
                }
                else if (response.data.role == "TECHNICIAN") {
                    // Redirect to technician page
                    
                }
                else if (response.data.role == "PHARMACIST") {
                    // Redirect to pharmacist page
                    navigate('/pharmacist');
                }
                else if (response.data.role == "MANAGER") {
                    // Redirect to manager page
                    //navigate('/inventory');
                }
                else {
                    // Account wasn't initialized with a role
                    setErrorMessage('Invalid user account.');
                }
            } else {
                setErrorMessage('Invalid username or password.');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setErrorMessage('Invalid username or password.');
                } else {
                    setErrorMessage('Error submitting request: ' + error.message);
                }
            } else {
                setErrorMessage('Network error: ' + error.message);
            }
        }
    };

    return (
        <FormContainer>
            <AnimationContainer>
                <Lottie animationData={pharmacyAnimation} loop={false} speed={0.25} />
            </AnimationContainer>
            <Form onSubmit={handleLogin}>
                <label> Enter Username:
                    <Input
                        type="text" placeholder='username/email'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label> Enter Password:
                    <InputContainer> {/* Container for input and eye button */}
                        <Input
                            type={showPassword ? "text" : "password"} placeholder='password'
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

                {errorMessage && (
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                )}

                {successfulLoginMessage && (
                    <p style={{ color: 'green' }}>{successfulLoginMessage}</p>
                )}

                <Button type="submit">
                    Login
                </Button>

                <LinkText to="/signup">
                    <Button type="button">
                        Signup
                    </Button>
                </LinkText>
                <LinkText to="/forgotpassword">
                    Forgot password?
                </LinkText>
            </Form>
        </FormContainer>
    );
};

export default LoginForm;