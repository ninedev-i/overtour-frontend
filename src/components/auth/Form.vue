<template>
   <el-form
      ref="ruleFormRef"
      :model="auth"
      :rules="rules"
      class="authForm-container"
      @submit.prevent
   >
      <el-form-item prop="email">
         <el-input
            v-model="auth.email"
            name="email"
            placeholder="Почта"
         />
      </el-form-item>
      <el-form-item prop="password">
         <el-input
            v-model="auth.password"
            name="password"
            placeholder="Пароль"
            show-password
         />
      </el-form-item>
      <el-form-item>
         <el-button
            type="primary"
            native-type="submit"
            @click="isLogin ? login() : register()"
         >
            {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
         </el-button>
      </el-form-item>
      <div class="authForm-toggle" @click="toggleIsLogin()">{{ isLogin ? 'Зарегистрироваться' : 'Войти' }}</div>
   </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/user';

const emit = defineEmits(['authorized']);
const userStore = useUserStore();
const isLogin = ref(true);
const ruleFormRef = ref();
const auth = ref({
   email: '',
   password: '',
});
const rules = reactive({
   email: [{ required: true, message: 'Укажите почту', trigger: 'blur' }],
   password: [{ required: true, message: 'Укажите пароль', trigger: 'blur' }],
});

const toggleIsLogin = () => isLogin.value = !isLogin.value;

const register = async () => {
   await ruleFormRef.value.validate((isValid: boolean) => {
      if (!isValid) {
         return;
      }
      userStore
         .register({
            email: auth.value.email,
            password: auth.value.password,
            password_confirmation: auth.value.password,
         })
         .then(() => login());
   });

};

const login = async () => {
   await ruleFormRef.value.validate((isValid: boolean) => {
      if (!isValid) {
         return;
      }
      userStore.login({
         email: auth.value.email,
         password: auth.value.password,
      }).then((token) => {
         emit('authorized', token);
      });
   });
};
</script>

<style lang="scss">
.authForm {
   &-container {
      width: 200px
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
