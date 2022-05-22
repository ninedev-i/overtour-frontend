import App from './App.vue';
import el from 'element-plus';
import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import { isPromise } from './utils';
import createRouter from './router/';
import createStores from './stores/';
import ru from 'element-plus/lib/locale/lang/ru';
import 'element-plus/lib/theme-chalk/index.css';

const head = createHead();
const store = createStores;
const router = createRouter(/* store */);

const app = createApp(App);
app
   .use(head)
   .use(store)
   .use(createStores)
   .use(router)
   .use(el, { locale: ru, weekStart: 3 });

router.beforeResolve((to, from, next) => {
   let diffed = false;
   const matched = router.resolve(to).matched;
   const prevMatched = router.resolve(from).matched;

   if (from && !from.name) {
      return next();
   }
   const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
   });
   if (!activated.length) {
      return next();
   }
   const matchedComponents: any = [];
   matched.map((route) => {
      matchedComponents.push(...Object.values(route.components));
   });
   const asyncDataFuncs = matchedComponents.map((component: any) => {
      const asyncData = component.asyncData || null;
      if (asyncData) {
         const config = {
            store,
            route: to
         };
         if (!isPromise(asyncData)) {
            return Promise.resolve(asyncData(config));
         }
         return asyncData(config);
      }
   });
   try {
      Promise.all(asyncDataFuncs).then(() => {
         next();
      });
   } catch (err) {
      next(err as any);
   }
});

if (window.__INITIAL_STATE__) {
   store.state.value = window.__INITIAL_STATE__;
}

router.isReady().then(() => {
   app.mount('#app', true);
});
