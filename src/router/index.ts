import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

export default function (store: any) {
   const routerHistory = import.meta.env.SSR === false ? createWebHistory() : createMemoryHistory();

   // console.log(store);
   const adminGuard = () => {
      // const store = useStore();
      // return false;
   };

   return createRouter({
      history: routerHistory,
      routes: [
         { path: '/', name: 'index', component: () => import('@/views/index.vue') },
         { path: '/tours', name: 'tours', component: () => import('@/views/tours.vue') },
         { path: '/tours/:id', name: 'tourInfo', component: () => import('@/views/tour.vue') },
         { path: '/admin', name: 'admin', component: () => import('@/views/admin.vue'), beforeEnter: [adminGuard] },
      ]
   });
}
