import axios from 'axios';

const Api = axios.create({
   baseURL: 'http://localhost:3333/api/',
});

Api.interceptors.response.use(
   (response) => response,
   (error) => Promise.reject(error));

export { Api };
