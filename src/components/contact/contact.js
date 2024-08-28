import React, { useState } from 'react';
import './ContactUs.css';
import { Phone, Email, WhatsApp ,Close} from '@mui/icons-material';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'; // Make sure axios is imported
const ContactUs = () => {
  const [activeOption, setActiveOption] = useState(null);
  const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSendMessageClick = () => {
    setActiveOption('message');
  };

  const handleCallSalesClick = () => {
    setActiveOption('call');
  };

  const handleWhatsAppClick = () => {
    setActiveOption('whatsapp');
    const phoneNumber = '+237671439639';
    const message = 'Hello, I am interested in your services.';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =async (e) => {
    setError("");
    setIsLoading(true)
    e.preventDefault();

    console.log(formData)
    try {
      const response = await axios.post('https://fritz-lotion-backend.onrender.com/send-email', formData);

      if (response.data) {
        setFormData({ name: '', email: '', message: '' });
          setIsLoading(false)
          setError("Email send successfully");
           }
  } catch (error) {
      setError(error.response ? error.response.data.message : 'Email send failed');
      setIsLoading(false);
  } finally {
      setIsLoading(false); // Set loading state to false when request finishes
  }
  
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Let's talk about your website or project. Send us a message and we will be in touch within one business day.</p>
      
      <div className="interest-section">
        <h2>Are you interested in getting your body lotion?</h2>
        
        <div className="contact-options">
          <div 
            className={`contact-option ${activeOption === 'call' ? 'active' : ''}`} 
            onClick={handleCallSalesClick}
          >
            <Phone className="icon" />
            <div className="contact-info">
              <h3>Call Sales</h3>
              <p>+237 671439639</p>
            </div>
          </div>
          
          <div 
            className={`contact-option ${activeOption === 'message' ? 'active' : ''}`} 
            onClick={handleSendMessageClick}
          >
            <Email className="icon" />
            <div className="contact-info">
              <h3>Send us a message</h3>
            </div>
          </div>
          
          <div 
            className={`contact-option ${activeOption === 'whatsapp' ? 'active' : ''}`} 
            onClick={handleWhatsAppClick}
          >
            <WhatsApp className="icon" />
            <div className="contact-info">
              <h3>WhatsApp us</h3>
            </div>
          </div>
        </div>
        
        {activeOption === 'message' && (
          <div className="contact-form">
             <span onClick={()=>{ setActiveOption(null);}}><Close  sx={{fontSize:40}}/></span>
            <h3>Send us a message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Reason for contacting us</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Enter your reason for contacting us" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Enter your message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <p  style={{color:error==="Email send successfully"?"green":"red",fontWeight:"bold"}}>{error}</p>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
           
          </div>
        )}
      </div>
      <Modal
        show={isLoading}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton={false}>
          <Modal.Title style={{color:"red",fontWeight:"bold"}}>Sending your message</Modal.Title>
        </Modal.Header>
        <Modal.Body  style={{color:"black",fontWeight:"bold"}}>
          please wait we are sedning your message now
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ContactUs;
