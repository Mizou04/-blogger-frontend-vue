<template>
  <header class="header">
    <a href="/"><img src="" alt="logo" class="header--logo"/></a>
    <template v-if="layoutStore.isDesktop">
      <Navbar/>
      <div class="header--actions">
        <UserAccordion :name="userStore.user.username" v-if="userStore.user?.id"/>
        <router-link v-else to="/login" v-slot="{navigate}">
          <button  @click="navigate" class="header--login">
            Get Started!
          </button>
        </router-link>
      </div>
    </template>
    <template v-else>
      <div class="header--actions">
      <router-link v-if="userStore.user?.id" to="/my-profile" style="margin-right: 10px;" v-slot="{navigate}">
        <img @click="navigate" class="header--profile"/>
      </router-link>
      <Menu class="header--burger"></Menu>
      </div>
      <Drawer :isOpen="layoutStore.drawerIsOpen"></Drawer>
    </template>
  </header>
</template>

<script lang="ts" setup>
  import Navbar from "./Nav-bar-v.vue"
  import {Menu} from "mdue"
  import {ref, reactive, onMounted, onUnmounted, watch} from "vue"
  import { storeToRefs } from "pinia";
  import useLayoutStore from "@/store/layout.store"
  import useUserStore from "@/store/user.store"
  import Drawer from "./drawer.vue"
  import UserAccordion from "./user-accordion.vue";

  let layoutStore = useLayoutStore();
  const userStore = useUserStore();

  const drawerHandler = (e : MouseEvent)=>{
      if(!layoutStore.drawerIsOpen && (e.target as HTMLElement).classList.contains("header--burger")){
        return layoutStore.openDrawer();
      }
      if(layoutStore.drawerIsOpen && !(e.target as HTMLElement).classList.contains("drawer" || "drawer-disabled")){
        return layoutStore.closeDrawer();
      }
    }


  onMounted(()=>{
    window.addEventListener('click', drawerHandler)
  })
  onUnmounted(()=>{
    window.removeEventListener('click', drawerHandler)
  })

</script>

<style lang="scss" scoped>
  @use "@/views/scss/scheme" as S;
  .header{
    box-shadow: S.$shadow;
    display  : flex;
    justify-content: space-between;
    align-items: center;
    height : 50px;
    width : 100%;
    padding : 0px 7px;
    &--logo{
      width : 20px;
      height : 20px;
    }
    &--burger{
      height : 1.4em;
      width : 1.4em;
    }
    &--login{
      padding : 7px 45px;
      background : S.$buttons--color-cta;
      color : white;
      border : none;
      box-shadow : 0px 2px 4px rgba(0, 0, 9, 0.146);
    }
    &--actions{
      display  : flex;
      justify-content: space-around;
      align-items: center;
    }
    &--profile{
      width : 30px;
      height : 30px;
      border-radius: 50%;
      box-shadow: S.$shadow;
      margin-left: -10px;
      padding : 0;
    }
  }
  .drawer_transition-leave-active{
    transition : all .04s .05s ease; 
    // animation : bounce-in 0.5s reverse;
  }
  .drawer_transition-enter-active{
    transition : all 0.3s 0s linear;
    // animation : bounce-in 0.5s reverse;
  }
  .drawer_transition-enter-from, .drawer_transition-leave-to{
    left : -100%;
    opacity : 0;
  }

  .drawer_transition-enter-to{
    left : 0;
    opacity : 1;
  }

  @keyframes bounce-in {
  0% {
    transform: scale(5);
  }
  50% {
    transform: scale(.7);
  }
  100% {
    transform: scale(0);
  }
  }

</style>
