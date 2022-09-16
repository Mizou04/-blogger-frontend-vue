<template lang="html">
  <div class="profile">
    <img :src="userCoverPic" alt="" class="profile--cover" v-if="userCoverPic">
    <div class="profile--cover" :style="{background : coverColor}" v-else></div>
    <div class="profile--card">
      <h3 class="profile--name">{{user?.username}}</h3>
      <img src="" alt="" class="profile--pic">
      <p class="profile--status">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      <p class="profile--joined">member since {{(user?.joinedAt as string).slice(4, (user?.joinedAt as string).indexOf(" ", 14)).split(" ").join("-")}}</p>
      <button class="profile--edit">Edit infos <FileEdit/></button>
    </div>
    <div class="profile--articles">
      <div class="articles--caroussel">
       <ArticleCard v-for="post of user?.blogPosts" :key="post.id" :article="post"/>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { FileEdit } from "mdue";

  import ArticleCard from "@/views/components/article-card.vue";
  import ErrorDOM from "@/views/components/custom-error-DOM.vue";
  import useUserStore from "@/store/user.store";
  import useLayoutStore from "@/store/layout.store";
  import { useRoute, useRouter } from "vue-router";
  import {defineProps, onMounted, ref, Ref} from "vue";
  import {IUser} from '@/types/user'

  let route = useRoute();
  let router = useRouter();
  let userStore = useUserStore();
  let layoutStore = useLayoutStore();
  let isMe = route.path.match(/my-profile/igm);
  let {id} = route.params;
  let user : Ref<IUser | null> = ref(isMe ? userStore.user : null);
  
  isMe || onMounted(async ()=>{
    try {
        const req = await fetch("http://localhost:4000/users/"+ id, 
        {
          credentials : "include",
          headers : {
            'Accept' : 'application/json,text/html',
          },
          'referrer' : ''
        }
        );
        const res = await req.json();
        if((res.data as IUser).id){
          user.value = res.data;
        } else {
          throw "user id not valid"
        }
      } catch (e) {
        layoutStore.showError((e as Error).message);
        console.log(e)
      }

  })

  let userCoverPic = "";
  let color = `hsl(${Math.floor(Math.random() * 359)}, 80%, 50%)`;
  let storedColor = localStorage.getItem("coverColor");
  let coverColor = (storedColor || color) as string;
  if(!storedColor){
    localStorage.setItem("coverColor", color);
  }



</script>


<style lang="scss" scoped>
  @use "@/views/scss/scheme" as S;
  .profile{
    &--cover{
      height : 220px;
      box-shadow: S.$shadow;
    }
    &--card{
      height :  220px;
      display : grid;
      box-shadow: S.$shadow;
      position : relative;
      grid-template-columns: 1fr auto 1fr;
      grid-template-rows: auto min(30%, 100%) 1fr;
      // *{
      //   border : 1px blue solid;
      // }
    }
    &--name{
      text-align: center;
    }
    &--pic{
      transform : translateY(-50%);
      border-radius: 50%;
      height : 140px;
      width : 140px;
    }
    &--status{
      transform : translateY(-50%);
      grid-column-start: 1;
      grid-column-end: 4;
      text-align: center;
    }
    &--joined{
      transform : translateY(-50%);
      grid-column-start: 1;
      grid-column-end: 4;
      text-align: center;
    }
    &--articles{
      height : 320px;
      display : flex;
      flex-direction: column;
      height : auto;
      background : rgb(181, 181, 184);
      padding : 20px 6px;
    }
  }
  .articles--caroussel{
    height : 300px;
    display : flex;
    overflow-x: scroll;
  }

  @media (min-width : 700px){
    .profile{
      height : 100vh;
      scroll-padding-top: 50px;
      display : flex;
      align-items: flex-start;
      gap: none;
      &--cover{
        height : 100%;
        width : 20%;
        box-shadow: S.$shadow inset;
      }
      &--card{
        display : flex;
        position: static;
        height : 50%;
        width : 20%;
        text-align: center;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding-top: 15px;
        box-shadow: unset;
      }
      &--pic{
        position : unset;
        transform : unset;
        order : 1;
      }
      &--name{
        text-transform: capitalize;
        // padding-left: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        order : 2;
      }
      &--status {
        order : 3
      }
      &--joined {
        order : 4
      }
      &--status, &--joined{
        width : minmax(320px, 500px);
        text-align: center;
        position : static;
        transform : unset;
        left : unset;
      }
      &--articles{
        width : 60%;
        height : 100%;
      }
    }
  }
  
</style>