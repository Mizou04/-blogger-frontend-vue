<template lang="html">
  <button @click.prevent="clickHandler" :class="`button--social ${state.social ? 'button--social-'+state.social : ''}`">Login with {{social}}</button>
</template>

<script lang="ts" setup>
  import {defineProps, ref, onMounted, onUnmounted, watch} from "vue";
  import {useRoute, useRouter} from "vue-router"
  import useUserStore from "@/store/user.store";
  import useLayoutStore from "@/store/layout.store";

  const state = defineProps<{social : "google" | "facebook"}>();
  let popupWindow : Window;
  const popupWindowParams = "scrollbars=1,height=600,width=500,titlebar=1,menubar=1,top=30";
  
  const router = useRouter();
  const userStore = useUserStore();
  const layoutStore = useLayoutStore();
  const urls = userStore.urls;

  function clickHandler(e : MouseEvent){
    layoutStore.hideError();
    if(state.social == "google"){
      popupWindow = window.open(userStore.urls.google, "_blank", popupWindowParams) as Window;
      if(!popupWindow?.opener){
        popupWindow.opener = window;
        popupWindow.focus();
      }
    }
  }
  

</script>


<style lang="scss">
  .button{
    &--social{
      border : 2px black solid;
      width : min(400px, 80%);
      padding : 10px;
      position : relative;
      margin : auto;
      font-size: 1.4em;
      font-weight: 700;
      background : white;
      border-radius: 5px;
      cursor : pointer;
      box-shadow: 1px 2px 5px rgba(16, 17, 23, 0.164);
      transition : all 0.3s 0s ease;
      &:hover{
        box-shadow: unset;
      }
      &-facebook{
        background : blue;
        color : white;
        text-shadow : 1px 1px 2px black
      }
      &-google{
        background : white;
      }
    }
  }
</style>