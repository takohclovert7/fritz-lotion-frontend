import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { getDataWithExpiration } from "../authComponent/localStorageUtils";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Make sure axios is imported
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link} from 'react-router-dom';
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <ArrowRightIcon sx={{ fontSize: 70, transition: '0.5s', color: '#fff', position: "relative", top: "-57%", right: "80%" }} />
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <ArrowLeftIcon sx={{ fontSize: 70, transition: '0.5s', color: '#fff', position: "relative", top: "-57%", right: "100%" }} />
      </button>
    </div>
  );
};

const ProductStart = ({products}) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width <= 685) {
      setSlidesToShow(2); // Mobile view
    } else if (width <= 900) {
      setSlidesToShow(3); // Tablet view
    } else if (width <= 1100) {
      setSlidesToShow(4); // Tablet view
    } else if (width <= 1300) {
      setSlidesToShow(5); // Tablet view
    } else {
      setSlidesToShow(6); // Desktop view
    }
  };

  useEffect(() => {
    console.log()
    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };


  const handleBuyNow =async (product) => {
    setIsLoading(true);
    setShow(true)
     const userData = getDataWithExpiration('FritzUserData');
     if (userData) {
      navigate('/products', { state:product });
      //    try {
      //     const response = await axios.post('/users/place/order', {
      //       productImage:product.itemImage,
      //       productName:product.itemName,
      //       productDescription:product.itemDescription,
      //       productPrice:product.itemPrice,
      //       buyerName:userData.name,
      //       buyerEmail:userData.email
      //     });
      //     if (response.data) {
              
      //       setIsLoading(false);
      //     }
      // } catch (error) {
      //   setShow(false)
      //   setIsLoading(false);
      // } finally {
      //     setIsLoading(false); // Set loading state to false when request finishes
      // }
     } else {
      setShow(false)
         console.log('Data has expired or does not exist.');
         setIsLoading(false);
         navigate('/login'); // Redirect to the home page
     }
  };

  return (
    <div className="product-start-container">
      <Slider {...settings}>
        {products.map((productItem,index) => (
          <div key={index} className="product-card-wrapper">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="product-card">
                <div className="product-image">
                  <img    src={productItem.itemImage} 
        alt={productItem.itemName} 
        style={{ maxWidth: '100%', height: 200 ,objectFit:"fill"}}/>
                </div>
                <h2 className="product-name">{productItem.itemName}</h2>
                <p className="product-description">{productItem.itemDescription}</p>
                <h3 className="product-price">{productItem.itemPrice} FCFA</h3>
                <div className="product-rating">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <button
                  className="add-to-cart-button"
                  onClick={() => handleBuyNow(productItem)}
                >
                 {isLoading?"Placing Order":"BUY NOW"} 
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton={false}>
          <Modal.Title style={{color:isLoading?"red":"green"}}>{isLoading?"Placing order":"Order place successsully"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading?"Please wait while we place your order":
          "you order have being placed successfully you can check log on the invoice section"}

        </Modal.Body>
        {!isLoading &&(
        <Modal.Footer style={{display:"flex",flexDirection:"column"}}>
        <Button variant="primary" onClick={handleClose}>Continue shopping</Button>
        <Button variant="secondary" onClick={handleClose}>
          <Link style={{textDecoration:"none",color:"white"}} to="/invoice" >  Go to invoice</Link>
        
          </Button>
         
       
        </Modal.Footer>)}
      </Modal>
    </div>
    </div>
  );
};

export default ProductStart;
