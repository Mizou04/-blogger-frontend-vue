<template lang="html">
  <div ref="editorRef"  class="textEditor">
    <div class="textEditor--input"></div>
  </div>
</template>

<script lang="ts" setup>
  import {defineEmits, reactive, ReactiveEffect, ReactiveEffectRunner, Ref, ref, onMounted, watch, defineProps } from "vue";
  import useUserStore from "@/store/user.store";
  import uselayoutStore from "@/store/layout.store";
  import { IBlogPost } from "@/types/blogPost";
  import Quill from "quill"
  import "quill/dist/quill.snow.css";

  let userStore = useUserStore();
  let props = defineProps<{
    text : string,
  }>()
  let emits = defineEmits<{
    (e : "textChange", editor : Quill) : void
  }>()
  
  let toolbarOptions = [['bold', 'italic', 'underline'], ['link', 'image', 'video']];
  onMounted(() => {    
    let editor : Quill = new Quill(".textEditor--input",
    {
      theme : "snow",
      placeholder : "your thoughts here...",
      modules : {
        toolbar : toolbarOptions
      },
      scrollingContainer : ".textEditor",
    });
    editor.focus();
    editor.setContents(JSON.parse(props?.text || '{}') as any);
    editor.on("text-change", (delta, oldDelta)=>{
      emits('textChange', editor)
    })

  })




</script>

<style lang="scss">
  @use "@/views/scss/scheme" as S;

  .textEditor{
    width : 100%;
    height : 100%;
    box-shadow: 1px 2px 3px hsla(0, 0%, 100%, 0.231) inset
    ;
    &--input{
      background : white;
      border : 7px black solid;
      box-shadow: 1px 2px 3px hsla(0, 0%, 100%, 0.231) inset;
    }
    .ql-toolbar{    
      height : 40px;
      width : 100%;
      border : none;
      background : linear-gradient(to bottom, rgb(192, 255, 165), rgb(192, 255, 140));
    }
    
  }
  // .ql-toolbar{
  //   height : 40px;
  //   width : 100%;
  //   border : none;
  //   background : linear-gradient(to bottom, rgb(192, 255, 165), rgb(192, 255, 140));
  // }
</style>