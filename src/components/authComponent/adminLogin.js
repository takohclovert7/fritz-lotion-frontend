import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { setDataWithExpiration } from './localStorageUtils';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const LoginForm = ({handleClose}) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state
  const handleSubmit =async (event) => {
    event.preventDefault();
    
    setError('');
    setIsLoading(true); // Set loading state to true when request starts

    try {
        const response = await axios.post('/admin/login', {
            email,
            password,
        });

        if (response.data) {
         
          setIsLoading(false);
          console.log(response.data.token)
          setDataWithExpiration("LotionAdmin",response.data.token,1)
          navigate('/admin/panel');
          handleClose();
        }
    } catch (error) {

        setError(error.response ? error.response.data.message: 'Login failed');
        console.log(error.response.data.message)
        setIsLoading(false);
        handleClose();
    } finally {
        setIsLoading(false); // Set loading state to false when request finishes
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
     
        <Col >
        <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%' }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%' }}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3" style={{ width: '100%' }}>
             {isLoading?"Loggin you in":"Login"} 
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
