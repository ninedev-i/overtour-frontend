import axios from 'axios';

const Api = axios.create({
   baseURL: import.meta.env.VITE_SERVICE_URL as string,
});

Api.interceptors.response.use(
   (response) => response,
   (error) => Promise.reject(error));

export { Api };
