import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CategorySelectBox({ onChange }) {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/categories/`);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (categories.length === 0) {
    return <></>;
  }
  return (
    <>
      <label htmlFor="category">Category</label>
      <select className="select-category" name="category" onChange={onChange}>
        {categories.map((item) => {
          return (
            <option value={item.name} key={item.category_id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
