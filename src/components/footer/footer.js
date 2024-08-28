import React, { useState, useEffect, useRef } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import "./footer.css";
import LoginForm from "../authComponent/adminLogin";

const Footer = () => {
  const [show, setShow] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const timerRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    setClickCount(prevCount => prevCount + 1);
  };

  useEffect(() => {
    if (clickCount === 5) {
      handleShow();
      setClickCount(0); // Reset the click count after showing Offcanvas
    }

    // Set up a timer to reset the click count after 2 seconds
    if (clickCount > 0) {
      timerRef.current = setTimeout(() => setClickCount(0), 2000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [clickCount]);

  return (
    <>
      <footer>
        <div className='grid2'>
          <div className='box'>
            <h1 onClick={handleClick} style={{ cursor: 'pointer' }} >
              Lush & Glow Lotion Store
            </h1>
            <p>
              Shop our premium lotions designed to hydrate, nourish, and rejuvenate your skin, leaving you with a radiant glow.
            </p>
          </div>

          <div className='box'>
            <h2>About Us</h2>
            <ul>
              <li>Careers</li>
              <li>Our Stores</li>
              <li>Our Cares</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className='box'>
            <h2>Customer Care</h2>
            <ul>
              <li>Help Center</li>
              <li>How to Buy</li>
              <li>Track Your Order</li>
              <li>Corporate & Bulk Purchasing</li>
              <li>Returns & Refunds</li>
            </ul>
          </div>
          <div className='box'>
            <h2>Contact Us</h2>
            <ul>
              <li>Tiko, southwest, Fako subdivision, Cameroon</li>
              <li>Email: lushandglowlotionstore@gmail.com</li>
              <li>Phone: +237 671439639</li>
            </ul>
          </div>
        </div>
      </footer>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Lush & Glow Lotion Store</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          
<LoginForm handleClose={handleClose}/>
         
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Footer;
