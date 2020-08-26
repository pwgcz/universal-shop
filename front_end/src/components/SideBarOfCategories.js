import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SideBarOfCategories({getCategoryName}) {
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
console.log(getCategoryName)
  if(!dataCategories.isFetching){

  }
  return (
    <div className='categoriessidebar'>
    <h3>Product Category</h3>
    <p></p>
      <ul className=''>
          {dataCategories.categories.map(category =>{
            return(  <li key={category.category_id} >
                    <button onClick={getCategoryName} value={category.name}>
                      {category.name}
                    </button>
           </li>)
          })}
        </ul>

    </div>
  )
}
