import React, { useEffect, useState } from "react";
import axios from "axios";
import DropDown from './Dropdown';

export default function CategoriesDropdown ({ getCategoryName, isOpen }) {
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/categories/`);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  if (categories.length === 0) {
    return (
      <div className="category">
        <h3>There is no Categoryies</h3>
        <p></p>
      </div>
    );
  }
  return (
    <div className="category">
      <DropDown name='Category'>
        <ul>
          <li>
            <button onClick={getCategoryName} value=''>
              All
            </button>
          </li>
          {categories.map((category) => {
            return (
              <li key={category.category_id} >
                <button type='button' onClick={getCategoryName} value={category.name}>
                  {category.name}
                </button>
              </li>
            );
          })}
        </ul>
      </DropDown>

    </div>
  );
}
