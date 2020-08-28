import axios from 'axios'

const authorizationAxios = axios.create({
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

export default authorizationAxios;
