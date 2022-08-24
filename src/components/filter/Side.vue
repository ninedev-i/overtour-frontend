<template>
   <div class="filterSide-fixed">
      <div class="filterSide-container">
         <el-switch
            :value="props.view"
            active-value="tile"
            class="filterSide-item"
            inactive-text="Список"
            inactive-color="yellowgreen"
            active-color="yellowgreen"
            active-text="Плитка"
            @change="props.changeView"
         />
      </div>

      <div class="filterSide-container">
         <b>Продолжительность</b>
         <el-slider
            v-model="duration"
            class="filterSide-item filterSide-slider"
            :range="true"
            :min="1"
            :max="60"
         />

         <!--<div @click="request()">Найти</div>-->

         <b>Стоимость</b>
         <el-slider
            v-model="price"
            class="filterSide-item filterSide-slider"
            :range="true"
            :min="0"
            :max="100000"
            :step="500"
         />

         <!--<b>Набор</b><br />
         <el-checkbox
            class="filterSide-item"
            v-model="checked">Открыт</el-checkbox>
         <br />-->
         <!--<b>Сложность</b><br />
         <el-rate
            v-model="difficulty"
            :icon-classes="iconClasses"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
         </el-rate>-->
         <!--Турклуб-->
         <el-button
            class="filterSide-button"
            :disabled="!isPriceChanged && !isDurationChanged"
            @click="searchEvents"
         >
            Применить фильтр
         </el-button>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useToursStore } from '@/stores/tours';

const props = defineProps({
   changeView: Function,
   view: String
});

const toursStore = useToursStore();

const duration = ref(toursStore.filter.duration);
const price = ref(toursStore.filter.price);
const isPriceChanged = computed(() => JSON.stringify(toursStore.filter.price) !== JSON.stringify(price.value));
const isDurationChanged = computed(() => JSON.stringify(toursStore.filter.duration) !== JSON.stringify(duration.value));

const searchEvents = async () => {
   toursStore.setFilter('price', price.value);
   toursStore.setFilter('duration', duration.value);

   await toursStore.getTours();
};
</script>

<style lang="scss">
@import '../../assets/css/constants.css';

.filterSide {
   &-fixed {
      display: flex;
      position: fixed;
      flex-direction: column;
      width: inherit;
      height: auto;

      @media (max-width: 450px) {
         position: relative;
      }
   }

   &-container {
      padding: 12px;
      background-color: var(--page-background);
      margin-bottom: 12px;
   }

   &-item {
      margin-bottom: 12px;
   }

   &-slider {
      margin: 0 10px;
   }

   &-button {
      margin: 10px auto;
   }
}

// Перебьем стили кнопок
.el {
   &-switch__label.is-active {
      color: var(--main-color) !important;
   }

   &-checkbox__input .is-checked & + .el-checkbox__label {
      color: var(--main-color);
   }

   .el-checkbox__inner,
   .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border-color: var(--main-color);
      background-color: var(--main-color);
   }

   .is-focus .el-checkbox__inner {
      border-color: var(--main-color);
   }

   &-slider {
      &__button {
         border-color: var(--main-color);
      }

      &__bar {
         background-color: var(--main-color);
      }
   }
}
</style>
