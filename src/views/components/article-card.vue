<template lang="html">
   <div class="article">
     <div :style="{background : /rgb\(|hsl\(|#[a-f0-9]{6}$|#[a-f0-9]{3}$/igm.test(article.thumbnail) ? article.thumbnail : `url(${article.thumbnail})`}" class="article--img"/>
      <div class="article--infos">
        <h3 class="article--title">{{article.title}}</h3>
        <p class="article--overview">{{article.overview}}</p>
        <p class="article--likes"><span><ThumbUp/>{{article.likes.length}}</span> <span><Comment/> {{article.comments.length}}</span></p>
        <router-link :to="`/article/${article.id}`" class="article--read">read content</router-link>
      </div> 
    </div>
</template>

<script lang="ts" setup>
  import {defineProps} from 'vue'
  import { IBlogPostMin } from "@/types/blogPost";
  import { ThumbUp, Comment } from "mdue";

  defineProps<{article : IBlogPostMin}>()


</script>

<style lang="scss" scoped>
  @use "@/views/scss/scheme" as S;

  .article{
    width : 100%;
    height : 200px;
    box-shadow: S.$shadow;
    margin: 5px auto;
    display : flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    background : hsl(0, 0%, 100%);
    
    &--img{
      height : 100%;
      width : 40%;
      background-size: cover;
    }
    &--infos{
      background : white;
      width : 60%;
      height : 100%;
      padding : 5px;
      display : grid;
      grid-template-areas : "title title ."
                            "overview overview overview"
                            "likes link link";
      grid-template-columns : auto auto auto;
      grid-template-rows : auto auto auto;
    }
    &--title{
      grid-area: title;
      width : 100%;
      height : fit-content;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size : 1.4em;
      text-transform : capitalize;
    }
    &--overview{
      grid-area: overview;
      width : 100%;
      overflow: hidden;
      word-wrap: normal;
      text-overflow: ellipsis;
      font-size : .8em;
      padding : 10px;
    }
    &--likes {
      grid-area : likes;
      display : flex;
      align-items : end;
      justify-content: flex-start;
      & > span{
        margin : 0px 5px;
      }
    }
    &--read{
      grid-area: link;
      font-family: "candara";
      font-size: 1em;
      color : hsl(195, 50%, 63%);
      width : 100%;
      text-align: end;
      padding-right: 5px;
      display : flex;
      justify-content: flex-end;
      align-items : end;
    }
  }

  @media (min-width : 700px) {
    .article{
      height : 360px;
      &--overview{
        font-size: 1em;
      }
    }
  }

</style>