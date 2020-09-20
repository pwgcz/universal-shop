import React, { useState } from 'react'
import { Link } from "react-router-dom";
import FilteredProducts from "../components/FilteredProducts";
import PriceFilter from "../components/PriceFilter";
import SideBarOfCategories from "../components/SideBarOfCategories";
import Title from "../components/Title";

const Products = () => {
  const [priceRange, setPriseRange] = useState({ maxPrice: "", minPrice: "" });
  const [categoryName, setCategoryName] = useState("");

  const getPriceRange = (event) => {
    let tempRangeOfPrice = event.target.value.split(",");
    setPriseRange({
      minPrice: tempRangeOfPrice[0],
      maxPrice: tempRangeOfPrice[1],
    });
  };

  const getCategoryName = (event) => {
    setCategoryName(event.target.value);
  };
  let categoryTitle = "All products";
  if (categoryName !== "") {
    categoryTitle = categoryName;
  }

  return (
    <section className="productconteiner">
      <div className="productconteiner-filter">
        <PriceFilter getPriceRange={getPriceRange} />
        <SideBarOfCategories getCategoryName={getCategoryName} />
      </div>
      <div className="productconteiner-products">
        <Title title={categoryTitle} />
        <FilteredProducts categoryName={categoryName} priceRange={priceRange} />
      </div>
    </section>
  );
}

export default Products
