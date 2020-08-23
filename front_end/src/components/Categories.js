import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {

  const [categories, setCategories] = useState([])

  const getCategories = () => {
    return axios.get(`/api/categories/`)
  }

  useEffect(()=>{
     getCategories()
  .then(function (results) {

    setCategories(results.data);
    })
    .catch(function (error) {
      console.log(error)
    });
  }, []);
  console.log(categories)
  return (
    <div>

    </div>
  )
}

export default Categories
