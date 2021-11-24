import { MutationTree } from 'vuex';
import { ToursState } from './types';

export default <MutationTree<ToursState>> {
   setFilter(state, filter = '') {
      state.filter = filter;
   },

   setFilterTags(state, tags = '') {
      state.filter.tags = tags;
   },

   setFilterRegion(state, region = '') {
      state.filter.region = region;
   },

   setFilterPeriod(state, period) {
      state.filter.period = period;
   },

   setFilterPrice(state, price) {
      state.filter.price = price;
   },

   setFilterDuration(state, duration) {
      state.filter.duration = duration;
   },

   setTours(state, data) {
      state.tours = data;
   },

   setRegions(state, data) {
      state.regions = data;
   }
};
