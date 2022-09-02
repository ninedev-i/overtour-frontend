import { getCookie, setCookie } from '@/utils';

export const getToken = () => {
   const token = getCookie('token');
   if (!token) {
      return null;
   }

   return 'Bearer ' + token;
};

export const isAuthenticated = () => !!getToken();

export const setToken = (token: string) => setCookie('token', token);

export const destroyToken = () => localStorage.removeItem('token');
