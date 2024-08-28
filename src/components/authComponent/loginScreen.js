import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';
import { setDataWithExpiration } from './localStorageUtils';
import { Link } from 'react-router-dom';
const LoginScreen = () => {
    const [isEmailInputFocus, setIsEmailInputFocus] = useState(false);
    const [isPasswordInputFocus, setIsPasswordInputFocus] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const navigate = useNavigate(); // Initialize useNavigate
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents the default form submission
        setError('');
        setIsLoading(true); // Set loading state to true when request starts

        try {
            const response = await axios.post('/users/login', {
                email,
                password,
            });

            if (response.data) {
                setIsLoading(false);
                setDataWithExpiration('FritzUserData', { email: response.data.user.email,name:response.data.user.name }, 1);
                navigate('/'); // Redirect to the home page
            }
        } catch (error) {
            setError(error.response ? error.response.data.error : 'Login failed');
            setIsLoading(false);
        } finally {
            setIsLoading(false); // Set loading state to false when request finishes
        }
    };

    return (
        <div className="login-container">
           
                <>
                    <div className="left-image">
                        <div className="welcome-message">
                            <h3>Lush & Glow Lotion Store!👋</h3>
                            <p>
                            Shop our premium lotions designed to 
                            hydrate, nourish, and rejuvenate your skin, leaving you with a radiant glow. </p>
                        </div>
                    </div>
                    <div className="login-form">
                        <div className="form-container">
                            <h3 className='h3'>Lush & Glow Lotion Store!</h3>
                            <h2>Welcome Back!</h2>
                            <div className="signup-link">
                                <p>Don't have an account?
                                    <Link to="/signup"> Create a new account now</Link><br />
                                    it's FREE!! Takes less than a minute
                                </p>
                            </div>
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        required
                                        className={isEmailInputFocus ? "focusInput" : "inputNotFocus"}
                                        onFocus={() => setIsEmailInputFocus(true)}
                                        onBlur={() => setIsEmailInputFocus(false)}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        className={isPasswordInputFocus ? "focusInput" : "inputNotFocus"}
                                        onFocus={() => setIsPasswordInputFocus(true)}
                                        onBlur={() => setIsPasswordInputFocus(false)}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <div className="error-message" style={{color:"red",fontWeight:"bolder"}}>{error}</div>}
                                <button type="submit" className="login-button" disabled={isLoading}>
                                    {isLoading ? (
                                        <span >trying to loggin</span> // Add a spinner or loading indicator
                                    ) : (
                                        'Login Now'
                                    )}
                                </button>
                                <div className="forgot-password">
                                    <p>Forget password?
                                        <a href="#"> Click here</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            
        </div>
    );
};

export default LoginScreen;
