import React, { useState, useEffect } from 'react';
import authorizationAxios from '../axiosApi'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Addresses from '../components/Addresses'





export default function SingleProduct(props) {

  const [user, setUser] = useState({currentUser: [], isFetching: true})

  const fetchCurrentUser = async () => {
      try {
          setUser({currentUser: user.currentUser, isFetching: true});
          const response = await axios.get(`current_user`,  {
              headers: {
                'Authorization': "JWT " + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
                'accept': 'application/json'
              }
              });
          setUser({currentUser: response.data, isFetching: false});
      } catch (e) {
          console.log(e);
          setUser({currentUser: user.currentUser, isFetching: false});
      }
  };
  useEffect(() => {
        fetchCurrentUser();
    }, []);


    if(fetchCurrentUser.isFetching){
      return (
        <div className='error'>
        <h3>Product not exist</h3>
        <Link to='/products' className='btn-primary'>Go Back</Link>
        </div>
      )
    }
console.log({user});
      return(
    <div className='profile-conteiner'>

    <Addresses />
    <Link to=''className='btn-primary' > My Profile</ Link>
    <Link to='' className='btn-primary'>My orders</ Link>
    </div>
    )

}
