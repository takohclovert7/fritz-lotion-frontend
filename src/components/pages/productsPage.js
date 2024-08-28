import React, { useState } from 'react';
import "./pages.css";
import SearchIcon from '@mui/icons-material/Search';

const ProductsPage = () => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        // Add your search logic here
        console.log("Search query:", query);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <div style={{ height: "100vh", marginTop: "50px" }}>
                <h3 style={{ paddingLeft: "10px", fontWeight: "bold", marginBottom: "15px",textAlign:"center" }}>Search for an item</h3>
                <div className='search-box f_flex'>
                    <SearchIcon sx={{
                        fontSize: '40px', // Adjust font size here
                        opacity: 0.5,
                        alignSelf: "center",
                        marginLeft: "15px",
                        marginRight: "1px"
                    }} />
                    <input
                        type='text'
                        placeholder='Search and hit enter...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <span onClick={handleSearch}>Search</span>
                </div>
            </div>
        </>
    );
};

export default ProductsPage;
