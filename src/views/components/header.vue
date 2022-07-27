<template>
  <header class="header">
    <a href="/"><img src="" alt="logo" class="header--logo"/></a>
    <template v-if="layoutStore.isDesktop">
      <Navbar/>
      <div class="header--actions">
        <router-link v-if="!userStore.user" to="/my-profile" v-slot="{navigate}">
          <a @click="navigate" class="header--profile">
            my profile
          </a>
          <LogoutButton/>
        </router-link>
        
        <router-link v-else to="/login" v-slot="{navigate}">
          <button  @click="navigate" class="header--login">
            Get Started!
          </button>
        </router-link>
      </div>
    </template>
    <template v-else>
      <Menu class="header--burger"></Menu>
      <Drawer :isOpen="layoutStore.drawerIsOpen"></Drawer>
    </template>
  </header>
</template>

<script lang="ts" setup>
  import Navbar from "./Nav-bar-v.vue"
  import {Menu} from "mdue"
  import {ref, reactive, onMounted, onUnmounted} from "vue"
  import useLayoutStore from "@/store/layout.store"
  import useUserStore from "@/store/user.store"
  import Drawer from "./drawer.vue"
  import LogoutButton from "./logout-button.vue"


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
    box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.046);
    display  : flex;
    justify-content: space-between;
    align-items: center;
    height : 50px;
    width : 100%;
    padding : 0px 7px;
    box-shadow: S.$shadow;
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
    &--profile{
      padding : 7px 45px;
      font-weight: 600;
    }
  }
  .drawer_transition-leave-active{
    transition : all .04s .05s ease; 
    animation : bounce-in 0.5s reverse;
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
