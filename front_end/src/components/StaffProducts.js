import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StaffProducts () {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `/api/products/`
      );
      setProducts(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  if (products.length === 0) {
    return (
      <div className="error">
        <h3>No matches to given parameters</h3>
      </div>
    );
  }

  return (
    <>
      <div className="list-conteiner">
        <ul>
          {products.map((item, index) => {
            return (
              <li key={item.product_id} className="list-view">
                <img src={item.image} alt={item.name} />
                <p>name: {item.name }</p>
                <p>price: {item.price}</p>
                <p>catgory: {item.category}</p>
                <Link
                  to={`/products/${item.product_id}`}
                  className="btn-primary"
                >
                  Ditails
                </Link>

                <Link
                  to={`/product/${item.order_id}`}
                  className="btn-primary"
                >
                  Update
                </Link>

              </li>
            );
          })}
        </ul>
      </div>
      <div className="seperator" />
    </>
  );
}
