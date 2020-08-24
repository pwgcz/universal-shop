import React, { useState, useEffect } from 'react';
import Product from './Product'
import axios from 'axios';

export default function ProductsList({category, priceRange, name}) {

  const [dataProducts, setDataProducts] = useState({products: [], isFetching: true})

  const fetchProducts = async () => {
      try {
          setDataProducts({products: dataProducts.products});
          const response = await axios.get(`/api/products`);
          setDataProducts({products: response.data.results, isFetching: false});
      } catch (e) {
          console.log(e);
          setDataProducts({products: dataProducts.products, isFetching: false});
      }
  };
  useEffect(() => {
        fetchProducts();
    }, []);


  let products = (param) => {
    return(
      param.map(item => {
        return (<Product key={item.product_id} product={item} />)
      })
    )
  }
  console.log(dataProducts);
  return (
    <div>
      {dataProducts.isFetching ? 'Loading ...' :  products(dataProducts.products)}
    </div>
  )
}
