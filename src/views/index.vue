<template>
   <section class="index_container">
      <div class="index_filterLine">
         <filter-line />
      </div>
   </section>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head';
import FilterLine from '@/components/filter/line.vue';

useHead({
   title: 'Overtour',
   meta: [
      {
         name: `description`,
         content: 'Все походы по России'
      },
   ],
});
</script>

<style lang="scss">
.index {
   &_container {
      display: flex;
      justify-content: center;
      background-image: url('../assets/img/bg_forest.jpg');
      background-position: center;
      background-size: cover;
   }

   &_filterLine {
      height: 100vh;
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
   }
}
</style>
