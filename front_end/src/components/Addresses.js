import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function Addresses() {
  const [addresses, setAdrresses] = useState({adresses:'', isFetching: true});

  const fetchAddresses = async () => {
      try {

          const response = await axios.get(`/api/address`);
          console.log(response)
          setAdrresses({adresses: response.data.results, isFetching: false});
      } catch (e) {
          console.log(e);
          setAdrresses({adresses: addresses.adresses, isFetching: false});
      }
  };
  useEffect(() => {
        fetchAddresses();
    }, []);


  return(
  <div>
  lalalal
  </div>
  )
}
