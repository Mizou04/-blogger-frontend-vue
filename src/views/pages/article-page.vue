<template lang="html">
  <!-- THUMBNAIL / THUMBNAIL + Title -->
	<!--
  <div class="article_viewer">
    <div class="article_viewer--header">
      <div v-if="/#[0-9A-F]{6}|#[0-9A-F]{3}|rgba?\(|hsla?\(/gim.test(article.thumbnail)" :style="{background : article.thumbnail}" class="article_viewer--img">
        <h1>{{article.title}}</h1>
      </div>
      <div v-else>
        <img class="article_viewer--img" :src="article.thumbnail"/> 
        <h1 class="article_viewer--title">{{article.title}}</h1>
      </div>
    </div>

    <div class="article_viewer--meta">
      <span><Clock/> last modified : {{article.lastModified}}</span>
      <span>
      <GreasePencil/>
      <a :style="{textDecoration : 'none', background : article.thumbnail, color : 'transparent', backgroundClip : 'text', WebkitBackgroundClip : 'text'}" :href="`/user/${article.owner.id}`">
      {{article.owner.username}}
      </a>
      </span>
      <p><CommentPlus/> 0 <ThumbUp/> 0</p>
    </div>

     Date --> <!-- AUTHOR --> <!-- Comments + Likes 
     Content
    <article ref="contentRef" class="article_viewer--content">
    </article>
    <div id="_helper"
    style="display : none !important"
    ></div>
  </div>-->
	<ArticleViewer :source="article"/>
</template>

<script lang="ts" setup>
	import {onMounted, ref, Ref, reactive, onBeforeMount} from "vue"
	import {useRoute} from "vue-router"
  import { IBlogPost } from "@/types/blogPost";
	import ArticleViewer from "@/views/components/article-viewer.vue"
  import { LabelMultiple, Clock, CommentPlus, ThumbUp, GreasePencil } from "mdue";
  import Quill from "quill"

	
	let {articleId} = useRoute().params;
	let article = ref({} as IBlogPost);
	
  let _editor : any;
  let contentRef : Ref<HTMLDivElement | undefined> = ref() ;
  
	
	async function getContent(){
		try{
			const res = await fetch(process.env.NODE_ENV == "development" ? `http://localhost:4000/article/${articleId}` : `/article/${articleId}`);
			const json : {data : IBlogPost} = await res.json();
			article.value = json.data;
		}
		catch(e){
			alert((e as Error).message);
		}
	}
	
	onBeforeMount(()=>{
		getContent();
	})

  // onMounted(()=>{
	// 	console.log(article.value.thumbnail, /#[0-9A-F]{6}|#[0-9A-F]{3}|rgba?\(|hsla?\(/gim.test("hsl(77,100%,60%)"));
  //   _editor = new Quill("#_helper");
  //   _editor.setContents(JSON.parse(article.value.content));
  //   (contentRef.value as HTMLDivElement).innerHTML = _editor.root.innerHTML
  // })

	
</script>

<style lang="scss">
  
</style>