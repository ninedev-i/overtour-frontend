import { MutationTree } from 'vuex';
import { UserState } from './types';

export default <MutationTree<UserState>> {
   setEmail(state, email) {
      state.email = email;
   },
};
