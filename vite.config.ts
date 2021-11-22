import { UserConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
const path = require('path');
const vuePlugin = require('@vitejs/plugin-vue');

export default {
   port: 80,
   plugins: [
      vuePlugin(),
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
