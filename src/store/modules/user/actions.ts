import { ActionTree } from 'vuex';
import { Api } from '@/utils/axios';
import { setToken, destroyToken, isAuthenticated } from '@/utils/auth';
import { UserState } from './types';

export default <ActionTree<UserState, any>> {
   register({ commit }, data) {
      return Api.post('register', data);
   },

   login({ commit }, loginData) {
      return Api
         .post('login', loginData)
         .then(({ data }) => {
            commit('setEmail', loginData);
            setToken(data.token);
         });
   },

   logout({ commit }) {
      Api
         .post('logout')
         .then(() => {
            commit('setEmail', { email: null });
            destroyToken();
         });
   },

   getUserInfo({ commit }): Promise<any> {
      return new Promise(resolve => {
         if (!isAuthenticated()) {
            resolve({});
         }
         Api.get('user')
            .then(({ data }) => {
               commit('setEmail', data);
               resolve({});
            });
      });
   },
};
