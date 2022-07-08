<template lang="html">
    <a href="/google">
      <button class="form--google">Login with Google</button>
    </a>
  <form @submit.prevent="" class="form form-login" v-if="isLogin">
    <h2 class="form--title">Login</h2>
    <label for="email">
      <input type="email" name="email" placeholder="example@example.co" id="email" class="form--input form--input-email">
    </label>
    <label for="password">
      <input type="password" autocomplete="current-password" name="password" placeholder="*********" id="password" class="form--input form--input-password">
    </label>
    <button class="form--submit">Login</button>
  </form>
  <form @submit.prevent="" class="form form-signup" v-else>
    <h2 class="form--title">Sign in</h2>
    <label for="username">
      <input type="username" name="username" placeholder="username" id="username" class="form--input form--input-username">
    </label>
    <label for="name">
      <input type="name" name="name" placeholder="name" id="name" class="form--input form--input-name">
    </label>
    <label for="email">
      <input type="email" name="email" placeholder="example@example.co"  id="email" class="form--input form--input-email">
    </label>
    <label for="password">
      <input type="password" autocomplete="current-password" name="password" placeholder="*********" id="password" class="form--input form--input-password">
    </label>
    <label title="password:" for="re_password">
      <input type="password" name="re_password" placeholder="*********" id="re_password" class="form--input form--input-re_password">
    </label>
    <button class="form--submit">Sign up</button>
  </form>
  {{isLogin ? "don't have account yet? " : "already have an account? " }} <router-link :to="isLogin ? '/signup' : '/login'">{{isLogin ? "sign up" : "login"}}</router-link>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted, onUnmounted, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  let route = useRoute();
  let isLogin = ref(route.path.match('login'));

  watch(()=> route.path, (newPath)=>{
    if(newPath.match('login')){
      isLogin.value = newPath.match('login');
    } else if(newPath.match('signup')){
      isLogin.value = newPath.match('login');
    }
  });

  

</script> 

<style scoped lang="scss">
  @import "@/views/scss/scheme";
  .form{
    height : 60vh;
    width : min(400px, 80vw);
    text-align: start;
    // background-color: red;
    margin: auto;
    &--title{
      margin: 7px auto;
      margin-left: 10px;
      font-size: 1.5em;
    }
    &-login{
      padding: 20px 30px;
    }
    & label{
      width : 100%;
      text-align: center;
    }
    &--input{
      position : relative;
      width : 90%;
      padding: 10px 15px;
      margin: 0px auto 9px auto;
      transform: translateX(-50%);
      left: 50%;
      border : 1px black solid;
    }
    &--submit{
      position: relative;
      padding : 10px 35px;
      width: 70%;
      margin: 15px auto;
      transform: translateX(-50%);
      left : 50%;
      color : white;
      font-weight: 100;
      font-size: 1.1em;
      background : $buttons--color-cta;
      border : 1px rgba(255, 255, 255, 0.333) solid;
      box-shadow : 1px 2px 10px 2px rgba(16, 17, 23, 0.164);
      transition : all 0.123s 0s ease-in;
      text-transform: capitalize;
      &:hover{
        box-shadow : unset;
      }
    }
    &--google{
      border : 2px black solid;
      width : min(400px, 80%);
      padding : 10px;
      position : relative;
      margin : auto;
      font-size: 1.4em;
      font-weight: 700;
      background : white;
      border-radius: 5px;
    }  
  }

</style>