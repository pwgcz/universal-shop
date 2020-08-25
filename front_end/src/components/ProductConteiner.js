import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilteredProducts from './FilteredProducts';
import PriceFilter from './PriceFilter';
import SideBarOfCategories from './SideBarOfCategories'


export default function ProductConteiner() {

  const [priceRange, setPriseRange] = useState('')

  const getPriceRange =(event) =>{
    let tempRangeOfPrice = event.target.value.split(',')
    setPriseRange({minPrice: tempRangeOfPrice[0], maxPrice: tempRangeOfPrice[1]})
  }

    console.log(priceRange)
  return (
    <>
    <PriceFilter getPriceRange={getPriceRange}/>
    <SideBarOfCategories />
    <FilteredProducts />
    </>
  )
};
