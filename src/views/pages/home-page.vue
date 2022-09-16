<template lang="html">
  <main class="homepage">
    <header class="homepage--header">
      <nav class="header--nav">
        <!-- for filtering and searching -->
        <select class="header--select header--select-filter" type="search" name="search">
        </select>  
        <input placeholder="type a keyword" class="header--input header--input-search" type="search" name="search" id="">
      </nav>
      <!-- <button class="header--toggler"><ArrowCollapseLeft/></button> -->
    </header>
    <div class="homepage--body">
        <h1 ref="LoaderRef" class="homepage--loader" v-if="articlesStore.articles.length == 0">Loading...</h1>
        <div v-else class="homepage--articles">
          <template v-for="article in articlesStore.articles" v-bind:key="article.id" >
            <ArticleCard :article="article"/>
          </template>
          <!-- here we get articles cards to scroll over them -->
        </div>
    </div>
    <PaginationFooter/>
  </main>
</template>

<script lang="ts" setup>
  import { onMounted, ref, Ref, toRefs, onBeforeMount } from "vue";
  
  import useArticlesStore from "@/store/articles.store"
  import useLayoutStore from "@/store/layout.store"

  import { ArrowCollapseLeft } from "mdue";
  import ArticleCard from "@/views/components/article-card.vue"
  import PaginationFooter from "@/views/components/pagination-footer.vue"


  let articlesStore = useArticlesStore();
  let LoaderRef : Ref<HTMLDivElement | undefined> = ref();

  onBeforeMount(async ()=>{
    await articlesStore.populateArticles();
    let timeout = setTimeout(()=>{
      (LoaderRef.value as HTMLDivElement).innerText = "No Results"
    }, 5000)

    return new Promise<void>((resolve)=>{
      if((articlesStore.articles.length) > 0){
        resolve();
        clearTimeout(timeout);
      }
    })
  })

</script>

<style scoped lang="scss">
  .homepage{
    height : calc(100% - 80px);
    width : 100vw;
    background : white;
    // overflow: hidden;
    &--header{
      height : 45px;
      width : 100%;
      color : rgb(24, 24, 24);
    }
    &--body{
      display : block;
      height: calc(100%);
      width : 100%;
      overflow-y: hidden;
      &::-webkit-scrollbar{
        width : 10px;
        background : white;
      }
      &::-webkit-scrollbar-thumb{
        background : rgb(14, 14, 14);
        border-radius: 20px;
        transition : all 0.15s ease-out;
        &:hover{
          background : rgb(34, 34, 34);
        }
      }
    }
    &--articles{
      overflow-y : scroll;
      height : calc(100% - 0px);
      width : 100%;
      padding : 0px 2.5px;
    }
    &--loader{
      height : calc(100% - 40px);
      // width : 100%;
      // background : transparent;
      color :rgb(45, 42, 42);
      font-weight: 100;
      display: flex;
      justify-content : center;
      align-items: center;
      text-align: center;
    }
  }
  .header {
    display : flex;
    align-items: center;
    justify-content: center;
    &--nav{
      height : fit-content;
      width : 100%;
      border : 1px rgb(24, 24, 24) solid;
      display : flex;
      align-items: center;
      margin : 0px 5px;
    }
    &--select{
      float : left;
      margin : 0px 5px;
    }
    &--input{
      float : left;
      margin : 0px 5px;
      width : fit-content;
      border : 1px solid rgb(24, 24, 24);
      padding : 2px 5px;
      color : rgb(14, 14, 14);
      &::placeholder{
        color : rgb(54, 54, 54);
      }
    }
    &--toggler{
      border : 1px rgb(24, 24, 24) solid;
      color : rgb(24, 24, 24);
      height : 40px;
      width : 40px;
      text-align: center;
      background : rgb(237, 227, 227);
      &:hover{
        color : rgb(237, 227, 227);
        background : rgb(14, 14, 14);
      }
    }
  }

</style>