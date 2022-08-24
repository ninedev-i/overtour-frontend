<template>
   <div>
      <menu-header />
      <page :white-page="false">
         <template #content>
            <main class="tours-container">
               <div v-if="tours.length" :class="view === 'tile' ? 'tours-tile' : ''">
                  <article v-for="(tour, i) in tours" :key="`event_${i}`" class="tour">
                     <list-view v-if="view === 'list'" :tour="tour" />
                     <tile-view v-else :tour="tour" />
                  </article>
               </div>

               <el-pagination
                  v-model:currentPage="currentPage"
                  :page-size="40"
                  :total="meta.total"
                  class="tours-pagination"
                  hide-on-single-page
                  layout="prev, pager, next"
                  @current-change="changePage"
               />

               <div v-if="!tours || !tours.length" class="tours-listEmpty">
                  <h3>По вашему запросу ничего не найдено</h3>
                  <p>Попробуйте изменить параметры фильтрации</p>
               </div>
            </main>
         </template>

         <template #sidebar>
            <filter-side :view="view" :change-view="toggleView" />
         </template>
      </page>
   </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useHead } from '@vueuse/head';
import { useRoute } from 'vue-router';
import MenuHeader from '@/components/elements/Header.vue';
import Page from '@/components/elements/Page.vue';
import FilterSide from '@/components/filter/Side.vue';
import ListView from '@/components/tour/ListView.vue';
import TileView from '@/components/tour/TileView.vue';
import { useToursStore } from '@/stores/tours';

useHead({
   title: 'Overtour — Походы по России'
});

const toursStore = useToursStore();
const route = useRoute();
const view = ref('tile');
const tours = computed(() => toursStore.tours?.data);
const meta = computed(() => toursStore.tours?.meta);

const currentPage = computed(() => meta.value?.current_page);
const changePage = async (page: number) => {
   toursStore.setFilter('page', page);
   await toursStore.getTours();
};

onMounted(async () => {
   if (route.params.previousPage !== 'home') {
      await toursStore.getTours();
   }
});

const toggleView = () => {
   view.value = view.value === 'list' ? 'tile' : 'list';
};
</script>

<style lang="scss">
.tours {
   &-container {
      margin: 0 auto;
   }

   &-pagination {
      float: right;
      margin-top: 40px;
   }

   &-listEmpty {
      text-align: center;
      margin: 10px;

      h3 {
         margin-bottom: 12px;
      }
   }

   &-tile {
      box-sizing: border-box;
      display: grid;
      grid-gap: 20px;
      grid-template-columns: repeat(3, 1fr);
      place-content: center right;

      @media (max-width: 1000px) {
         grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 750px) {
         grid-template-columns: repeat(1, 1fr);
      }
   }
}
</style>
