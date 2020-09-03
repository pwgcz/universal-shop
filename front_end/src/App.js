import React from 'react';
import './App.css';

import Home from './pages/Home';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Auth from './pages/Auth';
import Error from './pages/Error';
import { Route, Switch } from 'react-router-dom';
import UserContextProvider from './contexts/UserContext';
import ProfilePage from './pages/ProfilePage';
import AddressForm from './components/AddressForm';
import UserForm from './components/UserForm';
import Cart from './components/Cart'


import Navbar from './components/Navbar'

function App() {
  return (
    <>
    <UserContextProvider>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products' component={Products} />
        <Route exact path='/products/:id' component={SingleProduct} />
        <Route exact path='/auth' component={Auth} />
        <Route exact path='/profil' component={ProfilePage} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/adresses-form' component={AddressForm} />
        <Route exact path='/profile-form' component={UserForm} />
        <Route component={Error} />
      </Switch>
    </UserContextProvider>
    </>
  );
}

export default App;
