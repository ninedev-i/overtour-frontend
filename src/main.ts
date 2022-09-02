import App from './App.vue';
import el from 'element-plus';
import { createSSRApp, createApp } from 'vue';
import { createHead } from '@vueuse/head';
import createRouter from './router/';
import createStores from './stores/';
import ru from 'element-plus/lib/locale/lang/ru';
import 'element-plus/lib/theme-chalk/index.css';

const isSSR = typeof window === 'undefined';

export const _createApp = () => {
   const head = createHead();
   const store = createStores;
   const router = createRouter();

   const app = (isSSR ? createSSRApp : createApp)(App);
   app
      .use(head)
      .use(store)
      .use(router)
      .use(el, { locale: ru, weekStart: 3 });
   return {
      app,
      head,
      router,
      store
   };
};