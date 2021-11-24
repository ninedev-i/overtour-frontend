<template>
   <section>
      <slot name="header"> </slot>
      <div class="page-container">
         <div
            :class="{
               'page-content_whiteBg': props.whitePage,
               'page-content_withPadding': props.padding,
               'page-content_fullWidth': !$slots.sidebar
            }"
            class="page-content"
         >
            <slot name="content"> </slot>
         </div>
         <aside v-if="!!$slots.sidebar" class="page-side">
            <slot name="sidebar"> </slot>
         </aside>
      </div>
   </section>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';

defineComponent({
   name: 'PageContainer',
});

const props = defineProps({
   whitePage: {
      type: Boolean,
      default: false
   },
   padding: {
      type: Boolean,
      default: false
   },
});
</script>

<style lang="scss">
@import '../../assets/css/constants.css';

.page {
   &-container {
      display: flex;
      margin-top: 75px;
      flex-direction: row;
      justify-content: center;

      @media (min-width: 400px) {
         margin: 75px 30px;
      }

      @media (max-width: 450px) {
         flex-direction: column-reverse;
      }
   }

   &-content {
      display: flex;
      flex-grow: 1;
      max-width: 1000px;

      h1 {
         font-size: 22px;
         margin-bottom: 12px;
      }

      &_whiteBg {
         background-color: var(--page-background);
      }

      &_withPadding {
         padding: var(--page-padding);
         width: calc(1024px - 32px);
      }

      &_fullWidth {
         width: calc(1280px - 32px);
      }
   }

   &-side {
      width: 240px;
      min-width: 240px;
      margin-left: 20px;
      display: flex;
      flex-direction: column;

      @media (max-width: 450px) {
         margin: 0 0 20px 0;
         width: 100%;
      }
   }
}
</style>
