import { IRootState } from '@/store';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import { ToursState } from './types';

const state: ToursState = {
   regions: [],
   tours: [],
   filter: {
      period: [],
      tags: null,
      region: null,
   },
   directions: [
      { value: 'weekend', caption: 'Выходного дня' },
      { value: 'water', caption: 'Водный' },
      { value: 'hiking', caption: 'Пеший' },
      { value: 'mountain', caption: 'Горный' },
      { value: 'ski', caption: 'Лыжный' },
      { value: 'sailing', caption: 'Парусный' },
      { value: 'speleo', caption: 'Спелео' },
      { value: 'auto', caption: 'Авто' },
      { value: 'moto', caption: 'Мото' },
      { value: 'combined', caption: 'Комбинированный' },
   ]
};

const namespaced: boolean = true;

export default (): Module<ToursState, IRootState> => ({
   namespaced,
   state,
   actions,
   mutations
});
