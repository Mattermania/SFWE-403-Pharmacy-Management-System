import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import {FormContainer,Form,Button,Input,LinkText,AnimationContainer} from './styles/LoginFormStyles';
import Lottie from 'lottie-react';
import pharmacyAnimation from './animations/pharmacy_animation.json'; 

const LoginForm = () => {
    const[username, setUsername ] =useState('');
    const[password, setPassword] = useState('');
    //const[successfulLoginMessage, setLoginMessage] = useState('');
    const[errorMessage,setErrorMessage] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        if (username === 'admin' && password === 'admin') {
            //setLoginMessage('Login successful!');
            // Redirect or change state to show logged-in UI
        } else {
            setErrorMessage('Invalid username or password.');
        }

    };

    return(
        <FormContainer>
            <AnimationContainer>
                <Lottie animationData ={pharmacyAnimation} loop ={false} speed={0.25} />
            </AnimationContainer>
            <Form onSubmit={handleLogin}>
                <label> Enter Username:
                    <Input
                        type = "text" placeholder='username/email'
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                    >

                    </Input>
                </label>
                <label> Enter Password:
                    <Input
                    type = "password" placeholder='password'
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}>
                    </Input>

                </label>
            {errorMessage && (
                <p style={{ color: 'red' }}>{errorMessage}</p>
            )}
                <Button type = "submit" >
                    Login
                </Button>
                <LinkText to ="/signup">
                    <Button type = "button">
                        Signup
                    </Button>
                </LinkText>
                <LinkText to = "/forgotpassword" >
                    Forgot password?
                </LinkText>
                
            </Form>
        </FormContainer>
    )
    
}
export default LoginForm;


