<template lang="html">
  <ArticleViewer :source="props.blogpost"/>
</template>


<script lang="ts" setup>
  import { defineProps } from 'vue'
  import {IBlogPost} from "@/types/blogPost"
  import ArticlePage from "@/views/pages/article-page.vue"
  import ArticleViewer from "@/views/components/article-viewer.vue";


  let props = defineProps<{
    blogpost : IBlogPost
  }>()
  console.log(props.blogpost)

</script>

<style scoped lang="scss">
  @use "@/views/scss/scheme" as S;
  
</style>