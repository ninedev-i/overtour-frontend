<template>
   <div>
      <menu-header />

      <page>
         <template #content>
            <main>
               <article>
                  <h1 class="tour_title">{{ title }}</h1>
                  <div class="tour_description">
                     <!--<h3>Описание маршрута</h3>-->
                     {{ description }}
                  </div>
                  <div v-if="imgArray.length">
                     <el-carousel :interval="4000" type="card" indicator-position="none" height="300px" class="tour_carousel">
                        <el-carousel-item v-for="item in imgArray" :key="item" class="tour_carousel_item">
                           <img :src="item" :alt="title" :title="title" class="tour_carousel_image" />
                        </el-carousel-item>
                     </el-carousel>
                  </div>
                  <!--<div><img :src="image" :alt="title" class="tour__cover"></div>-->

                  <div class="tour_plan">
                     <!--<h3>План похода</h3>-->
                     <div v-for="(day, i) in plan" :key="i" class="tour_plan_day">
                        <div class="tour_plan_day_number">День {{ i + 1 }}</div>
                        <div>
                           <b class="tour_plan_day_title">{{ day.title }}</b>
                           <div class="tour_plan_day_content" v-html="day.content"></div>
                        </div>
                     </div>
                  </div>
               </article>
            </main>
         </template>

         <template #sidebar>
            <a :href="link" target="_blank" rel="nofollow" class="tour_order">
               <el-button type="primary" icon="el-icon-link" class="tour_link">Пойти в поход</el-button>
            </a>
            <div class="side_block-white">
               <div><b class="tour_additional_info">Начало:</b> {{ formatDate(date_from).format('D MMMM YYYY') }}</div>
               <div><b class="tour_additional_info">Конец:</b> {{ formatDate(date_to).format('D MMMM YYYY') }}</div>
               <div><b class="tour_additional_info">Стоимость:</b> {{ triads(price) }} ₽</div>
            </div>
         </template>
      </page>
   </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import MenuHeader from '@/components/elements/header.vue';
import Page from '@/components/elements/page.vue';
import { Api } from '@/utils/axios';
import { formatDate } from '@/utils/date';

const route = useRoute();
const { title, description, date_from, date_to, price, link } = await Api.get(`tour/${route.params.id}`).then(res => res.data);

useHead({
   title
});

const imgArray = [];
const plan = [
   {
      title: 'Part 1',
      content: `Content`
   },
];

const triads = (sum: number) => {
   const output = sum + '';
   return output.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
</script>

<style lang="scss">
@import '../assets/css/constants.css';

.tour {
   &_title {
      padding: 0 16px;
      font-size: 26px;
   }
   &_description {
      background-color: var(--page-background);
      padding: var(--page-padding);
   }

   &_carousel {
      margin: 20px 0 20px 0;
   }

   &_item {
      user-select: none;
   }
   &_image {
      width: 100%;
   }

   &_plan {
      background-color: var(--page-background);
      padding: var(--page-padding);
   }

   &_day {
      display: flex;
      margin-bottom: 20px;
   }

   &_number {
      min-width: 65px;
      border-right: 1px solid var(--separator-color);
      margin-right: 12px;
   }

   &_title {
      display: block;
      margin-bottom: 8px;
   }

   &_content {
      font-size: 15px;
   }

   // Сайдбар
   &_order {
      width: 100%;
      margin-bottom: 10px;
   }

   &_link {
      width: 100%;
      background-color: var(--main-color) !important;
      border: 0;
   }

   &:hover {
      background-color: var(--main-color-hover) !important;
   }
   &:active {
      background-color: var(--main-color-active) !important;
   }
   &_additional_info {
      color: #cacaca;
      font-weight: 300;
   }
}
</style>
