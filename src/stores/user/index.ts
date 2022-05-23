import { defineStore } from 'pinia';
import { setToken, destroyToken, isAuthenticated } from '@/utils/auth';
import { Api } from '@/utils/axios';
import { AuthData, UserState } from './types';

export const useUserStore = defineStore('user', {
   state: (): UserState => ({
      email: null,
   }),
   actions: {
      register(data: AuthData): Promise<void> {
         return Api.post('register', data);
      },

      login(loginData: AuthData): Promise<string> {
         return Api
            .post('login', loginData)
            .then(({ data }) => {
               this.email = loginData.email;
               setToken(data.token);
               return data.token;
            });
      },

      logout(): Promise<void> {
         return Api
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

