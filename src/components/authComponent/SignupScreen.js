import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is imported
import './Login.css';
import { Link } from 'react-router-dom';
import { setDataWithExpiration } from './localStorageUtils';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignupScreen = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [isEmailInputFocus, setIsEmailInputFocus] = useState(false);
    const [isPasswordInputFocus, setIsPasswordInputFocus] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [isSignup, setIsSigningUp] = useState(false);

    // Add states for name, email, and password
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function signup(event) {
        event.preventDefault(); // Prevent the default form submission
        setError('');
        try {
            setIsSigningUp(true); // Set the signup state to true while signing up
            const response = await axios.post('https://fritz-lotion-backend.onrender.com/users/signup', {
                name, // Include name in the request body
                email,
                password,
            });
            setResponseData(response.data.user);

            // Clear inputs on successful signup
            setName('');
            setEmail('');
            setPassword('');
            setDataWithExpiration('FritzUserData', { email: response.data.user.email,name:response.data.user.name }, 1);
            navigate('/'); // Redirect to the home page
        } catch (err) {
            setError(err.response.data.error);
        } finally {
            setIsSigningUp(false); // Reset the signup state after the request completes
        }
    }

    return (
        <div className="login-container">
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
                    <h3 className='h3'>New to Lush & Glow Lotion Store
                      <p style={{fontWeight:"bolder",color:"orange"}}>Sign up</p>
                    </h3>
                   

                    <form onSubmit={signup}> 
                        <div className="form-group">
                            <label>Name</label>
                            <input 
                                type="text" 
                                placeholder="Enter name" 
                                value={name} // Bind state to input value
                                onChange={(e) => setName(e.target.value)} // Update state on change
                                required 
                                className={isEmailInputFocus ? "focusInput" : "inputNotFocus"}
                                onFocus={() => setIsEmailInputFocus(true)}
                                onBlur={() => setIsEmailInputFocus(false)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input 
                                type="email" 
                                placeholder="Enter email" 
                                value={email} // Bind state to input value
                                onChange={(e) => setEmail(e.target.value)} // Update state on change
                                required 
                                className={isEmailInputFocus ? "focusInput" : "inputNotFocus"}
                                onFocus={() => setIsEmailInputFocus(true)}
                                onBlur={() => setIsEmailInputFocus(false)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} // Bind state to input value
                                onChange={(e) => setPassword(e.target.value)} // Update state on change
                                required 
                                className={isPasswordInputFocus ? "focusInput" : "inputNotFocus"}
                                onFocus={() => setIsPasswordInputFocus(true)}
                                onBlur={() => setIsPasswordInputFocus(false)}
                            />
                        </div>
                        {responseData && <div className="response-message" style={{ color: "green", fontWeight: "bold" }}>Signup successful!</div>}
                        {error && <div className="error-message" style={{ color: "red", fontWeight: "bold" }}>Error Occur: {error}</div>}
                        <button type="submit" className="login-button" disabled={isSignup}>
                            {isSignup ? 'Signing up...' : 'Sign up Now'}
                        </button>
                       
                        <div className="forgot-password">
                            <p>Have an account? <Link to="/login">Login Now</Link></p>
                        </div>
                    </form>
              
                </div>
            </div>
        </div>
    );
};

export default SignupScreen;
