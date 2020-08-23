import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = ({category, priceRange, name}) => {

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
      console.log(error.toJSON())
    });

  }, []);
  console.log(products);
  return (
    <div>

    </div>
  )
}

export default Products
