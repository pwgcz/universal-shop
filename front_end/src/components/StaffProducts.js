import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Paginator from '../components/Paginator';
import RowInList from './RowInList';

export default function StaffProducts () {
  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [count, setCount] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `/api/products/?page=${activePage}`
      );
      setProducts(response.data.results);
      setCount(response.data.count)
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [activePage]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }
  async function handleDelete (event) {
    event.preventDefault();
    let id = event.target.value;
    try {
      const response = await axios.delete(`api/staff/products/${id}/`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      fetchProducts();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

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
                <RowInList title='Name:' content={item.name} />
                <RowInList title='Price:' content={item.price} />
                <RowInList title='Category:' content={item.category} />
                <Link
                  to={`/products/${item.product_id}`}
                  className="btn-primary"
                >
                  Details
                </Link>

                <Link
                  to={`/product-form-update/${item.product_id}`}
                  className="btn-primary"
                >
                  Update
                </Link>
                <button value={item.product_id} className='btn-primary' onClick={handleDelete}>Delete</button>

              </li>
            );
          })}
        </ul>
      </div>

      <div className="seperator" />
      <Paginator activePage={activePage} count={count} handlePageChange={handlePageChange} />
    </>
  );
}
