<template>
  <div>
    <!-- <home-page-vue></home-page-vue> -->
    <!-- <h1>hello</h1> -->
    <Userform/>

  </div>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue';
  import Userform from "./views/components/RegisterForm.vue"


  // export default {
  //   components : {
  //     Userform
  //   },
  //   setup() {
  //     return {
  //       Userform
  //     }
  //   },
  // }
</script>

<style lang="scss">
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body{
    width : 100vw;
    height : 100vh;
  }

  #app{
    background: red;
    width: 100%;
    height: 100%;
  }


</style>
