import React from "react";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Informations from "../components/Informations";


const Home = () => {

  return (
    <>
      <div className="contentWrapper">
        <Banner
          title="Welcome to my shop"
          subtitle="Check offerts obut products"
        >
          <Link to="/products" className="btn-primary">
            Products
          </Link>
        </Banner>
      </div>
      <Informations />
    </>
  );
};

export default Home;
