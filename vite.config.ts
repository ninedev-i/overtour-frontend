import { UserConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
const path = require('path');
const vuePlugin = require('@vitejs/plugin-vue');

export default {
   port: 80,
   plugins: [
      vuePlugin(),
      svgLoader(),
      eslintPlugin({
         cache: false,
         include: ['src/**/*.vue', 'src/**/*.ts']
      })
   ],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, 'src')
      }
   }
} as UserConfig;
