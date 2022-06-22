import axios from 'axios';


const AxiosAuth = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? "https://noble-desk-movie-backend-2022.herokuapp.com" : "http://localhost:3001",
    timeout: 50000,
  });

  export default AxiosAuth;