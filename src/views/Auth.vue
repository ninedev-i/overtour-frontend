<template>
   <div class="auth">
      <h1 class="auth-title">Overtour</h1>
      <auth-form :type="route.params?.type" @authorized="redirect" />
   </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import AuthForm from '@/components/auth/Form.vue';

const route = useRoute();

useHead({
   title: 'Авторизация'
});

const redirect = (token: string) => {
   const redirectUrl = route.query.redirect ? `${route.query.redirect}/auth-${token}/` : '/';
   window.location.assign(redirectUrl);
};

</script>

<style lang="scss">
@import '../assets/css/constants.css';

.auth {
   display: flex;
   flex-direction: column;
   width: 100%;
   height: 100vh;
   justify-content: center;
   align-items: center;

   &-title {
      font-size: 20px;
      margin-bottom: 12px;
   }
}
</style>
