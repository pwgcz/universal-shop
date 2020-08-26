import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilteredProducts from './FilteredProducts';
import PriceFilter from './PriceFilter';
import SideBarOfCategories from './SideBarOfCategories';
import Title from './Title'


export default function ProductConteiner() {

  const [priceRange, setPriseRange] = useState({maxPrice:'', minPrice:''})
  const [categoryName, setCategoryName] = useState('')

  const getPriceRange =(event) =>{
    let tempRangeOfPrice = event.target.value.split(',')
    setPriseRange({minPrice: tempRangeOfPrice[0], maxPrice: tempRangeOfPrice[1]})
  }

  const getCategoryName =(event) =>{
    setCategoryName(event.target.value)
  }
  let categoryTitle = 'All products'
    if(categoryName!==''){
      categoryTitle=categoryName
    }

  return (
    <section className='productconteiner'>
      <div className='productconteiner-filter'>
        <PriceFilter getPriceRange={getPriceRange}/>
        <SideBarOfCategories getCategoryName={getCategoryName}/>
      </div>
      <div className='productconteiner-products'>
        <Title title={categoryTitle} />
        <FilteredProducts categoryName={categoryName} priceRange={priceRange} />
      </div>
    </section>
  )
};
