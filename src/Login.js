import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormContainer, Form, Button, Input, LinkText, AnimationContainer, InputContainer, EyeButton } from './styles/LoginFormStyles';
import Lottie from 'lottie-react';
import pharmacyAnimation from './animations/pharmacy_animation.json';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [prevUsername, setPrevUsername] = useState('');
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const [password, setPassword] = useState('');
    const [successfulLoginMessage, setLoginMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        let userRole = "";
        let currWrongAttempts = wrongAttempts;
        
        try {
            const response = await axios.get('http://localhost:8080/accounts/search', { 
                params: {
                    username: username, 
                    email: username
                }
            });

            if (response.status === 200 && response.data) {
                if ((response.data.role != "MANAGER") && (response.data.state == "LOCKED")) {
                    setLoginMessage('');
                    setErrorMessage('Account locked. Please contact Manager for assistance.' + response.data.role);
                    return;
                }
                else if ((response.data.role != "MANAGER") && (response.data.state == "INACTIVE")) {
                    setLoginMessage('');
                    setErrorMessage('Account not activated. Please contact Manager for assistance.');
                    return;
                }
                
                if (response.data.password == password) {
                    setLoginMessage('Login successful!');
                    setErrorMessage('');

                    navigate("/beforepharm", { state: { account: response.data } });
                } else {
                    if ((response.data.role != "MANAGER") && (((currWrongAttempts + 1) >= 5) || response.data.state == 'LOCKED')) {
                        try {
                            const returnResponse = await axios.put(`http://localhost:8080/accounts/state/${response.data.id}`, null, {
                                params: { state: 'LOCKED' }
                            });
                    
                            if (returnResponse.status === 200 && returnResponse.data) {
                                setErrorMessage('Account locked. Please request manager support to unlock.');
                            } else {
                                setSuccessMessage('');
                                setErrorMessage('Error: Account not successfully locked.');
                            }
                        } catch (error) {
                            setSuccessMessage('');
                            setErrorMessage('Error: Unable to send locked account request.' + error.message);
                            console.error('Error:', error.returnResponse ? error.returnResponse.data : error.message);
                        }

                        try {
                            // Create a new logs object
                            const now = new Date();
                    
                            const newLogData = {
                                logType: "activity",
                                date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`,
                                time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`,
                                userId: response.data.id,
                                activity: "LOCKED"
                            };
                    
                            await axios.post('http://localhost:8080/reports/inventory', newLogData);
                        } catch(error) {
                            // Handle errors and show error message
                            console.error("Error logging inventory change", error);
                            setErrorMessage("Error logging inventory change");
                            setSuccessMessage("");
                            return;
                        }
                    } else {
                        setWrongAttempts(currWrongAttempts + 1);
                        setErrorMessage('Invalid username or password.');
                        setPrevUsername(username);
                    }
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