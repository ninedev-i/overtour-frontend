<template>
   <div>
      <menu-header />
      <page :white-page="false">
         <template #content>
            <main>
               <div :class="view === 'tile' ? 'tours-tile' : ''">
                  <article v-for="(tour, i) in tours" :key="`event_${i}`" class="tour">
                     <list-view v-if="view === 'list'" :tour="tour" />
                     <tile-view v-else :tour="tour" />
                  </article>
                  <div v-if="!tours || !tours.length" class="tours-listEmpty">
                     <h3>По вашему запросу ничего не найдено</h3>
                     <p>Попробуйте изменить параметры фильтрации</p>
                  </div>
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
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useHead } from '@vueuse/head';
import { useRoute } from 'vue-router';
import MenuHeader from '@/components/elements/header.vue';
import Page from '@/components/elements/page.vue';
import FilterSide from '@/components/filter/side.vue';
import ListView from '@/components/tour/listView.vue';
import TileView from '@/components/tour/tileView.vue';

defineComponent({
   name: 'ToursPage',
});

useHead({
   title: 'Overtour — Походы по России'
});

const store = useStore();
const route = useRoute();
const tours = computed(() => store.state.tour.tours);

const view = ref('tile');

if (route.params.previousPage !== 'home') {
   await store.dispatch('tour/getTours');
}

const toggleView = () => {
   view.value = view.value === 'list' ? 'tile' : 'list';
};
</script>

<style lang="scss">
.tours {
   // TODO: Перенести эту логику внутрь дочернего компонент
   &-tile {
      .tour {
         display: inline-block;
         height: 310px;
         vertical-align: top;
         margin-bottom: 14px;
         margin-right: 21px;

         &:nth-child(4n + 1) {
            margin-right: 22px;
         }

         &:nth-child(4n + 4) {
            margin-right: 0;
         }
      }
   }

   &-listEmpty {
      text-align: center;
      margin: 10px;

      h3 {
         margin-bottom: 12px;
      }
   }
}
</style>
