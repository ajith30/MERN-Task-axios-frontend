import axios from "axios";

const api = axios.create({
    baseURL: "https://student-teacher-axios.onrender.com"
})

export default api;