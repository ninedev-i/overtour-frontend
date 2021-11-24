<template>
   <router-link :to="`/tours/${props.tour.id}`" :class="`tileView ${isClosed ? 'closed' : ''}`">
      <div class="tileView__image" :title="props.tour.title" :style="`background-image: url(${props.tour.image})`"></div>
      <div class="tileView__title">{{ props.tour.title }}</div>
      <div class="tileView__info">
         <!--<div class="tileView__label">Даты похода:</div>-->
         <div>
            <span>{{ period(props.tour.date_from, props.tour.date_to) }} ({{ props.tour.duration }} {{ declOfNum(props.tour.duration) }})</span>
         </div>
         <!--<hr />-->
         <!--<div class="tileView__label">Стоимость:</div>-->
         <div>{{ triads(props.tour.price) }} ₽</div>
      </div>
   </router-link>
</template>

<script lang="ts" setup>
import { computed, defineComponent } from 'vue';
import { period } from '@/utils/date';

defineComponent({
   name: 'TileView',
});

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
</script>

<style lang="scss">
@import '../../assets/css/constants.css';

.tileView {
   display: inline-block;
   width: 100%;
   max-width: 320px;
   height: 310px;
   background-color: var(--page-background);
   text-decoration: none;
   color: var(--text-color);

   &:hover {
      cursor: pointer;
      background: #fbfff4;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .1);
   }

   &.closed {
      color: #ababab;
   }

   &__image {
      height: 160px;
      width: 100%;
      background-size: cover;
      background-position: center;
      position: relative;
      flex-shrink: 0;
   }

   &__title {
      font-weight: bold;
      font-size: 16px;
      padding: 6px 12px;
   }

   &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-shrink: 0;
      padding: 0 12px 8px 12px;
      font-size: 15px;
      color: #868686;
   }

   div {
      margin-bottom: 6px;
   }
}
</style>
