import React, { useEffect, useState } from 'react';
import axios from 'axios';




const Products = () => {

  const [products, setProducts] = useState([])

  useEffect(()=>{
    axios.get(`/api/products`)
    .then((res)=>{
      setProducts(res.data.results)
    })
  }, []);

  console.log({products});
  return (
    <div>
    product
    </div>
  )
}

export default Products
