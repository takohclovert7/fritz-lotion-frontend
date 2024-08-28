import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './slider.css'; // Import custom styles
import lotion1 from '../images/lotion1.jpg'
import lotion2 from "../images/lotion2.jpg"
import lotion3 from "../images/lotion3.jpg"
import lotion4 from "../images/lotion4.jpg"

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,           // Enables automatic sliding
    autoplaySpeed: 2000,      // Slides every 2 seconds
    pauseOnHover: true,       // Pauses sliding on hover
  };
const lotionSlider=[
  {
    id:1,
    title:"Fragrance-infused Body Lotion",
    Description:`A nourishing body lotion for women for smooth skin
Enriched with the goodness of argan oil and vitamin E.
No stickiness, just pure, residue-free satisfaction.
This body cream for women soothes dry skin. 
Infused with a mix of peachy, floral, and sandalwood notes. `,
image:lotion1
  },
  {
    id:2,
    title:"Almond Milk Creamy Body Lotion",
    Description:` Our Almond Milk Body Lotion is now vegan and 
              crafted with 93% natural ingredients, including Community Fair
               Trade organic almond milk and oil from Spain. This creamy lotion 
               absorbs quickly into dry, sensitive skin, providing instant relief 
               and smoothness without being sticky or greasy.
               It also offers 72-hour moisture and a pleasant creamy scent.`,
image:lotion2
  },
  {
    id:3,
    title:"Deep Hydrating Body Lotion",
    Description:`his velvety lotion, enriched with shea butter, almond oil, and aloe vera,
               deeply hydrates and softens your skin, leaving it smooth and radiant.
                It alleviates dryness and
               itchiness, providing a stress-relieving indulgence while
                transforming your skin with daily use.`,
image:lotion3
  },
  {
    id:4,
    title:"L'avenour Shea Butte",
    Description:` L'avenour Shea Butter Moisturizing Body Lotion  Enriched with
               Shea Butter, Vitamin E & Hyaluronic Acid 
                Moisturizer For Men & Women & All Skin Types`,
image:lotion4
  }
]
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {lotionSlider.map((item)=>{
          return(
            <div className="slide"  key={item.id}>
            <div className="slide-content">
              <div className="text-section">
                <h2>{item.title}</h2>
                <p>
                {item.Description}
                </p>
                <Link to="/contact-us">
  <button className="cta-button">Let's Talk</button>
</Link>
              </div>
              <div className="image-section">
                <img src={item.image} alt="Team" />
              </div>
            </div>
          </div>
         
          )
        })}
       
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default SliderComponent;
