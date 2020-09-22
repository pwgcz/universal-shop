import React from 'react';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import ImageBackground from '../components/ImageBackground';

const Error = () => {
  return (
    <ImageBackground>
      <div className="contentWrapper">
        <Banner title="404" subtitle="page not found">
          <Link to="/" className="btn-primary">
            return
          </Link>
        </Banner>
      </div>
    </ImageBackground>
  );
};

export default Error;
