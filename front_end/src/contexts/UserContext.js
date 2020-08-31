import React, { createContext, useState } from 'react';

export const UserContext = createContext({user:{}, setUser: () => {}});

const UserContextProvider = ({children}) => {
  const [email, setEmail]=useState('');
  const [userName, setUserName]=useState('');
  const [phone, setPhone]=useState('');
  const [dateJoined, setDateJoined]=useState('');
  const [isStaff, setIsStaff]=useState(false);
  const [loggedIn, setLoggedIn]=useState(localStorage.getItem('token') ? true : false);
  const [dateOfBirth, setDateOfBirth]=useState('');


  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);


}
  const getUser = (event) =>{
    console.log(event)
  };


  const value = {
    user:{
      email: email,
      userName: userName,
      phone: phone,
      dateJoined: dateJoined,
      isStaff: isStaff,
      loggedIn: loggedIn,
      dateOfBirth: dateOfBirth
    },
    setUser:{
      setEmail: setEmail,
      setUserName: setUserName,
      setPhone: setPhone,
      setDateJoined: setDateJoined,
      setIsStaf: setIsStaff,
      setLoggedIn: setLoggedIn,
      setDateOfBirth: setDateOfBirth
    }
  }

    return (
        <UserContext.Provider value={value}>
          {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider;
