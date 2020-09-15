import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import Paginator from "./Paginator";


export default function FilteredProducts({ categoryName, priceRange }) {
  const [dataProducts, setDataProducts] = useState({
    products: [],
    isFetching: true,
  });

  const [activePage, setActivePage] = useState(1);
  const [count, setCount] = useState(0);

  const fetchProducts = async () => {
    try {
      setDataProducts({ products: dataProducts.products });
      const response = await axios.get(
        `/api/products/?category=${categoryName}&max_price=${priceRange.maxPrice}&min_price=${priceRange.minPrice}&page=${activePage}`
      );
      setDataProducts({ products: response.data.results, isFetching: false });
      setCount(response.data.count)
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, [categoryName, priceRange, activePage]);


  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }


  if (dataProducts.products.length === 0) {
    return (
      <div className="error">
        <h3>No matches to given parameters</h3>
      </div>
    );
  }

  const filteredProducts = dataProducts.products.map((item) => {
    return <Product key={item.product_id} product={item} />
  });

  return (
    <section className="productgroup">
      <div className="productgroup-center">{filteredProducts}</div>
      <Paginator activePage={activePage} count={count} handlePageChange={handlePageChange} />
    </section>
  );
}
