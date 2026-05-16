import axios from "axios";

const API = axios.create({

  baseURL:
    "http://10.147.182.122:3001/api",

});

export default API;