<template lang="html">
  <button @click.prevent="clickHandler" :class="`button--social ${state.social ? 'button--social-'+state.social : ''}`">Login with {{social}}</button>
</template>

<script lang="ts" setup>
  import {defineProps, ref, Ref, onMounted, watch} from "vue";
  import {useRoute, useRouter} from "vue-router"
  import useUserStore from "@/store/user.store";
  import useLayoutStore from "@/store/layout.store";
  import {storeToRefs} from "pinia"

  const state = defineProps<{social : "google" | "facebook"}>();
  let popupWindow : Ref<Window | null> = ref(null);
  const popupWindowParams = "scrollbars=1,height=600,width=500,titlebar=1,menubar=1,top=30";
  
  const router = useRouter();
  const userStore = useUserStore();
  const layoutStore = useLayoutStore();

  function clickHandler(e : MouseEvent){
    layoutStore.hideError();
    if(state.social == "google"){
      popupWindow.value = window.open(userStore.urls.google, "_blank", popupWindowParams) as Window;
      if(!popupWindow.value?.opener){
        popupWindow.value.opener = window;
        popupWindow.value.focus();
      }
    }
    let int = setInterval(async ()=>{
      if(popupWindow.value?.closed){
        await userStore.getUserLogin(window);
        userStore.isNewUser ? router.replace("/my-profile") : router.replace("/");
        // userStore.isNewUser && userStore.setIsNewUser(false);
        clearInterval(int);
      }
    }, 1000)
    
  }

  // onMounted(()=>{
  //   let int = setInterval(()=>{
  //     if(popupWindow.value?.closed){
  //       userStore.getUserLogin(window);
  //       userStore.isNewUser ? router.replace("/my-profile") : router.replace("/");
  //       userStore.isNewUser && userStore.setIsNewUser(false);
  //       clearInterval(int);
  //     }
  //   }, 1000)
  // })  

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