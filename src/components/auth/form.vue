<template>
   <el-form
      :model="auth"
      class="authForm-container"
>
      <el-input
         v-model="auth.email"
         class="authForm-input"
         placeholder="Почта"
      />
      <el-input
         v-model="auth.password"
         class="authForm-input"
         placeholder="Пароль"
         show-password
      />
      <el-button
         type="submit"
         @click="isLogin ? login() : register()"
      >
         {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
      </el-button>
      <div class="authForm-toggle" @click="toggleIsLogin()">{{ isLogin ? 'Зарегистрироваться' : 'Войти' }}</div>
   </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const auth = ref({
   email: '',
   password: '',
});
const isLogin = ref(true);

const toggleIsLogin = () => isLogin.value = !isLogin.value;

const register = () => {
   store
      .dispatch('user/register', {
         email: auth.value.email,
         password: auth.value.password,
         password_confirmation: auth.value.password,
      })
      .then(() => login());
};

const login = () => {
   store.dispatch('user/login', {
      email: auth.value.email,
      password: auth.value.password,
   });
};
</script>

<style lang="scss">
.authForm {
   &-container {
      width: 200px
   }

   &-input {
      margin-bottom: 12px;
   }

   &-toggle {
      color: #0bafca;
      text-decoration: underline;
      text-align: center;
      font-size: 13px;
      margin-top: 6px;
      cursor: pointer;
   }
}
</style>
