<template lang="html">
  <!-- THUMBNAIL / THUMBNAIL + Title -->
  <div v-if="!props.source.thumbnail || props.source.thumbnail.match(/#[0-9A-F]{6}|#[0-9A-F]{3}|rgba?\(|hsla?\(/gim)" :style="{background : props.source.thumbnail}" class="article_viewer--img">
    <h1>{{props.source.title}}</h1>
  </div>
  <div v-else>
    <img class="article_viewer--img" :src="props.source.thumbnail"/> 
    <h1 class="article_viewer">{{props.source.title}}</h1>
  </div>

  <!-- Date --> <!-- AUTHOR --> <!-- Comments + Likes -->
  <p><span><Clock/> last modified : </span>{{source.lastModified}}</p><a :href="`/user/${source.owner.id}`">{{source.owner.username}}</a><p>comments and likes</p>
  <!-- Content -->
  <article ref="contentRef" class="article_viewer--content">
  </article>
  <div id="_helper"
  style="display : none !important"
  />
</template>

<script lang="ts" setup>
  import { defineProps, ref, onMounted, Ref } from "vue";
  import { IBlogPost } from "@/types/blogPost";
  import { LabelMultiple, Clock } from "mdue";
  import Quill from "quill"

  let props = defineProps<{
    source : IBlogPost
  }>();
  let contentRef : Ref<HTMLDivElement | null> = ref(null) ;
  onMounted(()=>{
    let _editor = new Quill("#_helper");
    // _editor.disable();
    _editor.setContents(JSON.parse(props.source.content), "api");
      (contentRef.value as HTMLDivElement).innerHTML = _editor.root.innerHTML
    // if(props.source.content.match('{"ops"')){
    // }
  })

</script>

<style lang="scss">

  .article_viewer{
    &--img{
      height : 360px;
    }
  }
</style>