import { ActionTree } from 'vuex';
import { Api } from '@/utils/axios';
import { formatDate } from '@/utils/date';
import { ToursState } from './types';

export default <ActionTree<ToursState, any>> {
   async getRegions({ commit }) {
      return Api
         .get('regions')
         .then(({ data }) => {
            commit('setRegions', data);
         });
   },

   async getTours({ commit, state }): Promise<any> {
      let periodFilter = {};
      if (state.filter.period?.length) {
         periodFilter = {
            date_from: formatDate(state.filter.period[0]).format('YYYY-MM-D'),
            date_to: formatDate(state.filter.period[1]).format('YYYY-MM-D'),
         };
      }

      const initPrice = [0, 100000];
      const filterPrice = state.filter.price && JSON.stringify(state.filter.price) !== JSON.stringify(initPrice)
         ? JSON.stringify(state.filter.price)
         : null;

      const initDuration = [1, 60];
      const filterDuration = state.filter.duration && JSON.stringify(state.filter.duration) !== JSON.stringify(initDuration)
         ? JSON.stringify(state.filter.duration)
         : null;

      const params = {
         tags: state.filter.tags,
         region: state.filter.region,
         price: filterPrice,
         duration: filterDuration,
         ...periodFilter
      };

      return Api
         .get('tour', { params })
         .then(({ data }) => {
            commit('setTours', data);
         }, (error) => {
            console.log(error);
         });
   },
};
