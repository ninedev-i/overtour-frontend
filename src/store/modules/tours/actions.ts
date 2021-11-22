import { ActionTree } from 'vuex';
import { Api } from '@/utils/axios';
import { formatDate } from '@/utils/date';
import { ToursState } from './types';

export default <ActionTree<ToursState, any>> {
   async getRegions({ commit }) {
      return Api
         .get('get_regions')
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
      const params = {
         tags: state.filter.tags,
         region: state.filter.region,
         ...periodFilter
      };

      return Api
         .get('get_tours', { params })
         .then(({ data }) => {
            commit('setTours', data);
         }, (error) => {
            console.log(error);
         });
   },
};
