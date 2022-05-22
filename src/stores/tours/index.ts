import { defineStore } from 'pinia';
import { ToursState } from './types';
import {Api} from '@/utils/axios';
import {formatDate} from '@/utils/date';

export const useToursStore = defineStore('tours', {
   state: (): ToursState => ({
      regions: [],
      tours: [],
      filter: {
         page: 1,
         period: [],
         tags: null,
         region: null,
         price: [0, 100000],
         duration: [1, 60],
      },
      directions: [
         { value: 'weekend', caption: 'Выходного дня' },
         { value: 'water', caption: 'Водный' },
         { value: 'hiking', caption: 'Пеший' },
         { value: 'mountain', caption: 'Горный' },
         { value: 'ski', caption: 'Лыжный' },
         { value: 'sailing', caption: 'Парусный' },
         { value: 'speleo', caption: 'Спелео' },
         { value: 'auto', caption: 'Авто' },
         { value: 'moto', caption: 'Мото' },
         { value: 'combined', caption: 'Комбинированный' },
      ]
   }),
   actions: {
      async getRegions() {
         return Api
            .get('regions')
            .then(({ data }) => {
               this.regions = data;
            });
      },

      async getTours(): Promise<any> {
         let periodFilter = {};
         if (this.filter.period?.length) {
            periodFilter = {
               date_from: formatDate(this.filter.period[0]).format('YYYY-MM-D'),
               date_to: formatDate(this.filter.period[1]).format('YYYY-MM-D'),
            };
         }

         const initPrice = [0, 100000];
         const filterPrice = this.filter.price && JSON.stringify(this.filter.price) !== JSON.stringify(initPrice)
            ? JSON.stringify(this.filter.price)
            : null;

         const initDuration = [1, 60];
         const filterDuration = this.filter.duration && JSON.stringify(this.filter.duration) !== JSON.stringify(initDuration)
            ? JSON.stringify(this.filter.duration)
            : null;

         const params = {
            page: this.filter.page,
            tags: this.filter.tags,
            region: this.filter.region,
            price: filterPrice,
            duration: filterDuration,
            ...periodFilter
         };

         return Api
            .get('tour', { params })
            .then(({ data }) => {
               this.tours = data;
            }, (error) => {
               console.log(error);
            });
      },
   }
});
