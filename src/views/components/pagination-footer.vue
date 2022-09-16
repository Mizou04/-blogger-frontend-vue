<template>

  <div class="element--container">
    <button class="element--navigator"><ChevronLeft/></button>
    <div class="element--numbers">
      <button class="element--number">1</button>
      <button v-if="articlesStore.page >= 5" class="element--number">...</button>
      <!-- <button v-for="item of createPages(articlesStore.page)" :key="item" class="element--number">{{item}}</button> -->
      <button v-if="articlesStore.page < state.numberOfPages-Math.floor(state.offset/2)" class="element--number">...</button>
      <button class="element--number">{{state.numberOfPages}}</button>
    </div>
    <button @click="articlesStore.nextPage()" class="element--navigator"><ChevronRight /></button>
  </div>

</template>


<script lang="ts" setup>
  import { reactive, ref, Ref } from "vue";
  import { ChevronLeft, ChevronRight } from "mdue";
  import aStore from "@/store/articles.store";
  
  const articlesStore = aStore();
  const state = reactive({
    numberOfPages : articlesStore.overallLength / (articlesStore.range.to - articlesStore.range.from + 1),
    offset : 2,
    max : 5,
  })
  let beforePage : Ref<number> = ref(0);
  let afterPage : Ref<number> = ref(0);

  

  // function   

</script>


<style lang="scss" scoped>
  $primary-color : rgb(14, 201, 167);
  $white :rgb(255, 255, 255);
  // .element{
  //   &--container{
  //     // position : fixed;
  //     // bottom : 5px;
  //     // left : 0px;
  //     width : 100%;
  //     height : 30px;
  //     display : flex;
  //     justify-content: space-between;
  //     align-items: center;
  //     background : $white;
  //     box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.06), 1px -2px 5px rgba(0, 0, 0, 0.06);
  //     border-radius: 3px;
  //     text-transform : capitalize;
  //     padding : 0px 5px;
  //   }
  //   // &--navigator{
  //     //   color : $primary-color;
  //   //   &
  //   // }
  //   &--numbers{
  //     background : $white;
  //     width : 100%;
  //     padding : 2px 5px;
  //     display : flex;
  //     justify-content: center;
  //     align-items: center;
  //   }
  //   &--number, &--navigator{
  //     border : none;
  //     background : transparent;
  //     color : $primary-color;
  //     padding : 4px 8px;
  //     font-size : 12px;
  //     border-radius : 5px;
  //     &:hover, &-active, &:active{
  //       font-weight: 900;
  //       background : $primary-color;
  //       color : white;
  //     }
  //   }
  //   &--number{
  //     font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  //     margin : 0px 5px;
  //   }
  //   &--points{
  //     padding : 4px;
  //   }



  // }

  .element{
    &--container{
      display : grid;
      grid-template-columns : 30px auto 30px;
      width : min(100%, 360px);
      box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.06), 1px -2px 5px rgba(0, 0, 0, 0.06);
      border-radius: 3px;
      text-transform : capitalize;
      padding : 6px;
      margin : auto;
    }
     &--numbers{
      background : $white;
      width : 100%;
      padding : 2px 5px;
      display : flex;
      justify-content: center;
      align-items: center;
    }
    &--number, &--navigator{
      border : none;
      background : transparent;
      color : $primary-color;
      padding : 4px 8px;
      font-size : 12px;
      border-radius : 5px;
      &:hover, &-active, &:active{
        font-weight: 900;
        background : $primary-color;
        color : $white;
      }
    }
    &--number{
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      margin : 0px 5px;
    }
    &--points{
      @extend .element--number;
      padding : 4px 8px;
      font-size : 1.2em;
      &:disabled{
        color : gray;
      }
    }
  }

</style>