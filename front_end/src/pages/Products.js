import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilteredProducts from '../components/FilteredProducts';
import Title from '../components/Title';
import CategoriesDropdown from '../components/CategoriesDropdown';
import PriceFilterDropdown from '../components/PriceFilterDropdown';

const Products = () => {
  const [priceRange, setPriseRange] = useState({ maxPrice: '', minPrice: '' });
  const [categoryName, setCategoryName] = useState('');
  const [open, setOpen] = useState(false);

  const getPriceRange = (event) => {
    const tempRangeOfPrice = event.target.value.split(',');
    setPriseRange({
      minPrice: tempRangeOfPrice[0],
      maxPrice: tempRangeOfPrice[1],
    });
    setOpen(false);
  };

  const getCategoryName = (event) => {
    setCategoryName(event.target.value);
    setOpen(false);
  };
  let categoryTitle = 'All products';
  if (categoryName !== '') {
    categoryTitle = categoryName;
  }

  return (
    <div className="products-wraper">
      <h3>Filters</h3>
      <div className="products-filters">
        <CategoriesDropdown getCategoryName={getCategoryName} />
        <PriceFilterDropdown getPriceRange={getPriceRange} />
      </div>
      <Title title={categoryTitle} />
      <FilteredProducts categoryName={categoryName} priceRange={priceRange} />
    </div>
  );
};

export default Products;
