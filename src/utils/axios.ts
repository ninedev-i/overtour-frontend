import axios from 'axios';
import { getToken } from '@/utils';

const Api = axios.create({
   baseURL: '/api/',
   transformRequest: [(data, headers: any) => {
      headers['Authorization'] = getToken();
      return JSON.stringify(data);
   }],
   headers: {
      'Content-Type': 'application/json'
   }
});

Api.interceptors.response.use(
   (response) => response,
   (error) => Promise.reject(error));

export { Api };
