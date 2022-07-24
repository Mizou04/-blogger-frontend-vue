<template lang="html">
  <div class="form--wrapper">
    <ErrorDom v-if="store.loginError" :msg="loginErrorMsg"/>
    <AuthForm/>
  </div>
</template>

<script lang="ts" setup>
  import  AuthForm  from "@/views/components/auth-form.vue";
  import ErrorDom from '@/views/components/custom-error-DOM.vue'
  import useUserStore from "@/store/user.store"
  import { ref } from "vue"

  const store = useUserStore();
  let loginErrorMsg = ref(store.loginErrorMsg);


</script>

<style scoped lang="scss">

  .form--wrapper{
    height : 100%;
    text-align: center;
    padding-top: 30px;
  }
</style>