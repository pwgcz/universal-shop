import React, { useEffect, useState } from 'react';
import Product from './Product'
import axios from 'axios';

const ProductsList = ({category, priceRange, name}) => {

  const [products, setProducts] = useState([])


  const getProducts = () => {
    return axios.get(`/api/products`)
  }

  useEffect(()=>{
    getProducts()
      .then(function (results) {
          setProducts(results.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  }, []);
  console.log(products);
  // TODO: heandle map empty array

  return (
    <section>
      {
          products.map(product => {
          return(
             <Product key={product.product_id} product={product} />
           )
        })
      }

    </section>

  )
}

export default ProductsList
