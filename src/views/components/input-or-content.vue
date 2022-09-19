<template lang="html">

  <div>
    <input class="input" @change="(e)=>changeHandler(userKey, (e.target as HTMLInputElement).value)" :value="content" v-if="!isEditMode">
    <p class="content" v-else>{{content}}</p>
    <button @click="switchEditMode">Edit field</button>
  </div>

</template>


<script lang="ts" setup>
  import { ref, Ref, InputHTMLAttributes, defineProps } from "vue";
  import { IUser } from "@/types/user";

  let isEditMode : Ref<boolean> = ref(true);
  defineProps<{
    content : string | undefined,
    userKey : keyof Pick<IUser, "name" | "username" | "coverPic" | "profilePic">,
    changeHandler : (k :  keyof Pick<IUser, "name" | "username" | "coverPic" | "profilePic">, v : string) => void
  }>()

  function switchEditMode(){
    isEditMode.value = !isEditMode.value
  }



</script>

<style lang="scss" scoped>
  @use "@/views/scss/scheme" as S;
  
  .base{
    width : 100%;
    height : 100%;
  }

  div{
    width : 100%;
    height : 55px;
    padding : 5px;
    display : flex;
    justify-content: center;
    align-items: center;
  }

  .input{
    @extend .base;
    font-size: 1em;
    font-weight: 100;
    height : 2.3em;
    text-transform: capitalize;
    padding : 0px 5px;
    padding-left: 10px;
    border-radius: 6px;
    border : none;
    border-radius: 5px;
    box-shadow: S.$shadow;

  }
  .content{
    @extend .base;
    font-weight: 100;
    height : 2.4em;
    text-transform: capitalize;
    border : none;
    box-shadow: S.$shadow;
    display : flex;
    justify-content: start;
    align-items: center;
    padding-left: 10px;
    border-radius: 5px;
  }

  button{
    margin-left: 7px;
    padding : 4px;
    border-radius: 2px;
    border : none;
    box-shadow: S.$shadow;
  }

</style>