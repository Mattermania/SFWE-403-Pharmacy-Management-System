import React, { useState } from 'react';
import axios from 'axios';
import {FormContainer,Form,Button,Input,LinkText,AnimationContainer} from './styles/LoginFormStyles';
import Lottie from 'lottie-react';
import pharmacyAnimation from './animations/pharmacy_animation.json'; 

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successfulLoginMessage, setLoginMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            // Send GET request with query parameters for username and password
            const response = await axios.get('http://localhost:8080/accounts/search', { 
                params: { 
                    username: username, 
                    password: password 
                }
            });
            // If the response is successful, you can handle it accordingly
            if (response.status === 200 && response.data) {
                // Here, you might want to handle successful login, for example:
                setLoginMessage('Login successful!'); // + ' ' + response.data.id);
                setErrorMessage(''); // Clear any previous error message
            } else {
                // If the response does not contain valid user data
                setErrorMessage('Invalid username or password.');
            }
        } catch (error) {
            // Check if the error response exists
            if (error.response) {
                // Handle the case where the resource was not found (404)
                if (error.response.status === 404) {
                    setErrorMessage('Invalid username or password.'); // Inform the user
                } else {
                    // Handle other server errors
                    setErrorMessage('Error submitting request: ' + error.message);
                }
            } else {
                // Handle network errors or other non-response related issues
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
                    <Input
                        type="password" placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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
