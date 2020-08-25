import React, { useState, useEffect } from 'react';
import Product from './Product'
import axios from 'axios';

export default function FilteredProducts({category, priceRange, name}) {

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

  console.log(dataProducts);
  if(dataProducts.products.lenght === 0){
    return(
      <div className=''>
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
