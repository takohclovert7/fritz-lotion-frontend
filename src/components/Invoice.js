// src/components/Invoice.js
import React,{useState,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import ExportToPDF from './invoiceComp/invoiceProductCard';
import Modal from 'react-bootstrap/Modal';
import { getDataWithExpiration } from './authComponent/localStorageUtils';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Make sure axios is imported

const Invoice = () => {

    const navigate = useNavigate(); // Initialize useNavigate
    const [isLoading,setIsLoading]=useState(false)
    const [productObtain,setProductObtain]=useState(null)
    const [errMessage ,setErrorMessage]=useState("")
    const [userDataObtian,setUserDataObtain]=useState("")
    const handleGenerateInvoice =async () => {
        setIsLoading(true)
        const userData = getDataWithExpiration('FritzUserData');
        if (userData) {
            setUserDataObtain(userData)
            setErrorMessage("")
            setProductObtain("")
            try {
                const response = await axios.post('/users/get/invoice/data', {
                    email:userData.email
                   
                });
                if (response.data.products) {
                    setIsLoading(false)
                  
                    setProductObtain(response.data.products)
                }else{
                    setIsLoading(false)
                   
                    setErrorMessage(response.data.message)
                }
            } catch (error) {
                setErrorMessage(error.response.data.message)
                setIsLoading(false)

            } finally {
                setIsLoading(false); // Set loading state to false when request finishes
            }
        } else {
           
            console.log('Data has expired or does not exist.');
            // navigate('/login'); // Redirect to the home page
        }
    };
    useEffect(()=>{
        const userData = getDataWithExpiration('FritzUserData');
        if (userData) {
        } else {
            navigate('/login')   
            
        }
    },[])



    return (
        <div className="text-center mt-5"  style={{height:"50vh"}}>
            <h2>Your Invoice</h2>
           {!productObtain &&( <Button onClick={handleGenerateInvoice} variant="success">Generate Invoice</Button>)}
            {errMessage &&( <div style={{fontWeight:"bold",fontSize:14,color:"red"}}>{errMessage}</div>)}
           {productObtain &&(<ExportToPDF  user={userDataObtian}  data={productObtain}/>)}
           <Modal
        show={isLoading}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton={false}>
          <Modal.Title style={{color:"red",fontWeight:"bold"}}>Generating your invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body  style={{color:"black",fontWeight:"bold"}}>
          please wait your invoice is being generated
        </Modal.Body>
      </Modal>
        </div>
    )
};

export default Invoice;
