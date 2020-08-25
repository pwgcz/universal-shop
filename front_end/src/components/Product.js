import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Product({product}) {

  const {product_id, category, name, price, image} = product
  return (
    <article className='product'>
      <div className='img-container'>
        <img src={image} alt='Product' />
        <div className='price-top'>
          <h6>{price} zł</h6>
        </div>
        <Link to={`/products/${product_id}`} className="btn-primary product-link">{name}</Link>
      </div>
      <p className='product-info'>
        {name}
      </p>
    </article>
  )
}

Product.propTypes = {
  product:PropTypes.shape(
    {
      product_id:PropTypes.number.isRequired,
      category:PropTypes.arrayOf(PropTypes.string),
      name:PropTypes.string.isRequired,
      price:PropTypes.number.isRequired,
      image:PropTypes.string.isRequired,
    }
  )
}
