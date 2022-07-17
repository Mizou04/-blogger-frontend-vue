<template lang="html">
  <div class="profile">
    <img :src="userPic" alt="" class="profile--cover" v-if="userPic">
    <div class="profile--cover" :style="{background : coverColor}" v-else></div>
    <div class="profile--card">
      <h3 class="profile--name">{{props.user.name}}</h3>
      <img src="" alt="" class="profile--pic">
      <p class="profile--status">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      <p class="profile--joined">{{props.user.joinedAt}}</p>
    </div>
    <div class="profile--articles">
      <div class="articles--caroussel">
       <ArticleCard :props="fakeArticleProps"/>
       <ArticleCard :props="fakeArticleProps"/>
       <ArticleCard :props="fakeArticleProps"/>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import ArticleCard from "@/views/components/article-card.vue";
  import useUserStore from "@/store/user.store";
  import { useRoute } from "vue-router";
  import {User} from "@/types/user"
  import {defineProps} from "vue";
  
  let route = useRoute();
  let userStore = useUserStore();
  let isMe = route.path.match(/my-profile/igm);
  let props = isMe ? userStore : defineProps<{user : Partial<User>}>();

  
  let userPic = "";
  let color = `hsl(${Math.floor(Math.random() * 359)}, 80%, 50%)`;
  let storedColor = localStorage.getItem("coverColor");
  let coverColor = (storedColor || color) as string;
  if(!storedColor){
    localStorage.setItem("coverColor", color);
  }


let fakeArticleProps = {id : 123,
                  title : "articlessssssssssssssssssssssssss1",
                  subtitle : "some content"
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
      // grid-template-areas: 'name pic .'
      //                     '. status .';
      grid-template-columns: 1fr 1fr;
      box-shadow: S.$shadow;
      position : relative;
    }
    &--pic{
      position : absolute;
      border-radius: 50%;
      height : 160px;
      width : 160px;
      background : red;
      position : relative;
      // left : 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    &--name{
      text-transform: capitalize;
      padding-left: 20px;
      padding-top: 20px;
    }
    &--status{
      width : minmax(320px, 500px);
      text-align: center;
      position : relative;
      left : 100%;
      transform: translateX(-50%) translateY(-120%);

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
      align-items: center;
      gap: none;
      &--cover{
        height : 100%;
        width : 20%;
        box-shadow: S.$shadow inset;
      }
      &--card{
        display : block;
        position: static;
        height : 100%;
        width : 20%;
        text-align: center;
      }
      &--pic{
        position : unset;
        transform : unset;
        order : 1;
      }
      &--name{
      text-transform: capitalize;
      padding-left: 20px;
      padding-top: 20px;
      }
      &--status{
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