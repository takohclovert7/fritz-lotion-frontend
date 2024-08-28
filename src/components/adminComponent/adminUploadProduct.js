import React,{useState,useEffect} from 'react'
import { getDataWithExpiration } from '../authComponent/localStorageUtils';
import ProductUpload from './productUpload';
export default function AdminUploadProduct() {
    const [isAdminFound,setIsAdminFound]=useState(false)
    useEffect(() => {
        // Retrieve data
        const userData = getDataWithExpiration('LotionAdmin');
        if (userData) {
            setIsAdminFound(true);
            
        } else {
            setIsAdminFound(false);
           
        }
    }, []); // Run effect when location changes
 
    if(!isAdminFound){
        return(
            <div style={{height:"60vh",padding:20}}>
                <center>
                <h3>Error 404 page not found</h3>
                </center>
              
            </div>
        )
    }
  
  return (
    <div>
      <ProductUpload />
    </div>
  )
}
