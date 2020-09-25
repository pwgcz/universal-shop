import React from 'react';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import ImageBackground from '../components/ImageBackground';

const Home = () => {
  return (
    <>
      <ImageBackground>
        <div className="contentWrapper">
          <Banner
            title="Welcome to BerryShop"
            subtitle="check the available product offer"
          >
            <Link to="/products" className="btn-primary">
              Products
            </Link>
          </Banner>
        </div>
      </ImageBackground>
    </>
  );
};

export default Home;
