<template lang="html">
  <div class="editing_page--container">
    <ArticleMetadataInput v-if="editingState == 'title'" @titleEdit="changeTitleHandler" :source="dataState"/>
    <TextEditor @text-change="changeContentHandler" :text="dataState.content" v-else/>
    <div class="editing_page--actions">
      <button @click="cancelHandler" class="editing_page--action editing_page--action-cancel">Cancel</button>
      <button v-if="stateIndex > 0" @click="prevHandler" class="editing_page--action editing_page--action-previous">Previous</button>
      <button @click="nextHandler" class="editing_page--action editing_page--action-confirm">{{editingState == 'review' ? 'Confirm' : (editingState == "overview" ? 'review text' : 'Next')}}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ArticleMetadataInput from "@/views/components/article-title-thumbnail.vue"
  import TextEditor from "@/views/components/text-editor.vue";
  import { Ref, ref, reactive } from "vue";
  import useLayoutStore from "@/store/layout.store";
  import useUserStore from "@/store/user.store";
  import { IBlogPost } from "@/types/blogPost";
  import { useRouter } from 'vue-router'
  import {} from 'mdue'
  import Quill from "quill"


  type IEditingPhase = "title" | "editing" | "overview" | "review";
  
  let stateIndex = ref(0);
  let states : IEditingPhase[] = ["title", "editing", "overview", "review"];
  let editingState : Ref<IEditingPhase> = ref(states[stateIndex.value]);
  
  let router = useRouter();
  let layoutStore = useLayoutStore();
  let userStore = useUserStore();
  let storedDataState = JSON.parse(localStorage.getItem("dataState") as string) as IBlogPost;
  let overviewDefault = ref("")
  let dataState = reactive<IBlogPost>({
    title : storedDataState?.title || '',
    id : storedDataState?.id || '',
    owner : {
      profilePic : userStore.user?.profilePic + "",
      email : userStore.user?.email + "",
      id : userStore.user?.id + "",
      username : userStore.user?.id + ""
    },
    content : storedDataState?.content || '',
    createdAt : storedDataState?.createdAt || '',
    lastModified : storedDataState?.lastModified || '',
    overview : storedDataState?.overview || overviewDefault.value,
    thumbnail : storedDataState?.thumbnail || ''
  });

  function changeTitleHandler(v : string){
    dataState.title = v;
    localStorage.setItem("dataState", JSON.stringify(dataState))
    console.log(v);
  }
  function changeContentHandler(editor : Quill){
    dataState.content = JSON.stringify(editor.getContents(0, Infinity));
    overviewDefault.value = editor.root.innerText.slice(0, 120) + "..."
    localStorage.setItem("dataState", JSON.stringify(dataState));
    console.log(overviewDefault.value);
  }

  function cancelHandler(){
    router.replace("/");
  }

 function nextHandler(){
  if(!dataState.title || dataState.title.length < 20 || dataState.title.length > 80){
    return;
  }
  if(stateIndex.value < states.length-1){
    stateIndex.value++;
    editingState.value = states[stateIndex.value];
  }
 }
 function prevHandler(){
   if(stateIndex.value == 0) return;
  if(stateIndex.value > 0){
    stateIndex.value--;
    editingState.value = states[stateIndex.value];
  }
 }

</script>

<style scoped lang="scss">
  @use "@/views/scss/scheme" as S;
  .editing_page{

    &--container{
      background : hsl(180, 20%, 97%);
      width : 100%;
      height : calc(100% - 50px - 50px);
      padding : 0px 5px;
      overflow : hidden;
    }
    &--actions{
      width : auto;
      height: 50px;
      display : flex;
      justify-content: space-around;
      align-items: center;
      margin : auto;
      position : absolute;
      bottom : 0;
      right : 0;
    }
    &--action{
      padding : 7px 15px;
      border : none;
      border-radius: 2px;
      box-shadow: S.$shadow;
      margin: 0px 6px;
      transition : all .2s 0s ease-in-out;
      cursor: pointer;
      &-confirm {
        // background : linear-gradient(to bottom, hsl(231, 80%, 57%) 20%, hsl(211, 90%, 60%), hsl(221, 90%, 60%));
        background :  hsl(231, 80%, 57%);
        color : white;
        font-weight: 600;
        &:hover{
          background :  hsl(225, 90%, 57%);
          // background : linear-gradient(to bottom, hsl(231, 80%, 57%) 0%, hsl(211, 90%, 60%), hsl(221, 90%, 60%));
        }
      }
      &-cancel {
        font-weight: 600;
          background : hsl(0, 100%, 92%);
          color : hsl(0, 100%, 69%);
          border : 1px hsl(0, 100%, 69%) solid;
        &:hover{
          background : hsl(0, 100%, 84%);
          // background : linear-gradient(to bottom, hsl(231, 80%, 57%) 0%, hsl(211, 90%, 60%), hsl(221, 90%, 60%));
        }
      }
      &-previous {
        background :  hsl(231, 80%, 57%);
        color : white;
        font-weight: 600;
        &:hover{
          background : hsl(0, 100%, 89%);
          // background : linear-gradient(to bottom, hsl(231, 80%, 57%) 0%, hsl(211, 90%, 60%), hsl(221, 90%, 60%));
        }
      }
      &:hover{
        box-shadow : none;
      }
    }
    &--header{
      width : 90%;
      margin : auto;
      display : flex;
      justify-content: space-between;
      align-items: center;
    }
    &--title{
      border : none;
      border-bottom: 1px rgb(208, 208, 208) solid;
      border-left: 1px rgba(208, 208, 208, 0.426) solid;
      background : transparent;
      padding : 0px 4px;
      width : 70%;
      height : 40px;
      outline : none;
      transition : padding .3s 0s ease-in;
      transition : font-size .2s 0s ease-in;
      // position :relative;
      // transform: translateX(-50%);
      // left : 50%;
      font-weight: 100;
      &:focus{
        border-bottom: 2px rgba(88, 82, 144, 0.735)solid;
        padding : 30px 4px;
        font-size: 18px;
        font-weight: 100;
      }
    }
    &--thumbnailBtn{
      padding : 7px 15px;
      border : none;
      border-radius: 2px;
      // box-shadow: 1px 3px 5px rgba($color: #000000, $alpha: 1);
      box-shadow: S.$shadow;
      transition : all .2s 0s ease-in-out;
      cursor: pointer;
      // background : linear-gradient(to bottom, hsl(231, 80%, 57%) 20%, hsl(211, 90%, 60%), hsl(221, 90%, 60%));
      background :  hsl(231, 80%, 57%);
      color : white;
      font-weight: 600;
      &:hover{
        background :  hsl(225, 90%, 57%);
        // background : linear-gradient(to bottom, hsl(231, 80%, 57%) 0%, hsl(211, 90%, 60%), hsl(221, 90%, 60%));
      }
    }
  }

  @media (min-width : 700px){
    .editing_page{
      &--actions{
        width : 30%
      }
    }
  }

</style>