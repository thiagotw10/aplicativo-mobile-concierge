import axios from "axios";

const api =  axios.create({
    baseURL: "http://10.86.32.22:8080/api/"
})

export default api;