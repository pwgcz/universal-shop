import React, { useContext } from "react";
import "./App.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Auth from "./pages/Auth";
import Error from "./pages/Error";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import AddressForm from "./components/AddressForm";
import UserForm from "./components/UserForm";
import CategoryForm from "./components/CategoryForm";
import ProductForm from "./components/ProductForm";
import Cart from "./components/Cart";
import OrderDetail from "./pages/OrderDetail";
import StaffPage from "./pages/StaffPage";
import ProductFormUpdate from './components/ProductFormUpdate';
import Navbar from "./components/Navbar";
import { UserContext } from "./contexts/UserContext";

function App () {
  const { user } = useContext(UserContext);

  function AuthenticatedRoute ({ component: C, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          user.loggedIn
            ? <C {...props} />
            : <Redirect
              to={`/auth`}
            />
        }
      />
    );
  }
  function AuthenticatedStaffRoute ({ component: C, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          user.loggedIn && user.is_staff
            ? <C {...props} />
            : <Redirect
              to={`/not-found`}
            />
        }
      />
    );
  }

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/auth" component={Auth} />
        <AuthenticatedRoute exact path="/profil" component={ProfilePage} />
        <AuthenticatedRoute exact path="/order-detail/:id" component={OrderDetail} />
        <AuthenticatedRoute exact path="/cart" component={Cart} />
        <AuthenticatedRoute exact path="/adresses-form" component={AddressForm} />
        <AuthenticatedRoute exact path="/profile-form" component={UserForm} />
        <AuthenticatedStaffRoute exact path="/staff" component={StaffPage} />
        <AuthenticatedStaffRoute exact path="/category-form" component={CategoryForm} />
        <AuthenticatedStaffRoute exact path="/product-form" component={ProductForm} />
        <AuthenticatedStaffRoute exact path="/product-form-update/:id" component={ProductFormUpdate} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
