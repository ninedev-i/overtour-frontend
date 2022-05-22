<template>
   <header class="header">
      <logo />
      <filter-line :with-requests="true" />
      <user-dropdown />
</header>
</template>

<script lang="ts" setup>
import Logo from '@/components/elements/Logo.vue';
import FilterLine from '@/components/filter/Line.vue';
import UserDropdown from '@/components/auth/UserDropdown.vue';
</script>

<style lang="scss">
@import '../../assets/css/constants.css';

.header {
   width: 100%;
   z-index: 100;
   position: fixed;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   top: 0;
   background-color: var(--main-color);
   height: 63px;
   box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .1);
}

.filterLine_submit {
   border-right: 1px solid #F5F5F5;
   border-top: 1px solid #F5F5F5;
   border-bottom: 1px solid #F5F5F5;
}
</style>
