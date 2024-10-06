import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const[username, setUsername ] =useState('');
    const[password, setPassword] = useState('');


    const handleLogin = (event) => {
        event.preventDefault();
        console.log('Login attempted with username:', username, 'and password:', password);
    };
    
    return(
        <div style={{display: 'flex', justifyContent: 'center',marginTop : '2rem'}}>
            <form onSubmit={handleLogin}>
                <label> Enter Username:
                    <input
                        type = "text" 
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                        style={{marginBottom: '1rem',padding :'0.5rem',width : '100%'}}
                    >

                    </input>
                </label>
                <label> Enter Password:
                    <input
                    type = "password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    style={{marginBottom : '1rem',padding :'0.5rem', width :"100%"}}>
                    </input>

                </label>
                <button type = "submit" 
                style ={{padding :'0.5rem 1rem'}}>
                    Login
                </button>
                <Link to ="/signup">
                    <button type = "button" style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}>
                        Signup
                    </button>
                </Link>
                <Link to = "/forgotpassword" style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}>
                    Forgot password?
                </Link>
            </form>
        </div>
    )
    
}
export default LoginForm;


