import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({user:{}, setUser: () => {}});

const UserContextProvider = ({children}) => {



  const fetchCurrentUser = async () => {
      try {
          const response = await axios.get(`auth/current_user`,  {
              headers: {
                'Authorization': "JWT " + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
                'accept': 'application/json'
              }
              });
          setUserObject(response.data.user)

      } catch (e) {
          console.log(e);
          setUser({currentUser: user.currentUser, isFetching: false});
      }
  };
  useEffect(() => {
      fetchCurrentUser();
    }, []);


  const [user, setUser] = useState({
    id:'',
    email:'',
    userName:'',
    firstName:'',
    lastName:'',
    phone:'',
    dateJoined:'',
    isStaff:false,
    loggedIn: localStorage.getItem('access_token') ? true : false,
    dateOfBirth: ''
  })

      const setUserProperty=(name, value)=>{setUser(prevstate=>{
        return {...prevstate, [name]: value}
      })
  }

    const setUserObject=(props)=>{setUser({
      id:props.id,
      email:props.email,
      userName:props.user_name,
      firstName:props.first_name,
      lastName:props.last_name,
      phone:props.phone,
      dateJoined:props.date_joined,
      isStaff:props.is_staff,
      loggedIn: localStorage.getItem('access_token') ? true : false,
      dateOfBirth: props.date_of_birth
    })
}

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser({
      id:'',
      email:'',
      userName:'',
      firstName:'',
      lastName:'',
      phone:'',
      dateJoined:'',
      isStaff:false,
      loggedIn:false,
      dateOfBirth: ''
    });
}


  const value = {
    user: user,
    setUser: setUserObject,
    setUserProperty: setUserProperty,
    logout: handleLogout
  }
console.log(user);
    return (
        <UserContext.Provider value={value}>
          {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider;
