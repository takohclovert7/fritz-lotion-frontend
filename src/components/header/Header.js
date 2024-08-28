import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';
import { getDataWithExpiration } from '../authComponent/localStorageUtils';

const Header = ({ onLogout }) => {
    const [dataIsStillValid, setDataIsStillValid] = useState(false);
    const location = useLocation();
    const [expanded, setExpanded] = useState(false);
    const navbarRef = useRef(null);

    useEffect(() => {
        // Retrieve data
        const userData = getDataWithExpiration('FritzUserData');
        if (userData) {
            setDataIsStillValid(true);
            console.log('Data is still valid:', userData);
        } else {
            setDataIsStillValid(false);
            console.log('Data has expired or does not exist.');
        }
    }, [location]); // Run effect when location changes

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const activeStyle = {
        color: 'orange',
        fontWeight: 'bold',
    };

    const defaultStyle = {
        color: '#ffffff',
    };

    const isActive = (path) => location.pathname === path;

    return (
        <Navbar
            className="custom-navbar"
            expand="lg"
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
            ref={navbarRef}
        >
            <Navbar.Brand href="/">Lush & Glow Lotion Store
           
            </Navbar.Brand>
            <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className={`custom-toggle ${expanded ? 'expanded' : ''}`}
                onClick={() => setExpanded(!expanded)}
            >
                <MenuIcon style={{ color: '#ffffff' }} />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link
                        as={Link}
                        to="/"
                        className='nav-link'
                        style={isActive('/') ? activeStyle : defaultStyle}
                    >
                        Home
                    </Nav.Link>
                    {/* <Nav.Link
                        as={Link}
                        to="/products"
                        className='nav-link'
                        style={isActive('/products') ? activeStyle : defaultStyle}
                    >
                        Products
                    </Nav.Link> */}
                    <Nav.Link
                        as={Link}
                        to="/invoice"
                        className='nav-link'
                        style={isActive('/invoice') ? activeStyle : defaultStyle}
                    >
                        Invoice
                    </Nav.Link>
                    {!dataIsStillValid ? (
                        <>
                            <Nav.Link
                                as={Link}
                                to="/login"
                                className='nav-link'
                                style={isActive('/login') ? activeStyle : defaultStyle}
                            >
                                Login
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/signup"
                                className='nav-link'
                                style={isActive('/signup') ? activeStyle : defaultStyle}
                            >
                                Signup
                            </Nav.Link>
                        </>
                    ) : (
                        <Nav.Link
                            as={Link}
                            onClick={onLogout}
                            className='nav-link'
                            style={isActive('/logout') ? activeStyle : defaultStyle}
                        >
                            Logout
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
