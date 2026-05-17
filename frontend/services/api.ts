import axios from "axios";

import AsyncStorage from
  "@react-native-async-storage/async-storage";



const API = axios.create({

  baseURL:
    "http://10.147.182.122:3001/api",

});





/* =========================
   ADD TOKEN IN EVERY REQUEST
========================= */

API.interceptors.request.use(

  async (config) => {

    const token =
      await AsyncStorage.getItem(
        "token"
      );

 console.log(
  "INTERCEPTOR TOKEN = ",
  token
);

if (token) {

  config.headers.Authorization =
    `Bearer ${token}`;

}

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);





export default API;