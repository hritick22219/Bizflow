import axios from 'axios';

const api = axios.create({
    baseURL: 'https://bizflow-production-4740.up.railway.app'
});

export default api;