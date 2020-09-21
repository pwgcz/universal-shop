import React, { useState } from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Dropdown from './Dropdown';

export default function PriceFilterDropdown ({ getPriceRange }) {
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 200 });

  const handleChange = (event) => {
    setPriceRange({
      minPrice: parseInt(event[0]),
      maxPrice: parseInt(event[1]),
    });
  };

  return (
    <Dropdown name='price'>
      <div className="slider">
        <Nouislider
          id="slider-custom"
          range={{ min: 0, max: 200 }}
          start={[priceRange.minPrice, priceRange.maxPrice]}
          connect={true}
          step={5}
          margin={5}
          onSlide={handleChange}
        />
        <div className="slider-bottom">
          <h4>
            {priceRange.minPrice}-{priceRange.maxPrice} zł
          </h4>
          <button
            value={[priceRange.minPrice, priceRange.maxPrice]}
            onClick={getPriceRange}
            className="btn-primary"
          >
            Filter
          </button>
        </div>
      </div>
    </Dropdown>
  );
}
