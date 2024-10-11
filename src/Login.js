import React, { useState } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import {FormContainer,Form,Button,Input,LinkText,AnimationContainer} from './styles/LoginFormStyles';
import Lottie from 'lottie-react';
import pharmacyAnimation from './animations/pharmacy_animation.json'; 

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        
        // Send the username and password to the backend
        axios.post('http://localhost:8080/api/login', { username, password })
            .then(response => {
                if (response.data === 'Login successful') {
                    setSuccessMessage('Login successful!');
                    setErrorMessage('');
                    // Handle successful login (e.g., redirect or update state)
                } else {
                    setErrorMessage('Invalid username or password.');
                    setSuccessMessage('');
                }
            })
            .catch(error => {
                setErrorMessage('An error occurred while logging in.');
                setSuccessMessage('');
                console.error('Login error:', error);
            });
    };

    return (
        <FormContainer>
            <AnimationContainer>
                <Lottie animationData={pharmacyAnimation} loop={false} speed={0.25} />
            </AnimationContainer>
            <Form onSubmit={handleLogin}>
                <label> Enter Username:
                    <Input
                        type="text"
                        placeholder="username/email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label> Enter Password:
                    <Input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {errorMessage && (
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                )}
                {successMessage && (
                    <p style={{ color: 'green' }}>{successMessage}</p>
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
}

export default LoginForm;
