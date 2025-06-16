import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cachacaria-adm-back-ii0x.onrender.com',
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
