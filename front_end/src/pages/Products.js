import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const getProducts = () => {
    return axios.get(`/api/products/`)
  }

  const getCategories = () => {
    return axios.get(`/api/categories/`)
  }

  const handleErrors = (err) =>{
    if (err.response){
        console.log('response error')
    }else if(err.request){
        console.log('request error')
    } else {
        console.log('error')
    }
  };

  useEffect(()=>{
    Promise.all([getProducts(), getCategories()])
  .then(function (results) {
    setProducts(results[0].data);
    setCategories(results[1].data);
    })
    .catch(handleErrors);

  }, []);

  console.log(products);
  console.log(categories);
  return (
    <div>
    products
    </div>
  )
}

export default Products
