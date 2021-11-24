<template>
   <div>
      <menu-header />
      <page :white-page="true" :padding="true">
         <template #content>
            <div>
               <h1>Админка</h1>
               <div>
                  <span>Парсить клуб </span>
                  <el-button-group>
                     <el-button :loading="dataLoadingId === 1" @click="getData(1)">Strannik</el-button>
                     <el-button :loading="dataLoadingId === 2" @click="getData(2)">Vpoxod</el-button>
                     <el-button :loading="dataLoadingId === 3" @click="getData(3)">Perexod</el-button>
                     <el-button :loading="dataLoadingId === 4" @click="getData(4)">Pik</el-button>
                     <el-button :loading="dataLoadingId === 5" @click="getData(5)">MyWay</el-button>
                     <el-button :loading="dataLoadingId === 'all'" type="success" @click="showAllDrafts()">показать все черновики</el-button>
                  </el-button-group>
               </div>
               <br />

               <el-button @click="parseAllData(1)">Детализировать</el-button>

               <el-table
                  :data="tours"
                  stripe
                  style="width: 100%"
                  empty-text="Тут пусто"
               >
                  <el-table-column
                     type="index"
                     label="№"
                     :index="indexMethod"
                  />
                  <el-table-column
                     prop="title"
                     label="Заголовок"
                  />
                  <el-table-column
                     label="C"
                     width="140"
                  >
                     <template #default="scope">
                        {{ formatDate(scope.row.date_from).format('D MMMM YYYY') }}
                     </template>
                  </el-table-column>
                  <el-table-column
                     label="По"
                     width="140"
                  >
                     <template #default="scope">
                        {{ formatDate(scope.row.date_to).format('D MMMM YYYY') }}
                     </template>
                  </el-table-column>
                  <el-table-column
                     label="Ссылка"
                  >
                     <template #default="scope">
                        <a :href="scope.row.link" target="_blank" class="admin-table__link">{{ scope.row.link }}</a>
                     </template>
                  </el-table-column>
                  <el-table-column
                     align="right"
                     width="120"
                  >
                     <template #default="scope">
                        <el-button
                           size="mini"
                           :disabled="scope.row.type !== 'draft'"
                           :loading="!scope.row.type"
                           @click="parseTour(scope.row)"
                        >
                           {{ scope.row.type === 'added' ? 'Готово' : 'Парсить' }}
                        </el-button>
                     </template>
                  </el-table-column>
               </el-table>
            </div>
         </template>
      </page>
   </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
import MenuHeader from '@/components/elements/header.vue';
import Page from '@/components/elements/page.vue';
import { Api } from '@/utils/axios';
import { formatDate } from '@/utils/date';
import {useHead} from '@vueuse/head';

defineComponent({
   name: 'Admin',
});

useHead({
   title: 'Overtour — Админка'
});

interface IDraftData {
   id: number;
   title: string;
   date_from: string;
   date_to: string;
   club: number;
   link: string;
   type: ('draft'|'added'|'ignored'|null);
}
interface IReport {
   found: number;
   unique: number;
   broken: number;
}

const tours = ref<IDraftData[]>([]);
const report = ref<IReport>({
   found: 0,
   unique: 0,
   broken: 0,
});

const dataLoadingId = ref<number|null|'all'>(null);

const indexMethod = (index: number) => {
   return index++;
};

const getData = async (clubId: number) => {
   tours.value = [];
   dataLoadingId.value = clubId;
   const data = await Api
      .post('crawler/club_tours', {club: clubId})
      .then((res) => res.data);

   tours.value = data.tours;
   report.value = data.report;

   dataLoadingId.value = null;
};

const parseTour = async (tourInfo: IDraftData) => {
   tourInfo.type = null;

   return Api
      .post('crawler/tour_detail', { tourInfo })
      .then(({data}) => {
         tours.value = tours.value.slice(0).map((item) => {
            if (item && item.id === data.id) {
               item = data;
            }
            return item;
         });
      });
};

const parseAllData = async (clubId: number) => {
   return Api
      .post('crawler/parse_details_by_club', { clubId });
};

const showAllDrafts = async (): Promise<void> => {
   dataLoadingId.value = 'all';
   tours.value = await Api.get('drafts').then(res => res.data);
   dataLoadingId.value = null;
};
</script>

<style lang="scss" scoped>
@import '../assets/css/constants.css';

.admin {
   &-table__link {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }

   &:hover {
      color: #9acd32;
   }
}
</style>
