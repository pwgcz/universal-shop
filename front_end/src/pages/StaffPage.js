import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import StaffProducts from '../components/StaffProducts';
import StaffCategories from '../components/StaffCategories';
import StaffOrders from '../components/StaffOrders';

export default function StaffPage () {

  return (
    <div className="list-wraper">
      <Title title="Category" />
      <StaffCategories />

      <Link to="/category-form" className="btn-primary ">
        Add
      </Link>
      <Title title="product" />
      <StaffProducts />
      <Link to="/product-form" className="btn-primary ">
        Add
      </Link>

      <Title title="Orders" />
      <StaffOrders />
    </div>
  );
}
