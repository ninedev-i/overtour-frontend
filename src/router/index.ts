import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

export default function () {
   const routerHistory = import.meta.env.SSR === false ? createWebHistory() : createMemoryHistory();

   return createRouter({
      history: routerHistory,
      routes: [
         { path: '/', name: 'index', component: () => import('@/views/index.vue') },
         { path: '/tours', name: 'tours', component: () => import('@/views/tours.vue') },
         { path: '/tours/:id', name: 'tourInfo', component: () => import('@/views/tour.vue') },
         { path: '/admin', name: 'admin', component: () => import('@/views/admin.vue') },
      ]
   });
}
