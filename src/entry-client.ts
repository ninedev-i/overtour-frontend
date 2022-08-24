import { _createApp } from './main';

const { app, router, store } = _createApp();

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
   next();
});

if (window.__INITIAL_STATE__) {
   store.state.value = window.__INITIAL_STATE__;
}

router.isReady().then(() => {
   app.mount('#app', true);
});
