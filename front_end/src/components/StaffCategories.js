import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StaffCategories () {
  const [categories, setCategories] = useState([]);

  const fetchOrderss = async () => {
    try {
      const response = await axios.get(
        `/api/categories/`
      );
      setCategories(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchOrderss();
  }, []);

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
                <button className='btn-primary'>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="seperator" />
    </>
  );
}
