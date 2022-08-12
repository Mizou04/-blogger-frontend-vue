<template lang="html">
    <Header/>
    <router-view class="router-view">
    </router-view>
</template>

<script setup lang="ts">
  import Header from "./views/components/header.vue"
  import useLayoutStore from "@/store/layout.store"
  import useUserStore from "@/store/user.store"
  import {onMounted, onUnmounted, ref, reactive} from "vue"
  import { storeUser, deleteUser } from "@/helpers/storage.helpers";

  let layoutStore = ref(useLayoutStore());
  let userStore = useUserStore();

  function toggleDesktop(e: UIEvent){
    layoutStore.value.toggleDesktop();
  }

  async function getUserOnLoad(){
    try{
      await userStore.getUserLogin(window);
    } catch(e){
      console.log(e)
    }
  }

onMounted(()=>{
    window.addEventListener("resize", toggleDesktop, false);
    window.addEventListener("load", getUserOnLoad, false)
  })
  onUnmounted(()=>{
    window.removeEventListener("resize", toggleDesktop, false)
    window.removeEventListener("load", getUserOnLoad, false)
  })

</script>

<style lang="scss">
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html{
    width : 100vw;
  }
  body{
    width : 100%;
    height : 100vh;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serifi;
    overflow-x: hidden;
  }
  #app{
    height: 100vh;
    width: 100%;
    overflow-x: hidden;
  }
 

</style>
