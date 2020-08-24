import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [dataCategories, setDataProducts] = useState({categories: [], isFetching: true})

  const fetchProducts = async () => {
      try {
          setDataProducts({categories: dataCategories.categories});
          const response = await axios.get(`/api/categories`);
          setDataProducts({categories: response.data.results, isFetching: false});
      } catch (e) {
          console.log(e);
          setDataProducts({categories: dataCategories.categories, isFetching: false});
      }
  };
  useEffect(() => {
        fetchProducts();
    }, []);
  console.log(dataCategories)
  return (
    <div>

    </div>
  )
}

export default Categories
