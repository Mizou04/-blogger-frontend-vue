<template lang="html">
    <teleport to='body' v-if="layoutStore.isError">
      <CustomErrorDOM :msg="layoutStore.errorMsgDOM"/>
    </teleport>
    <Header/>
    <router-view class="router-view">
    </router-view>
</template>

<script setup lang="ts">
  import Header from "./views/components/header.vue"
  import useLayoutStore from "@/store/layout.store"
  import useUserStore from "@/store/user.store"
  import {onMounted, onUnmounted, ref, reactive, watch} from "vue"
  import { storeUser, deleteUser } from "@/helpers/storage.helpers";

  import CustomErrorDOM from "@/views/components/custom-error-DOM.vue"


  let layoutStore = useLayoutStore();
  let userStore = useUserStore();


  function toggleDesktop(e: UIEvent){
    layoutStore.toggleDesktop();
  }

  async function getUserOnLoad(){
    try{
      await userStore.getUserLogin(window);
    } catch(e){
      return;
    }
  }

  watch(()=>layoutStore.isError, (curr, old)=>{
    if(curr == true){
      setTimeout(layoutStore.hideError, 3000);
    }
  })

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
