import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Paginator from '../components/Paginator';

export default function StaffCategories () {

  const [categories, setCategories] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [count, setCount] = useState(0);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `/api/categories?page=${activePage}`
      );
      setCategories(response.data);
      setCount(response.data.length);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [activePage]);


  async function handleDelete (event) {
    event.preventDefault();
    let id = event.target.value;
    try {
      const response = await axios.delete(`api/staff/categories/${id}/`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      fetchCategories();
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  if (categories.length === 0) {
    return (
      <div className="error">
        <h3>There is no Category added</h3>
      </div>
    );
  }


  return (
    <>
      <div className="list-conteiner">
        <ul>
          {categories.map((item, index) => {
            return (
              <li key={item.category_id} className="list-view">
                <p>name: {item.name} </p>
                <button value={item.category_id} onClick={handleDelete} className='btn-primary'>Delete</button>
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
