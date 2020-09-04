import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {UserContext} from '../contexts/UserContext'
import { useHistory } from "react-router-dom";

export default function SingleProduct(props) {
  const {user} = useContext(UserContext);
  const [singleProduct, setSingleProduct] = useState({product: [], isFetching: true})
  const history = useHistory();

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

    const addOrderItem = async () => {
      try {
          const response = await axios.post(`/api/order-item/`,JSON.stringify(
            {
              product: parseInt(props.match.params.id),
            }
          )
            , {
            headers: {
                'Authorization': "JWT " + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
                'accept': 'application/json'
          }
          })
          history.push("/products");

      } catch (e) {
          console.log(e);
        }
    };
    const addToCart = async () => {
      try {
           await axios.post(`/api/cart-items/`,JSON.stringify(
            {
              product: parseInt(props.match.params.id),
              users: [parseInt(user.id)]
            }
          )
            , {
            headers: {
                'Authorization': "JWT " + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
                'accept': 'application/json'
          }
          })
          history.push("/products");

      } catch (e) {
          console.log(e);
        }
    };


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
  <p></p>
  <h3>category: {category}</h3>
  <h3>price: {price} zł</h3>
    <div className='buttons'>
    <button onClick={addToCart} className='btn-primary footer'>Add to cart</button>
    <Link to='/products' className='btn-primary footer'>Go back shopping</Link>
    </div>
  </article>
  </div>
</section>
  )

}
