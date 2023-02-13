import axios from "axios";

const api =  axios.create({
    baseURL: "http://192.168.11.10:8000/api/"
})

export default api;