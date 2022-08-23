<template>
   <div class="filterLine">
      <el-select
         :model-value="tags"
         :clearable="true"
         class="filterLine_type"
         placeholder="Вид похода"
         @change="(value) => toursStore.setFilter('tags', value)"
      >
         <el-option
            v-for="(item, i) in directions"
            :key="`dirs_${i}`"
            :label="item.caption"
            :value="item.value"
         />
      </el-select>

      <el-date-picker
         v-model="period"
         :range-separator="separator"
         format="d.MM.YYYY"
         class="filterLine_date"
         type="daterange"
         start-placeholder="Когда"
      />

      <el-autocomplete
         v-model="region"
         :fetch-suggestions="autocompleteRegions"
         class="filterLine_direction"
         placeholder="Куда"
         @select="(selection) => toursStore.setFilter('region', selection.value)"
      />

      <el-button
         class="filterLine_submit"
         type="success"
         icon="el-icon-search"
         @click="searchEvents"
      >
         Найти
      </el-button>
   </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToursStore } from '@/stores/tours';

const toursStore = useToursStore();
const router = useRouter();

if (!toursStore.regions.length) {
   await toursStore.getRegions();
}

const directions = toursStore.directions;
const tags = computed(() => toursStore.filter.tags);
const regions = computed(() => toursStore.regions);
const region = ref(toursStore.filter.region);
const period = ref(toursStore.filter.period);
const separator = computed(() => period.value?.length ? '—' : '');

watch(period, () => toursStore.setFilter('period', period.value));

const autocompleteRegions = (searchString: string, cb: any) => {
   const filterRegions = (queryString: string) => {
      return (link: any) => {
         return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
   };

   if (!searchString) {
      toursStore.filter.region = null;
   }

   const arr = filterRegions(searchString);
   const results = searchString ? regions.value.filter(arr) : regions.value;
   cb(results);
};

const searchEvents = async () => {
   await toursStore.getTours();

   if (router.currentRoute.value.path !== '/tours') {
      await router.push({ name: 'tours', params:  { previousPage: 'home' } });
   }
};
</script>

<style lang="scss">
@import '../../assets/css/constants.css';

.filterLine {
   display: flex;
   flex-direction: row;
   justify-content: center;

   &_type .el-input input {
      border-radius: 15px 0 0 15px;
      text-align: center;
      border-right: 0;
   }

   &_direction input,
   &_date {
      border-radius: 0;
      text-align: center;
      border-right: 0;
      width: 220px !important;
   }

   &_submit {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 160px !important;
      border-radius: 0 15px 15px 0 !important;
      border: 0;
      background-color: var(--main-color) !important;
      text-decoration: none;
      cursor: pointer;

      &:hover {
         background-color: var(--main-color-hover) !important;
      }

      &:active {
         background-color: var(--main-color-active) !important;
      }
   }

   .el {
      &-input__inner {
         border-radius: 0;
         border-bottom: 0;
      }
   }
}

/* Переопределим стили компонентов */
.el {
   &-select-dropdown__item.selected {
      color: var(--main-color-hover);
   }

   &-date-table td {
      &.end-date span,
      &.start-date span {
         background-color: var(--main-color);
      }
   }

   &-date-table td.today span {
      color: var(--main-color);
   }
}
</style>
