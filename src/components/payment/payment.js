import React, { useState, useEffect } from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { getDataWithExpiration } from '../authComponent/localStorageUtils';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal'; // Import Modal
import Button from 'react-bootstrap/Button'; // Import Button
import axios from 'axios'; // Make sure axios is imported
import './PaymentMethodSelector.css'; // Import your CSS file

const PaymentMethodSelector = () => {
  const location = useLocation();
  const product = location.state || {};
  const [selectedMethod, setSelectedMethod] = useState('');
  const [number, setNumber] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSaveOrder = async (product) => {
    setIsLoading(true);
    setShow(true);
    const userData = getDataWithExpiration('FritzUserData');
    if (userData) {
      try {
        const response = await axios.post('https://fritz-lotion-backend.onrender.com/users/place/order', {
          productImage: product.itemImage,
          productName: product.itemName,
          productDescription: product.itemDescription,
          productPrice: product.itemPrice,
          buyerName: userData.name,
          buyerEmail: userData.email,
        });
        if (response.data) {
          setIsLoading(false);
        }
      } catch (error) {
        setShow(false);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setShow(false);
      console.log('Data has expired or does not exist.');
      setIsLoading(false);
      navigate('/');
    }
  };

  useEffect(() => {
    const userData = getDataWithExpiration('FritzUserData');
    if (userData) {
      setUser(userData);
    } else {
      navigate('/login');
    }
  }, []);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setNumber('');
    setResponseMessage('');
  };

  const handleClose = () => {
    setShow(false);
  };

  const config = {
    public_key: 'FLWPUBK-74fb5367d3ec42043e2342c0065b7eba-X', // Replace with your Flutterwave public key
    tx_ref: Date.now(),
    amount: product.itemPrice,
    currency: 'XAF', // Central African CFA franc for Cameroon
    payment_options: 'mobilemoneycm',
    customer: {
      email: user.email,
      phonenumber: number,
      name: user.name,
    },
    customizations: {
      title: 'Payment for Product',
      description: 'Payment for your order',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay Now',
    className: 'custom-flutterwave-button', // Apply custom styles
    callback: (response) => {
      if (response.status === 'successful') {
        setResponseMessage('Payment successful!');
        handleSaveOrder(product);
      } else {
        setResponseMessage('Payment failed. Please try again.');
        toast.error('Payment failed. Please try again.');
      }
      closePaymentModal(); // Close modal after payment
    },
    onClose: () => {
      console.log('Payment modal closed');
    },
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <h2>Select Payment Method</h2>
      <div style={styles.buttonContainer}>
        <button
          style={selectedMethod === 'MTN Mobile Money' ? styles.selectedButton : styles.button}
          onClick={() => handleMethodChange('MTN Mobile Money')}
        >
          MTN Mobile Money
        </button>
        <button
          style={selectedMethod === 'Orange Money' ? styles.selectedButton : styles.button}
          onClick={() => handleMethodChange('Orange Money')}
        >
          Orange Money
        </button>
      </div>
      {selectedMethod && (
        <>
          <div style={styles.inputContainer}>
            <label>Enter Your Number:</label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter your mobile number"
              style={styles.input}
            />
          </div>
          <FlutterWaveButton {...fwConfig} />
        </>
      )}
      {responseMessage && <p>{responseMessage}</p>}

      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton={false}>
          <Modal.Title
            style={{ color: isLoading ? 'red' : 'green' }}
          >
            {isLoading ? 'Placing order' : 'Order placed successfully'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading
            ? 'Please wait while we place your order'
            : 'Your order has been placed successfully. You can check the invoice section.'}
        </Modal.Body>
        {!isLoading && (
          <Modal.Footer style={{ display: 'flex', flexDirection: 'column' }}>
            <Button variant="primary" onClick={handleClose}>
              Continue shopping
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to="/invoice"
              >
                Go to invoice
              </Link>
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
  selectedButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    border: '1px solid #ccc',
  },
};

export default PaymentMethodSelector;
