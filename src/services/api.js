import axios from 'axios';

export const api = axios.create({
    //baseURL: 'http://172.16.251.127:3333',
    baseURL: 'http://localhost:8000/api',
});

export const url = 'http://localhost:8000/api'

//export default api;