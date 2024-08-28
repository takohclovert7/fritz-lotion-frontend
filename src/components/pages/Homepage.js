import React from 'react';
import SliderComponent from '../topSlider/slider';
import ProductContianer from '../products/productsContianer';

const HomePage = ({ data, loading, error }) => {
    return (
        <>
            <SliderComponent /> {/* Always render the SliderComponent */}

            {loading && <p>Loading...</p>}
            {error && <p style={{fontSize:20,marginTop:15,marginBottom:15,color:"red"}}>Error: {error}</p>}
            {!loading && !error && data && data.length === 0 && <p>No products available.</p>}

            {/* Conditionally render ProductContianer if data exists and has items */}
            {!loading && !error && data && data.length > 0 && (
                <>
                    <ProductContianer name={"New Arrival"} products={data} />
                    <ProductContianer name={"Most Order"} products={data} />
                </>
            )}
        </>
    );
};

export default HomePage;
