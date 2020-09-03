import React, { useState, useEffect } from 'react';
import Product from './Product'
import axios from 'axios';


export default function FilteredProducts({categoryName, priceRange}) {

  const [dataProducts, setDataProducts] = useState({products: [], isFetching: true})

  const fetchProducts = async () => {
      try {
          setDataProducts({products: dataProducts.products});
          const response = await axios.get(`/api/products?category=${categoryName}&max_price=${priceRange.maxPrice}&min_price=${priceRange.minPrice}`);
          setDataProducts({products: response.data.results, isFetching: false});
      } catch (e) {
          console.log(e);
          setDataProducts({products: dataProducts.products, isFetching: false});
      }
  };
  useEffect(() => {
        fetchProducts();
    }, [categoryName, priceRange]);

  
  if(dataProducts.products.length === 0){
    return(
      <div className='error'>
        <h3>No matches to given parameters</h3>
      </div>
    )
  }

  let filteredProducts = dataProducts.products.map(item => {
        return (<Product key={item.product_id} product={item} />)
      })

  return (
    <section className='productgroup'>
      <div className='productgroup-center'>
        {filteredProducts}
      </div>
    </section>
  )
}
