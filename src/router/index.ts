import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

export default function (/* store: any */) {
   const routerHistory = import.meta.env.SSR === false ? createWebHistory() : createMemoryHistory();

   // console.log(store);
   const adminGuard = () => {
      // const store = useStore();
      // return false;
   };

   return createRouter({
      history: routerHistory,
      routes: [
         { path: '/', name: 'index', component: () => import('@/views/Index.vue') },
         { path: '/auth/:type', name: 'auth', component: () => import('@/views/Auth.vue') },
         { path: '/tours', name: 'tours', component: () => import('@/views/Tours.vue') },
         { path: '/tours/:id', name: 'tourInfo', component: () => import('@/views/Tour.vue') },
         { path: '/admin', name: 'admin', component: () => import('@/views/Admin.vue'), beforeEnter: [adminGuard] },
         { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFound.vue'), },
      ]
   });
}
