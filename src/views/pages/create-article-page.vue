<template lang="html">
  <div class="editing_page--container">
    <ArticleMetadataInput v-if="editingState == 'title'" @titleEdit="changeTitleHandler" :source="dataState"/>
    <TextEditor @textChange="changeContentHandler" :text="dataState.content" v-else-if="editingState == 'editing'"/>
    <ArticleOverviewStep :text="dataState.overview" @textChange="changeOverviewHandler" v-else-if="editingState == 'overview'"/>
    <ArticlePreviewStep :blogpost="dataState" v-else/>
    <div class="editing_page--actions">
      <button @click="cancelHandler" class="editing_page--action editing_page--action-cancel">Cancel</button>
      <button v-if="stateIndex > 0" @click="prevHandler" class="editing_page--action editing_page--action-previous">Previous</button>
      <button v-if="editingState == 'preview'" @click="submitHandler" class="editing_page--action editing_page--action-confirm">Confirm</button>
      <button v-else @click="nextHandler" class="editing_page--action editing_page--action-confirm">{{editingState == "overview" ? 'preview text' : 'Next'}}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Ref, ref, reactive } from "vue";
  import {} from 'mdue';

  import useLayoutStore from "@/store/layout.store";
  import useUserStore from "@/store/user.store";
  
  import { IBlogPost } from "@/types/blogPost";
  import { useRouter } from 'vue-router'
  import Quill from "quill"
  
  import ArticleMetadataInput from "@/views/components/article-title-thumbnail-step.vue"
  import TextEditor from "@/views/components/text-editor.vue";
  import ArticleOverviewStep from "@/views/components/article-overview-step.vue"
  import ArticlePreviewStep from "@/views/components/article-preview-step.vue"

  type IEditingPhase = "title" | "editing" | "overview" | "preview";
  
  let stateIndex = ref(0);
  let states : IEditingPhase[] = ["title", "editing", "overview", "preview"];
  let editingState : Ref<IEditingPhase> = ref(states[stateIndex.value]);
  
  let router = useRouter();
  let layoutStore = useLayoutStore();
  let userStore = useUserStore();
  let storedDataState = JSON.parse(sessionStorage.getItem("dataState") as string) as IBlogPost;
  let dataState = reactive<IBlogPost>({
    title : storedDataState?.title || '',
    id : storedDataState?.id || '',
    owner : {
      profilePic : userStore.user?.profilePic + "",
      email : userStore.user?.email + "",
      id : userStore.user?.id + "",
      username : userStore.user?.username + ""
    },
    content : storedDataState?.content || '',
    createdAt : storedDataState?.createdAt || '',
    lastModified : storedDataState?.lastModified || '',
    overview : storedDataState?.overview || '',
    thumbnail : storedDataState?.thumbnail || generateColor(),
    likes : {length : 0, data : new Set<string>()},
    comments : {length : 0, data : {}},
  });

  function changeTitleHandler(v : string){
    dataState.title = v;
    sessionStorage.setItem("dataState", JSON.stringify(dataState))
    if(dataState.title.length > 80){
      dataState.title = dataState.title.substring(0, 80);
      return;
    }
  }
  function changeContentHandler(editor : Quill){
    dataState.content = JSON.stringify(editor.getContents(0, Infinity));
    dataState.overview = editor.root.innerText.slice(0, 120) + "...";
    sessionStorage.setItem("dataState", JSON.stringify(dataState));
  }

  function changeOverviewHandler(text : string){
    dataState.overview = text;
    sessionStorage.setItem("dataState", JSON.stringify(dataState));
  }

  function generateColor(){
    let randomNum : string = (Math.floor(Math.random() * 360)).toString();
    return `hsl(${randomNum}, 100%, 60%)`
  }

  function cancelHandler(){
    let getconfirm = confirm("do you wanna cancel editing?")
    if(getconfirm){
      sessionStorage.removeItem("dataState");
      router.replace("/");
    }
  }

  function nextHandler(){
    if(
      ( editingState.value == "title" && (!dataState.title || dataState.title.length < 20 || dataState.title.length > 80)) ||
      ( editingState.value == "overview" && (dataState.overview.length < 20 || dataState.overview.length > 123 )) ||
      ( editingState.value == "editing" && (dataState.content.length < 120))
      ){
        if(editingState.value == "title"){
          alert("title must be present")
        }
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


  async function submitHandler(){
    let dataStateString = JSON.stringify(dataState);
    try {
      let postReq = await fetch(process.env.NODE_ENV == "development" ? "http://localhost:4000/articles/new" : "/articles/new", 
      {
        body : dataStateString,
        method : "POST", 
        credentials : "include",
          headers : {
            'Accept' : 'application/json,text/html',
            'Content-type' : 'application/json'
          },
          'referrer' : ''
      });
      let json = await postReq.json();
      if(!/success/igm.test(json.title)){
        throw new Error(json.msg)
      } 
      alert(json.msg);
      router.replace({name : "home"});
      sessionStorage.removeItem("dataState");
    } catch (error) {
      layoutStore.showError((error as Error).message);
    }
  }

</script>

<style scoped lang="scss">
  @use "@/views/scss/scheme" as S;
  .editing_page{

    &--container{
      background : hsl(180, 20%, 97%);
      width : 100%;
      height : calc(100% - 50px - 0px);
      padding : 0px 5px 20px 5px;
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
      padding : 10px;
      margin-top : 10px;
      bottom : -10px;
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