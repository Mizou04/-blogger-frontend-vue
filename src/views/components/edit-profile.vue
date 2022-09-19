<template>
    <div class="element">
      <div class="element--container">
        <p class="title">Edit your Profile</p>
        <div class="element--inputs">
          <inputOrContent :changeHandler="changeHandler" userKey="name" :content="user?.name"/>
          <inputOrContent :changeHandler="changeHandler" userKey="username" :content="user?.username"/>
          <inputOrContent :changeHandler="changeHandler" userKey="coverPic" :content="user?.coverPic"/>
          <inputOrContent :changeHandler="changeHandler" userKey="profilePic" :content="user?.profilePic"/>
        </div>
      <div class="element--actions">
        <button @click="(e)=> $emit('falsifyEditMode')" class="element--btn element--btn-cancel">cancel</button>
        <button class="element--btn element--btn-confirm">confirm</button>
      </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
  import { reactive } from "vue";
  import { storeToRefs } from "pinia";
  import inputOrContent from "./input-or-content.vue"
  import useUserStore from "@/store/user.store";
  import { IUser } from "@/types/user";

  let {user} = storeToRefs(useUserStore());
  
  let userToChange = reactive({
    name : (user.value as IUser).name,
    username : (user.value as IUser).username,
    coverPic : (user.value as IUser).coverPic,
    profilePic : (user.value as IUser).profilePic
  })

  function changeHandler(userKey : keyof Pick<IUser, "name" | "username" | "coverPic" | "profilePic">, value : string){
    userToChange[userKey] = value;
    console.log(userToChange);
  }



</script>

<style lang="scss" scoped>
  @use "@/views/scss/scheme" as S;

  .element{
    width : 100vw;
    height : calc(100vh - 50px);
    display : flex;
    justify-content: center;
    align-items: center;
    background : rgba(0,0,0, .1);
    position : fixed;
    z-index: 10000;
    padding : 10px 5px;
    &--container{
      border : none;
      width : min(400px, 100%);
      height : 400px;
      background : linear-gradient(to bottom right, hsl(270, 100%, 50%), hsl(270, 100%, 60%));
      display : grid;
      grid-template-rows: 50px auto 50px;
      grid-row-gap: 10px;
      padding : 10px;
      border-radius: 5px;
      box-shadow: S.$shadow;
    }
    &--inputs{
      height : 70%;
      width : 100%;
      padding : 7px 5px;
      display : flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }
    &--actions{
      width : 100%;
      height : 100%;
      display : grid;
      grid-template-rows: 3;
      grid-template-areas: ". cancel confirm";
      grid-column-gap: 5px;
    }
    &--btn{
      width : 100%;
      height : 70%;
      background : unset;
      padding : 5px;
      box-shadow: S.$shadow;
      transition : box-shadow 0.1s 0s ease-in;
      font-weight: 200;
      font-size: 1em;
      border : none;
      border-radius: 5px;
      &-cancel{
        grid-area: cancel;
        background : lightgray;
        color : black;
      }
      &-confirm{
        grid-area: confirm;
        background : hsl(234, 100%, 50%);
        color : white;
        &:hover{
          background : hsl(234, 100%, 55%);
          font-weight: 300;
          box-shadow: 1px 1px 5px rgba(0,0,0, .02);
        }
      }
    }
  }

  @media (min-width : 700px){
    .element{
      &--container{
        height : 500px;
      }
    }
  }

</style>