<template lang="html">
   <div class="article">
     <div :style="{background : props.thumbnail}" class="article--img"/>
      <div class="article--infos">
        <h3 class="article--title">{{props.title}}</h3>
        <p class="article--overview">{{props.overview}}</p>
        <router-link :to="`/article/${props.id}`" class="article--read">read content</router-link>
      </div> 
    </div>
</template>

<script lang="ts" setup>
  import {defineProps} from 'vue'
  import { IBlogPostMin } from "@/types/blogPost";

  let props = defineProps<IBlogPostMin>()


</script>

<style lang="scss" scoped>
  @use "@/views/scss/scheme" as S;

  .article{
    width : 100%;
    height : 200px;
    box-shadow: S.$shadow;
    margin: 5px auto;
    border-radius: 10px;
    background : hsl(0, 0%, 100%);
    &--img{
      height : 100%;
      width : 40%;
      background-size: cover;
    }
    &--infos{
      width : 100%;
      padding : 5px;
    }
    &--title{
      width : 100%;
      height : fit-content;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &--overview{
      width : 100%;
      overflow: hidden;
      word-wrap: normal;
      text-overflow: ellipsis;
      height : 20px;
    }
    &--read{
      font-family: "candara";
      font-size: 1.2em;
      color : hsl(195, 50%, 63%);
      width : 100%;
      text-align: end;
      padding-right: 5px;
    }
  }
</style>