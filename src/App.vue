<template>
   <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
         <Suspense>
            <component :is="Component" />
         </Suspense>
      </transition>
   </router-view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

onMounted(() => {
   userStore.getUserInfo();
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

body {
   padding: 0;
   margin: 0;
   font-family: "Open Sans", sans-serif;
   background-color: #f9f9f9;
}

a {
   color: #34495e;
   text-decoration: none;
}

.fade {
   &-enter-active,
   &-leave-active {
      transition: all .2s ease;
   }

   &-enter,
   &-leave-active {
      opacity: 0;
   }
}

*,
*:before,
*:after {
   margin: 0;
}

hr {
   background-color: #ececec;
   height: 1px;
   border: none;
   margin: 3px 0 2px;
}
</style>
