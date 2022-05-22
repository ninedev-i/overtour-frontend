import { defineStore } from 'pinia';
import { setToken, destroyToken, isAuthenticated } from '@/utils/auth';
import { Api } from '@/utils/axios';
import { AuthData, UserState } from './types';

export const useUserStore = defineStore('user', {
   state: (): UserState => ({
      email: null,
   }),
   actions: {
      register(data: AuthData) {
         return Api.post('register', data);
      },

      login(loginData: AuthData) {
         return Api
            .post('login', loginData)
            .then(({ data }) => {
               this.email = loginData.email;
               setToken(data.token);
            });
      },

      logout() {
         Api
            .post('logout')
            .then(() => {
               this.email = null;
               destroyToken();
            });
      },

      getUserInfo(): Promise<any> {
         return new Promise(resolve => {
            if (!isAuthenticated()) {
               resolve({});
            }
            Api.get('user')
               .then(({ data }) => {
                  this.email = data.email;
                  resolve({});
               });
         });
      },
   }
});

