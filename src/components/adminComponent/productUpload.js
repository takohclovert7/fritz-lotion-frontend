import React, { useState, useRef } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { getDataWithExpiration } from '../authComponent/localStorageUtils';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const ProductUpload = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [itemDescription, setItemDescription] = useState(''); // Added state for description
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setItemImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const formData = {
      itemName,
      itemPrice,
      itemImage,
      itemDescription, // Include description in the form data
    };

    const userData = getDataWithExpiration('LotionAdmin');
    if (userData) {
      try {
        const response = await axios.post('/admin/dashboard', formData, {
          headers: {
            Authorization: userData,
          },
        });
        console.log(response.data);

        // Clear input fields
        setItemName('');
        setItemPrice('');
        setItemImage('');
        setItemDescription(''); // Clear description
        fileInputRef.current.value = ''; // Reset the file input

        // Set success message and hide modal after 1.5 seconds
        setSuccessMessage('Item uploaded successfully!');
        setIsLoading(false);
        setTimeout(() => {
          setIsLoading(false); // Hide modal
        }, 1500);
      } catch (err) {
        setErrorMessage(err.response ? err.response.data : 'An error occurred');
        setIsLoading(false);
      }
    } else {
      setErrorMessage('User data is missing or expired. Please log in again.');
      setIsLoading(false);
    }
  };

  return (
    <Container style={{marginBottom:30}}>
      <h4 style={{ color: 'gray', textAlign: 'center', marginTop: 20, marginBottom: 30 }}>
        Upload A New Product
      </h4>
      <Form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <Form.Group controlId="itemName">
          <Form.Label style={{ fontWeight: 'bold' }}>Item Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="itemPrice">
          <Form.Label style={{ fontWeight: 'bold' }}>Item Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter item price"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="itemDescription">
          <Form.Label style={{ fontWeight: 'bold' }}>Item Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter item description"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="itemImage">
          <Form.Label style={{ fontWeight: 'bold' }}>Item Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            required
          />
          {itemImage && (
            <div style={{ marginTop: '10px' }}>
              <img
                src={itemImage}
                alt="Item Preview"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          )}
        </Form.Group>

        {/* Error message display */}
        {errorMessage && (
          <Alert variant="danger" style={{ marginTop: '10px' }}>
            {errorMessage}
          </Alert>
        )}

        {/* Success message display */}
        {successMessage && (
          <Alert variant="success" style={{ marginTop: '10px' }}>
            {successMessage}
          </Alert>
        )}

        <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
          Submit
        </Button>
      </Form>

      <Modal
        show={isLoading && !successMessage}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton={false}>
          <Modal.Title style={{ color: 'red' }}>
            {successMessage ? 'Item uploaded successfully!' : 'Uploading new product'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage ? 'The item has been successfully uploaded.' : 'Saving product to the database...'}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductUpload;
