import React from "react";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";


const Error = () => {
  return (
    <div className="contentWrapper">
      <Banner title="404" subtitle="page not found">
        <Link to="/" className="btn-primary">
          return
        </Link>
      </Banner>
    </div>
  );
};

export default Error;
