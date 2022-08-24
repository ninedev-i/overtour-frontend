import { renderToString } from 'vue/server-renderer';
import { renderHeadToString } from '@vueuse/head';
import { _createApp } from './main';

function renderPreloadLinks(modules, manifest) {
   let links = '';
   const seen = new Set();
   modules.forEach((id) => {
      const files = manifest[id];
      if (files) {
         files.forEach((file) => {
            if (!seen.has(file)) {
               seen.add(file);
               links += renderPreloadLink(file);
            }
         });
      }
   });
   return links;
}

function renderPreloadLink(file) {
   if (file.endsWith('.js')) {
      return `<link rel="modulepreload" crossorigin href="${file}">`;
   } else if (file.endsWith('.css')) {
      return `<link rel="stylesheet" href="${file}">`;
   } else {
      return '';
   }
}

export async function render(url, manifest) {
   const { app, head, router, store } = _createApp();

   router.push(url);
   try {
      await router.isReady();
      const matchedComponents = router.currentRoute.value.matched;
      if (!matchedComponents.length) {
         new Error('404');
      }
      const ctx = {};
      const html = await renderToString(app, ctx);
      const { headTags } = renderHeadToString(head);
      const state = JSON.stringify(store.state.value);
      const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

      return [html, headTags, state, preloadLinks];
   } catch (error) {
      console.log(error);
   }
}