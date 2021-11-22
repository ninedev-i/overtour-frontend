import { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';
import { createStore, DispatchOptions, Store, useStore as vuexUseStore } from 'vuex';
import tour from './modules/tours';

interface IRouterExtends extends RouteLocationNormalized {
   from: RouteLocationNormalizedLoaded;
}
export interface IRootState {
   route: IRouterExtends;
}

const storeDispatchWarp = (store: Store<IRootState>) => {
   const { dispatch } = store;

   store.dispatch = (type: string, payload: any, options?: DispatchOptions) => {
      return dispatch(type, payload, options);
   };

   return store;
};

export default () => {
   const store = createStore<IRootState>({
      modules: {
         tour: tour(),
      }
   });

   return storeDispatchWarp(store);
};

export const useStore = () => {
   return vuexUseStore<IRootState>();
};

declare module '@vue/runtime-core' {
   interface ComponentCustomProperties {
      $store: IRootState;
   }
}

