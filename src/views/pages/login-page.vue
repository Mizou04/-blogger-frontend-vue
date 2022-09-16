<template lang="html">
  <div class="form--wrapper">
    <CustomErrorDom v-if="userStore.loginError" :msg="loginErrorMsg"/>
    <AuthForm/>
  </div>
</template>

<script lang="ts" setup>
  import  AuthForm  from "@/views/components/auth-form.vue";
  import CustomErrorDom from '@/views/components/custom-error-DOM.vue'
  import useUserStore from "@/store/user.store"
  import { ref, watch, computed, watchEffect } from "vue"
  import { useRouter } from "vue-router";

  const userStore = useUserStore();
  const loginErrorMsg = ref(userStore.loginErrorMsg);
  const router = useRouter();
  const user = userStore.user;
  
  watch(()=>user,(nUser, oUser)=>{
    if(nUser == oUser) return; 
    else {
      router.push("/");
    }
  }, {immediate : true, deep : true})

</script>

<style scoped lang="scss">

  .form--wrapper{
    height : 100%;
    text-align: center;
    padding-top: 30px;
  }
</style>