<template lang="html">
  <!-- THUMBNAIL / THUMBNAIL + Title -->
  <div class="article_viewer">
    <div class="article_viewer--header">
      <div v-if="!props.source.thumbnail || props.source.thumbnail.match(/#[0-9A-F]{6}|#[0-9A-F]{3}|rgba?\(|hsla?\(/gim)" :style="{background : props.source.thumbnail}" class="article_viewer--img">
        <h1>{{props.source.title}}</h1>
      </div>
      <div v-else>
        <img class="article_viewer--img" :src="props.source.thumbnail"/> 
        <h1 class="article_viewer--title">{{props.source.title}}</h1>
      </div>
    </div>

    <div class="article_viewer--meta">
      <span><Clock/> last modified : {{source.lastModified}}</span>
      <span>
      <GreasePencil/>
      <a :style="{textDecoration : 'none', background : source.thumbnail, color : 'transparent', backgroundClip : 'text', WebkitBackgroundClip : 'text'}" :href="`/user/${source.owner.id}`">
      {{source.owner.username}}
      </a>
      </span>
      <p> <ThumbUp/> {{source.likes.length}}</p>
    </div>

    <!-- Date --> <!-- AUTHOR --> <!-- Comments + Likes -->
    <!-- Content -->
    <article ref="contentRef" class="article_viewer--content">
    </article>
    <div id="_helper"
    style="display : none !important"
    ></div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, ref, watch, onMounted, onBeforeMount, Ref, reactive } from "vue";
  import { IBlogPost } from "@/types/blogPost";
  import { LabelMultiple, Clock, CommentPlus, ThumbUp, GreasePencil } from "mdue";
  import Quill from "quill"

  let props = defineProps<{
    source : IBlogPost
  }>();

  let _editor : any;
  let contentRef : Ref<HTMLDivElement | undefined> = ref() ;
  
  
  onMounted(async ()=>{
    _editor = new Quill("#_helper");
    _editor.setContents(JSON.parse(props.source?.content));
    (contentRef.value as HTMLDivElement).innerHTML = _editor.root.innerHTML
  })




</script>

<style lang="scss">
  .article_viewer{
    height : calc(100% - 20px);
    overflow-y: scroll;
    width : 100%;
    background : white;
    &--header{
      height : 360px;
      width : 95%;
      margin : auto;
      text-align: center;
    }
    &--img{
      height : inherit;
      width : 100%;
      border: 1.5vw black solid;
      margin-top: 10px;
      outline : none;
      border-radius: 4px;
      //if image src is actually a linear gradiant or color in general
      padding : 0px 10px;
      font-family: cambria;
      font-size: 3.5vw;
      color : black;
      text-transform: uppercase;
      font-weight : 600;
      text-align : center;
      display : flex;
      justify-content: center;
      word-break: break-word;
      align-items : center;
    }
    &--meta{
      width : 90%;
      height : 32px;
      display : flex;
      justify-content: space-between;
      margin : 0px auto;
      // & a {
      //   background-clip: text;
      //   -webkit-background-clip: text;
      //   text-decoration: none;
      //   color : transparent;
      // }
    }
    &--content{
      width : 85%;
      text-indent: 10px;
      padding : 20px 5px 0px 5px;
      background : white;
      margin : auto;
      & p:nth-child(1) > code{
          padding : 20px;
          margin : 20px auto;

          background : rgb(228, 228, 228);
          transform : translateX(50%);
        }
    }
  }
  

</style>
