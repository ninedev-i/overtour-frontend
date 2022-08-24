import { UserConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import vuePlugin from '@vitejs/plugin-vue';
import path from 'path';

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
