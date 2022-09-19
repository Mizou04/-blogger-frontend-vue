<template lang="html">
    <SocialButton social="google"/>
  <form @submit="submitHandler" :class="`form form-${isLoginPage ? 'login' : 'signup'}`">
    <h2 class="form--title">{{isLoginPage? 'login' : 'Sign up'}}</h2>
    <label v-if="!isLoginPage" for="username" class="form--label form--label-username">
      <input ref="usernameRef" required v-model="formState.username" type="username" name="username" placeholder="username" id="username" :class="`form--input form--input-username ${msg.username ? 'invalidInput' : ''}`">
      <span v-if="msg.username">{{msg.username}}*</span>
    </label>
    <label v-if="!isLoginPage" for="name" class="form--label form--label-name">
      <input ref="nameRef" required v-model="formState.name"  type="name" name="name" placeholder="name" id="name" :class="`form--input form--input-name ${msg.name ? 'invalidInput' : ''}`">
      <span v-if="msg.name">{{msg.name}}*</span>
    </label>
    <label class="form--label form--label-email" for="email">
      <input ref="emailRef" required v-model="formState.email"  name="email" id="email" placeholder="example@example.com" :class="`form--input form--input-email ${msg.email ? 'invalidInput' : ''}`">
      <span v-if="msg.email">{{msg.email}}*</span>
    </label>
    <label for="password" class="form--label form--label-password">
      <input ref="passwordRef" required v-model="formState.password" type="password" autocomplete="current-password" name="password" placeholder="*********" id="password" :class="`form--input form--input-password ${msg.password ? 'invalidInput' : ''}`">
      <span v-if="msg.password">{{msg.password}}*</span>
    </label>
    <label v-if="!isLoginPage" class="form--label form--label-re_password" for="re_password">
      <input ref="rePasswordRef" required v-model="formState.rePassword"  type="password" name="re_password" placeholder="*********" id="re_password" :class="`form--input form--input-re_password  ${msg.rePassword ? 'invalidInput' : ''}`">
      <span v-if="msg.rePassword">{{msg.rePassword}}*</span>
    </label>
    <button type="submit" class="form--submit">{{isLoginPage ? 'login' : 'Sign up'}}</button>
  </form>
  {{isLoginPage ? "don't have account yet? " : "already have an account? " }} <router-link :to="isLoginPage ? '/signup' : '/login'" replace>{{isLoginPage ? "sign up" : "login"}}</router-link>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted, onUnmounted, watch, Ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import validate from "validator";
  import SocialButton from "@/views/components/social-button.vue"
  import userStore from "@/store/user.store";

  let route = useRoute();
  let loginStore = userStore();
  let isLoginPage = ref(/login/ig.test(route.path));
  let msg : {[ket : string] : string} = {};
    
  let formState = reactive({
    username : "",
    name : "",
    email : "",
    password : "",
    rePassword : ""
  });

  let emailRef = ref();
  let passwordRef = ref();
  let rePasswordRef = ref();
  let nameRef = ref();
  let usernameRef = ref();

  watch(()=> route.path, (newPath)=>{
    if(/login/igm.test(newPath)){
      isLoginPage.value = true
    } else if(/signup/igm.test(newPath)){
      isLoginPage.value = false;
    }
      formState.email = "";
      formState.name = "";
      formState.username = "";
      formState.password = "";
      formState.rePassword = "";
    });

  
  watch(formState, (newState)=>{
    validateFormInput(newState);
})

  function validateFormInput(e : typeof formState){
    loginStore.loginError = false;
    loginStore.loginErrorMsg = "";
    let {email, username, name, password, rePassword} = e;
    if(!validate.isEmail(email) && email.length > 0){
      msg.email = "invalid email adress"
    } else {
      delete msg.email
    }

    if(password.length < 6 && password.length > 0){
      msg.password = "password too short"
    } else {
      delete msg.password
    }
    if(username.length < 4 && username.length > 0){
      msg.username = "username too short"
    } else {
      delete msg.username
    }
    if(name.length < 4 && name.length > 0){
      msg.name = "name too short"
    } else {
      delete msg.name
    }
    if(password && rePassword !== password){
      msg.rePassword = "password and repassword don't match"
    } else {
      delete msg.rePassword;
    }
  }

  function submitHandler(e : Event){
    e.preventDefault();
    if(msg["username"]){
      alert("username not valid");
      usernameRef.value.focus()
    } 
    else if(msg["name"]){
      alert("name not valid");
      nameRef.value.focus()
    } 
    else if(msg["email"]){
      alert("email not valid");
      emailRef.value.focus()
    }
    else if(msg["password"]){
      alert("password not valid");
      passwordRef.value.focus()
    } 
    else if(msg["rePassword"]){
      alert("password and repassword don't match");
      rePasswordRef.value.focus()
    } 
  }

</script> 

<style scoped lang="scss">
  @import "@/views/scss/scheme";
  .form{
    height : 60vh;
    width : min(400px, 80vw);
    /* text-align: start; */
    margin: auto;
    &--title{
      margin: 7px auto;
      margin-left: 10px;
      font-size: 1.2em;
      width : 100%;
    }
    &-login, &-signup{
      padding: 20px 120px;
    }
    &--label{
      width : 100%;
      text-align: center;
    }
    &--input{
      position : relative;
      width : min(80vw, 400px);
      padding: 10px 15px;
      margin: 0px auto 9px auto;
      transform: translateX(-50%);
      left: 50%;
      border : 1px black solid;
    }
    &--submit{
      position: relative;
      padding : 6px 15px;
      display : flex;
      justify-content: center;
      width : min(60vw, 300px);
      margin: 15px auto;
      transform: translateX(-50%);
      left : 50%;
      color : white;
      font-weight: 100;
      font-size: .9em;
      background : $buttons--color-cta;
      border : 1px rgba(255, 255, 255, 0.333) solid;
      box-shadow : 1px 2px 10px 2px rgba(16, 17, 23, 0.164);
      transition : all 0.123s 0s ease-in;
      text-transform: capitalize;
      &:hover{
        box-shadow : unset;
      }
    }
    &--label{
      position : relative;
      span{
        color : blue;
        position : absolute;
        bottom : -50%;
        left : 0px;
        width : 100%;
        font-size : .8em;
      }
    }
  }
  .invalidInput{
      border : 1px red solid;
      outline : 1px red solid;
  }

</style>
