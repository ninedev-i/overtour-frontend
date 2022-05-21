<template>
   <router-link :to="`/tours/${props.tour.id}`" :class="`listView ${isClosed ? 'closed' : ''}`">
      <img
         class="listView__image"
         :src="props.tour.image"
         :alt="props.tour.title"
         loading="lazy"
      />
      <div class="listView__text">
         <div class="listView__title">{{ props.tour.title }}</div>
         <div class="listView__description">{{ props.tour.description }}</div>
      </div>
      <div class="listView__info">
         <div class="listView__label">Регион:</div>
         <div>{{ props.tour.region }}</div>
         <hr />
         <div class="listView__label">Продолжительность:</div>
         <div>{{ props.tour.duration }} {{ declOfNum(props.tour.duration) }}</div>
         <hr />
         <div class="listView__label">Даты похода:</div>
         <div v-if="props.tour.date_from === props.tour.date_to">
            {{ formatDate(props.tour.date_to).format('D.MM.YYYY') }}
         </div>
         <div v-else-if="formatDate(props.tour.date_from).format('MM') === formatDate(props.tour.date_to).format('MM')">
            {{ formatDate(props.tour.date_from).format('D') }} – {{ formatDate(props.tour.date_to).format('D.MM.YYYY') }}
         </div>
         <div v-else>{{ formatDate(props.tour.date_from).format('D.MM.YYYY') }} – {{ formatDate(props.tour.date_to).format('D.MM.YYYY') }}</div>
         <hr />
         <div class="listView__label">Стоимость:</div>
         <div>{{ triads(props.tour.price) }} ₽ {{ getPricePerDay(props.tour.price, props.tour.duration) }}</div>
      </div>
   </router-link>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatDate } from '@/utils/date';

const props = defineProps({
   tour: {
      type: Object,
      required: true,
   },
});

const isClosed = computed((): boolean => {
   return +new Date(props.tour.date_from) < new Date().setHours(0, 0, 0, 0);
});

const declOfNum = (number: number) => {
   let cases = [2, 0, 1, 1, 1, 2];
   return ['день', 'дня', 'дней'][(number % 100 > 4 && number % 100 < 20)? 2 : cases[(number % 10 < 5) ? number % 10 :5]];
};

const triads = (amount: number) => {
   const val = amount + '';
   return val.replace(/(\d{1,3})(?=((\d{3})*([^\d]|$)))/g, ' $1 ');
};

const getPricePerDay = (price: number, days: number): string => {
   return days > 1 ? `(${triads(Math.round(price / days))} ₽ в день)` : '';
};
</script>

<style lang="scss">
@import '../../assets/css/constants.css';

.listView {
   display: flex;
   flex-direction: row;
   margin-bottom: 12px;
   width: 100%;
   max-height: 180px;
   background-color: var(--page-background);
   font-size: 15px;
   overflow: hidden;
   text-decoration: none;
   color: var(--text-color);

   &:hover {
      cursor: pointer;
      background: #fbfff4;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
   }

   &.closed {
      color: #ababab;
   }

   &__image {
      height: 180px;
      width: 260px;
      background-size: cover;
      background-position: center;
      position: relative;
      flex-shrink: 0;
   }

   &__text {
      padding: 6px 6px 6px 12px;
   }

   &__description {
      max-height: 106px;
      overflow: hidden;
      margin-top: 6px;
   }

   &__title {
      font-weight: bold;
      font-size: 18px;
   }

   &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-shrink: 0;
      width: 175px;
      padding: 6px 12px 6px 6px;
      font-size: 13px;
   }

   &__label {
      color: #cacaca;
   }
}
</style>
