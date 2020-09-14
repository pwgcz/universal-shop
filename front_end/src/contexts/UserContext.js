import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from 'react-alert'

export const UserContext = createContext({
  user: {},
  fetchCurrentUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`auth/current_user`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      setUserObject(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const isLoggedIn = () => {
    setUserProperty(
      "logged_in",
      localStorage.getItem("access_token") ? true : false
    );
  };
  useEffect(() => {
    isLoggedIn();
    fetchCurrentUser();
  }, []);

  const [user, setUser] = useState({
    id: "",
    email: "",
    user_name: "",
    first_name: "",
    last_name: "",
    phone: "",
    date_joined: "",
    is_staff: false,
    logged_in: localStorage.getItem("access_token") ? true : false,
    date_of_birth: "",
  });

  const [addressId, setAddressId] = useState(null);

  const setUserProperty = (name, value) => {
    setUser((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  };

  const setUserObject = (props) => {
    setUser({
      id: props.id,
      email: props.email,
      user_name: props.user_name,
      first_name: props.first_name,
      last_name: props.last_name,
      phone: props.phone,
      date_joined: props.date_joined,
      is_staff: props.is_staff,
      loggedIn: localStorage.getItem("access_token") ? true : false,
      date_of_birth: props.date_of_birth,
    });
  };

  const alerts = useAlert()
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser({
      id: "",
      email: "",
      userName: "",
      firstName: "",
      lastName: "",
      phone: "",
      dateJoined: "",
      isStaff: false,
      loggedIn: false,
      dateOfBirth: "",
    });
    alerts.show('successfully logout', {
      timeout: 0,
      type: 'success'
    })
  };

  const value = {
    user: user,
    setUser: setUserObject,
    setUserProperty: setUserProperty,
    fetchCurrentUser: fetchCurrentUser,
    logout: handleLogout,
    addressId: addressId,
    setAddressId: setAddressId,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
