import React, { useState, useEffect } from 'react';
import { getDataWithExpiration } from '../authComponent/localStorageUtils';
import DataTable from './dataTable';
import axios from 'axios';

export default function AdminSeeAllOrders() {
    const [isAdminFound, setIsAdminFound] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

    const fetchData = async (userData) => {
        setLoading(true); // Set loading to true when fetching starts
        try {
            const response = await axios.get('/admin/see/all/orders', {
                headers: {
                    Authorization: userData, // Assuming Bearer token is used
                },
            });
            setData(response.data.documents);
            setError(null); // Clear any previous errors
        } catch (err) {
            setError(err.message || 'An error occurred'); // Set error message
        } finally {
            setLoading(false); // Set loading to false when fetching ends
        }
    };

    useEffect(() => {
        // Retrieve data
        const userData = getDataWithExpiration('LotionAdmin');
        if (userData) {
            setIsAdminFound(true);
            fetchData(userData);
        } else {
            setIsAdminFound(false);
        }
    }, []); // Run effect when component mounts

    if (loading) {
        return (
            <div style={{ height: "60vh", padding: 20 }}>
                <center>
                    <h3>Loading...</h3>
                </center>
            </div>
        );
    }

    if (!isAdminFound) {
        return (
            <div style={{ height: "60vh", padding: 20 }}>
                <center>
                    <h3>Error 404 page not found</h3>
                </center>
            </div>
        );
    }

    return (
        <div>
            <h4 style={{ color: 'gray', textAlign: 'center', marginTop: 20, marginBottom: 30 }}>
                See All Orders Placed
            </h4>
            <div style={{ marginTop: 30, marginBottom: 70 }}>
                {data.length < 1 ? (
                    <div>No orders have been placed.</div>
                ) : (
                    <DataTable data={data} /> // Pass data to DataTable
                )}
                {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
            </div>
        </div>
    );
}
