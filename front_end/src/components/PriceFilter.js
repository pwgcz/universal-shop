import React, { useState } from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";


export default function PriceFilter({getPriceRange}) {

  const [priceRange, setPriceRange] = useState({minPrice: 0, maxPrice:200})

  const handleChange = event => {
      setPriceRange({minPrice:parseInt(event[0]), maxPrice:parseInt(event[1])})
    }



  return (
    <div className='slider' >
    <h3>Filter by price</h3>
    <p></p>
    <Nouislider
        id='slider-custom'
        range={{min: 0, max: 200}}
        start={[0, 200]}
        connect={true}
        step= {5}
        margin={5}
         onSlide={handleChange} />
        <div className='slider-bottom'>
          <h4>{priceRange.minPrice}-{priceRange.maxPrice} zł</h4>
          <button value={[priceRange.minPrice, priceRange.maxPrice]} onClick={getPriceRange} className='btn-primary'>Filter</button>
        </div>
    </div>
  )
}
