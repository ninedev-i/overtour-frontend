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
            :marks="durationMarks"
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
            :marks="priceMarks"
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
      </div>
   </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';

defineComponent({
   name: 'FilterSide',
});

const props = defineProps({
   changeView: Function,
   view: String
});

const duration = ref([1, 60]);
const durationMarks = {
   // 1: '1 дн',
   // 60: '60 дн'
};
const price = ref([0, 100000]);
const priceMarks = ref({
   // 0: '0 руб'
});
// const difficulty = ref(1);
// const checked = ref(true);
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
