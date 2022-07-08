<template lang="html">
  <div>
    <Header/>
    <router-view class="router-view">
    </router-view>

  </div>
</template>

<script setup lang="ts">
  import Header from "./views/components/header.vue"
  import useLayoutStore from "@/store/layout.store"
  import {onMounted, onUnmounted, ref, reactive} from "vue"

  let layoutStore = ref(useLayoutStore())

  function toggleDesktop(e: UIEvent){
    layoutStore.value.toggleDesktop();
  }

  onMounted(()=>{
    window.addEventListener("resize", toggleDesktop, false);
  })
  onUnmounted(()=>{
    window.removeEventListener("resize", toggleDesktop, false)
  })

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
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serifi;
  }
  #app{
    width: 100%;
    height: 100%;
  }
 

</style>
