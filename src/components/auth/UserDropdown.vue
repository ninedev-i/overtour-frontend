<template>
   <el-avatar
      class="userDropdown-container"
      :size="40"
      :src="userImage"
      @click="openDialog"
   />

   <el-dialog
      v-model="isDialogVisible"
      title="Авторизация"
      width="30%"
   >
      <auth-form />
   </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AuthForm from '@/components/auth/Form.vue';

const isDialogVisible = ref(false);
const userImage = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

const openDialog = () => {
   isDialogVisible.value = true;
};
</script>

<style lang="scss">
.userDropdown {
   &-container {
      border: 1px solid white;
      cursor: pointer;
      margin-left: 20px;
   }
}
</style>
