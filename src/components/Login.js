import React, { useState } from 'react';
import { useDatabase } from './database.js';
import '../App.css';
import axios from 'axios';
import Dashboard from './Dashboard.js';
import { Navigate,useNavigate } from 'react-router-dom';

function Login() {
    const { database,posts, addUser } = useDatabase();
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const errors = {
        uname: 'invalid username',
        pass: 'invalid password',
    };

    const isLoggedIn = () => {
        return localStorage.getItem('isLoggedIn') === 'true';
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { uname, pass } = event.target.elements;

        const userData = database.find((user) => user.username === uname.value);

        if (userData) {
            if (userData.password !== pass.value) {
                setErrorMessages({ name: 'pass', message: errors.pass });
            } else {
                setIsSubmitted(true);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', userData.username);
            }
        } else {
            setErrorMessages({ name: 'uname', message: errors.uname });
        }
    };

    const Add_New_Entry = async (event) => {
        event.preventDefault();

        const { uname, pass } = event.target.elements;

        const userData = database.find((user) => user.username === uname.value);

        if (userData) {
            setErrorMessages({ name: 'USER EXISTS', message: errors.uname });
        } else {
            try {
                // Make a POST request to the server to add a new user
                const response = await axios.post('http://192.168.1.12:5000/adduser', {
                    username: uname.value,
                    password: pass.value,
                });

                console.log('User added successfully.');
                setIsSubmitted(true);
            } catch (error) {
                console.error('Error adding user:', error);
            }
        }
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const handleSignUpClick = () => {
        setIsLogin(!isLogin);
    };

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage('uname')}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage('pass')}
                </div>
                <div className="signup-text">
                    <p>New to Reddit? <span onClick={handleSignUpClick} className="signup-link">Sign Up</span></p>
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    const renderSignUp = (
        <div className="form" >
            <form onSubmit={Add_New_Entry}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage('uname')}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage('pass')}
                </div>
                <div className="signup-text">
                    <p>Already a redditor? <span onClick={handleSignUpClick} className="signup-link">Log In</span></p>
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div >
    );

    const LOGIN_FORM = (
        <div className="login-form centered-container centered-content">
            <div className='FORM'>
                <div className="title">Log In</div>
                <div className='heading-form'>
                    Log In
                    By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy
                </div>

                {
                    isSubmitted ? (
                        <div>User is successfully logged in</div>
                    ) : (
                        renderForm
                    )
                }
            </div>
        </div>
    );

    const SIGNUP_FORM = (
        <div className="signup-form centered-container centered-content">
            <div className='FORM'>
                <div className="title">Sign Up</div>
                <div className='heading-form'>
                    Sign In
                    By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy
                </div>

                {renderSignUp}
            </div>
        </div>
    );

    const REDIRECT_TO_DASHBOARD = () => {
        navigate("/dashboard");
    };


return (
    <div className="app">
        {isLoggedIn() ? <Navigate to="/dashboard" /> : (isLogin ? LOGIN_FORM : SIGNUP_FORM)}
    </div>

);  
}

export default Login;
