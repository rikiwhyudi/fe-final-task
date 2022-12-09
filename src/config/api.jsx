import axios from "axios"

const API = axios.create({
    baseURL: "http://127.0.0.1:5000/api/v1"
})

const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete API.defaults.headers.common["Authorization"]
    }
}

export { API, setAuthToken }