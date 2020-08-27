import React from 'react';
import './App.css';

import Home from './pages/Home';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Auth from './pages/Auth';
import Error from './pages/Error';
import { Route, Switch } from 'react-router-dom';


import Navbar from './components/Navbar'

function App() {
  return (
    <>

    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/products' component={Products} />
      <Route exact path='/products/:id' component={SingleProduct} />
      <Route exact path='/auth' component={Auth} />
      <Route component={Error} />
    </Switch>

    </>
  );
}

export default App;
