import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';




export default function SingleProduct(props) {

  const [singleProduct, setSingleProduct] = useState({product: [], isFetching: true})

  const fetchProduct = async () => {
      try {
          setSingleProduct({product: singleProduct.product, isFetching: true});
          const response = await axios.get(`/api/products/${props.match.params.id}`);
          setSingleProduct({product: response.data, isFetching: false});
      } catch (e) {
          console.log(e);
          setSingleProduct({product: singleProduct.product, isFetching: false});
      }
  };
  useEffect(() => {
        fetchProduct();
    }, []);

  console.log(props.match.params.id);
    console.log(singleProduct);



  if(singleProduct.product.length === 0){
    return (
      <div className='error'>
      <h3>Product not exist</h3>
      <Link to='/products' className='btn-primary'>Go Back</Link>
      </div>
    )
  }
    const {product_id, category, name, price, image} = singleProduct.product
    return(
<section className='single-product'>
  <div className='single-product-info'>
  <article className='image'>
  <img src={image} alt={name}/>
  </article>
  <article className='info'>
  <h1>{name}</h1>
  <div></div>
  <h3>category: {category}</h3>
  <h3>price: {price} zł</h3>

    <Link to='/' className='btn-primary footer'>Add to cart</Link>

  </article>
  </div>
</section>
  )

}
