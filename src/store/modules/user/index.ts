import { IRootState } from '@/store';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import { UserState } from './types';

const state: UserState = {
   email: '',
};

const namespaced: boolean = true;

export default (): Module<UserState, IRootState> => ({
   namespaced,
   state,
   actions,
   mutations
});
