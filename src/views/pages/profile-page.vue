<template lang="html">
  <div class="profile">
    <EditProfile v-if="editMode" @falsifyEditMode="toggleMode"/>
    <img :src="userCoverPic" alt="" class="profile--cover" v-if="userCoverPic">
    <div class="profile--cover" :style="{background : coverColor}" v-else></div>
    <div class="profile--card">
      <h3 class="profile--name">{{user?.username}}</h3>
      <img src="#" alt="" class="profile--pic">
      <button @click="toggleMode" class="profile--edit">Edit infos <FileEdit/></button>
      <p class="profile--status">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      <p class="profile--joined">member since {{(user?.joinedAt as string).slice(4, (user?.joinedAt as string).indexOf(" ", 14)).split(" ").join("-")}}</p>
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

  import EditProfile from "@/views/components/edit-profile.vue";
  import ArticleCard from "@/views/components/article-card.vue";
  import ErrorDOM from "@/views/components/custom-error-DOM.vue";
  import useUserStore from "@/store/user.store";
  import useLayoutStore from "@/store/layout.store";
  import { useRoute, useRouter } from "vue-router";
  import {defineProps, onMounted, onBeforeMount, computed, ref, Ref} from "vue";
  import {IUser} from '@/types/user'

  let route = useRoute();
  let router = useRouter();
  let userStore = useUserStore();
  let layoutStore = useLayoutStore();
  let isMe = ref(/my-profile/igm.test(route.path));
  let {id} = route.params;
  let user : Ref<IUser | null> = ref(null);
  
  onMounted(()=>{
    
    isMe.value ? (()=> {
      user.value = userStore.user;
      userStore.setIsNewUser(false);
    })() : getUser();

  })

  async function getUser(){
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
          throw new Error("user id not valid");
        }
      } catch (e) {
        layoutStore.showError((e as Error).message);
      }
  } 

  let userCoverPic = "";
  let color = `hsl(${Math.floor(Math.random() * 359)}, 80%, 50%)`;
  let storedColor = localStorage.getItem("coverColor");
  let coverColor = (storedColor || color) as string;
  if(!storedColor){
    localStorage.setItem("coverColor", color);
  }
  let editMode = ref(userStore.isNewUser);
  function toggleMode(e : MouseEvent){
    editMode.value = !editMode.value;
    console.log(editMode.value)
  }


</script>


<style lang="scss" scoped>
  @use "@/views/scss/scheme" as S;
  
  .profile{
    height : 100%;
    width : 100%;
    &--cover{
      height : 220px;
      box-shadow: 0px 2px 5px rgba(black, 0.2); 
    }
    &--card{
      display : grid;
      height: 200px;
      grid-template-columns : 1fr 1fr 1fr;
      grid-template-rows: auto auto 60px 60px;
      grid-template-areas: "name  profilePic ."
                           "  .     edit     ."
                           "status status status"
                           "  joined  joined  joined";
    }
    &--name {
      grid-area: name;
      display : flex;
      justify-content : center;
      align-items : center;
    }
    &--pic{
      grid-area : profilePic;
      width : 120px;
      height : 120px;
      border : 1px rgba(black, 0.1) solid;
      border-radius: 50%;
      transform : translateY(-60%);
    }
    &--edit{
      max-width : 160px;
      grid-area : edit;
      position : relative;
      transform : translate(0 ,-180%);
      padding : 6px 5px;
      border-radius : 50px;
      box-shadow : S.$shadow;
      border : 1px rgba(black, 0.1) solid;
      transition : box-shadow 0.2s 0s ease-in-out;
      display:  flex;
      justify-content : center;
      align-items : center;
      & > svg {
        font-size : 1.2em;
        margin-left : 5px;
      }
      &:hover{
        box-shadow: unset;
      }
    }
    &--status{
      grid-area : status;
      text-align : center;
    }
    &--joined{
      grid-area : joined;
      text-align : center;
      font-size : 14px;
    }
  }

</style>