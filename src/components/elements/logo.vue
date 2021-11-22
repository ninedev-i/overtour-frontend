<template>
   <router-link to="/" class="logo">Overtour</router-link>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';

defineComponent({
   name: 'Logo'
});
</script>

<style lang="scss">
.logo {
   color: #fff;
   font-weight: 900;
   font-size: 20px;
   padding: 16px 16px 16px 0;
   text-decoration: none;
   cursor: pointer;
}
</style>
