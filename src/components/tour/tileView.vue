<template>
   <router-link :to="`/tours/${props.tour.id}`" :class="`tileView ${isClosed ? 'closed' : ''}`">
      <img
         class="tileView__image"
         :src="props.tour.image"
         :alt="props.tour.title"
         loading="lazy"
      />
      <div class="tileView__title">{{ props.tour.title }}</div>
      <div class="tileView__info">
         <div class="tileView__dates">
            {{ period(props.tour.date_from, props.tour.date_to) }} ({{ props.tour.duration }} {{ declOfNum(props.tour.duration) }})
         </div>
         <div class="tileView__price">{{ triads(props.tour.price) }} ₽</div>
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
   return val.replace(/(\d{1,3})(?=((\d{3})*([^\d]|$)))/g, ' $1 ').trim();
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
      width: 100%;
      height: 160px;
      object-fit: cover;
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

   &__dates,
   &__price {
      margin-top: 6px;
   }
}
</style>
