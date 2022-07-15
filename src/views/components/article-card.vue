<template lang="html">
   <div class="article">
     <img :src="props.props.img" class="article--img" v-if="props.props.img"/>
      <div :style="{background : articleColor}" class="article--img" v-else/>
      <div class="article--infos">
        <h3 class="article--title">{{props.props.title}}</h3>
        <p class="article--subtitle">{{props.props.subtitle}}</p>
        <router-link :to="`/article/${props.props.id}`" class="article--read">read content</router-link>
      </div> 
    </div>
</template>

<script lang="ts" setup>
  import {defineProps} from 'vue'

  let articleColor = `hsl(${Math.floor(Math.random() * 359)}, 80%, 50%)`;  
  let props = defineProps<{
    props : {
      id : string | number,
      title : string,
      subtitle? : string,
      img? : string,
    }
  }>()

</script>

<style lang="scss" scoped>
  @use "@/views/scss/scheme" as S;

  .article{
    width : 180px;
    height : 230px;
    border : 1px gray solid;
    box-shadow: S.$shadow;
    margin: 0px 3px;
    &--img{
      height : 70%;
    }
    &--infos{
      width : 100%;
      padding : 0px 5px;
    }
    &--title{
      width : 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &--subtitle{
      width : 100%;
      overflow: hidden;
      word-wrap: normal;
      text-overflow: ellipsis;
      height : 20px;
    }
    &--read{
      color : green;
      width : 100%;
    }
  }
</style>