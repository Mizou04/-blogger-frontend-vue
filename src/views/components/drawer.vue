<template lang="html">
  <transition name="transition">
    <div class="drawer">
      <div class="drawer--content">
        <Navbar/>
        <div class="drawer--actions">
          <router-link to="/login" v-slot="{navigate}">
            <button  @click="navigate" class="drawer--login">
              Get started!
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>


<script lang="ts" setup>
  import Navbar from "./Nav-bar-v.vue"
  import {ref, defineProps, onMounted, onUnmounted} from "vue"
  import useLayoutStore from "@/store/layout.store"

</script>

<style lang="scss" scoped>
  @import "@/views/scss/scheme";
  .drawer{
    background : white;
    box-shadow : 0px 4px 15px 8px rgba(0, 0, 0, 0.046);
    width : 90vw;
    height : 100%;
    position : fixed;
    top : 0;
    left : 0;
    display : flex;
    justify-content: center;
    align-items: center;
    &--content{
      width : 80%;
      height : 70%;
    }
    &--actions{
      text-align: center;
    }
    &--login{
      padding : 7px 35px;
      background : $buttons--color-cta;
      color : white;
      border : none;
      box-shadow : 0px 2px 4px rgba(0, 0, 9, 0.146);
    }
    &-disabled{
      left : 100%;
      display : none;
    }
  }
  
  .transition-leave-active{
    transition : all .04s .05s ease; 
    animation : bounce-in 0.5s reverse;
  }
  .transition-enter-active{
    transition : all 0.3s 0s linear;
    animation : bounce-in 0.5s reverse;
  }
  .transition-enter-from, .transition-leave-to{
    left : -100%;
    opacity : 0;
  }

  .transition-enter-to{
    left : 0;
    opacity : 1;
  }

  @keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>