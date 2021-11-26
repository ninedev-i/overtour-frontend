export const getToken = () => {
   let token = localStorage?.getItem('token');
   if (!token) {
      return null;
   }

   return 'Bearer ' + token;
};

export const isAuthenticated = () => !!getToken();

export const setToken = (token: string) => localStorage.setItem('token', token);

export const destroyToken = () => localStorage.removeItem('token');
