import React from "react"
import "./productStyles.css"
import ProductStart from './productStart'
const ProductContianer = ({name, products}) => {
  return (
    <>
      <section className='flash'>
        <div style={{marginLeft:"20px",marginRight:"20px"}}>
          <div className='heading f_flex'>
            <i className='fa fa-bolt'></i>
            <h1>{name}</h1>
          </div>
          <ProductStart  products={products} />
        </div>
      </section>
    </>
  )
}

export default ProductContianer