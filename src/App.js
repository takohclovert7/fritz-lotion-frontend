import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from './components/header/Header';
import Invoice from './components/Invoice';
import LoginScreen from './components/authComponent/loginScreen';
import SignupScreen from './components/authComponent/SignupScreen';
import HomePage from './components/pages/Homepage';
import './App.css';  // Make sure to import your CSS file
import Footer from './components/footer/footer';
import ProductsPage from './components/pages/productsPage';
import ContactUs from './components/contact/contact';
import { logout } from './components/authComponent/localStorageUtils';
import OrderProduct from './components/order/orderProduct';
import AdminPanel from './components/adminComponent/adminPanel';
import axios from 'axios';
import PaymentMethodSelector from './components/payment/payment';

// Authentication check function
const isAuthenticated = () => {
    return !!localStorage.getItem('FritzUserData');
};

const App = () => {
    const handleLogout = () => {
        logout(); // Clear localStorage on logout
        window.location.href = '/login'; // Redirect to login page
    };

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://fritz-lotion-backend.onrender.com/get/all/products')
          .then(response => {
            setData(response.data.items);
            setLoading(false);
          })
          .catch(err => {
            setError("Network error failed to load product");  
            setLoading(false);
          });
      }, []);

    return (
        <Router>
            <div id="root">
                <Header onLogout={handleLogout} />
                <main>
                    <Routes>
                        <Route 
                            path="/" 
                            element={<HomePage data={data} loading={loading} error={error} />} 
                        />
                        <Route path="/products" element={<PaymentMethodSelector />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/signup" element={<SignupScreen />} />
                        <Route path="/admin/panel" element={<AdminPanel />} />
                        <Route path="/invoice" 
                            element={<Invoice /> } 
                        />
                        <Route 
                            path="/order" 
                            element={isAuthenticated() ? <OrderProduct /> : <Navigate to="/login" />} 
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
