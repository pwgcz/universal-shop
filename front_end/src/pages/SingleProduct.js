import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert';
import QuantityInput from '../components/QuantityInput';

export default function SingleProduct (props) {
  const { user } = useContext(UserContext);
  const [singleProduct, setSingleProduct] = useState({
    product: [],
    isFetching: true
  });
  const [productCartQuantity, setProductCartQuantity] = useState(1)
  const [postError, setPostError] = useState({})
  const history = useHistory();

  const fetchProduct = async () => {
    try {
      setSingleProduct({ product: singleProduct.product, isFetching: true });
      const response = await axios.get(
        `/api/products/${props.match.params.id}`
      );
      setSingleProduct({ product: response.data, isFetching: false });
    } catch (e) {
      console.log(e);
      setSingleProduct({ product: singleProduct.product, isFetching: false });
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);


  const alerts = useAlert()

  const patchCartItem = async () => {
    try {
      await axios.patch(
        `/api/cart-items/${postError.itemCartId}/`,
        JSON.stringify({
          quantity: postError.quantity
        }),
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      history.push("/products");
    } catch (error) {
      console.log(error);
    }
  }

  const addToCart = async () => {
    try {
      await axios.post(
        `/api/cart-items/`,
        JSON.stringify({
          product: parseInt(props.match.params.id),
          users: [parseInt(user.id)],
          quantity: productCartQuantity
        }),
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      history.push("/products");
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        alerts.show('you must login to add item to cart', {
          timeout: 0,
          type: 'info'
        })
      } else if (error.response.data.message === 'product is in cart') {
        try {
          await axios.patch(
            `/api/cart-items/${error.response.data.cart_item_id}/`,
            JSON.stringify({
              quantity: error.response.data.quantity
            }),
            {
              headers: {
                Authorization: "JWT " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
                accept: "application/json",
              },
            }
          );
          history.push("/products");
        } catch (error) {
          console.log(error);
        }
        try {
          await axios.patch(
            `/api/products/${props.match.params.id}/`,
            {
              quantity: -error.response.data.quantity
            },
            {
              headers: {
                Authorization: "JWT " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
                accept: "application/json",
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
    try {
      await axios.patch(
        `/api/products/${props.match.params.id}/`,
        {
          quantity: -productCartQuantity
        },
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  if (singleProduct.product.length === 0) {
    return (
      <div className="error">
        <h3>Product not exist</h3>
        <Link to="/products" className="btn-primary">
          Go Back
        </Link>
      </div>
    );
  }
  const { product_id, category, name, price, image, quantity, description } = singleProduct.product;
  return (
    <>
      <section className="single-product">
        <div className="single-product-info">
          <article className="image">
            <img src={image} alt={name} />
          </article>
          <article className="info">
            <h1>{name}</h1>
            <p />
            <h3>category: {category}</h3>
            <h3>price: {price} zł</h3>
            <h3>availability: {quantity}</h3>
            <QuantityInput quantityValue={quantity => setProductCartQuantity(quantity)} />
            <div className="buttons">
              {quantity >= 1 ?
                <button onClick={addToCart} className="btn-primary footer">
                  Add to cart
                </button>
                :
                <h3>
                product is unapproachable
                </h3>
              }
              <Link to="/products" className="btn-primary footer">
                Go back shopping
              </Link>
            </div>
          </article>
          <article className="description">
            <h3>Description</h3>
            {description}
          </article>
        </div>
      </section>

    </>
  );
}
