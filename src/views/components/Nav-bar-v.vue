<template>
  <nav class="navbar">
    <router-link to ="/" class="navbar--link" exact>Home</router-link>
    <router-link to="/about" class="navbar--link">About</router-link>
    <router-link to="/users" class="navbar--link">Find Author</router-link>
    <router-link to="/links" class="navbar--link">Links</router-link>
    <router-link to="/articles/new" class="navbar--link">New Article</router-link>
  </nav>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  @import "@/views/scss/scheme";
  .navbar{
    text-align: center;
    &--link{
      width : fit-content;
      margin : 20px auto;
      display : block;
      padding : 8px 10px;
      color : black;
      text-decoration : none;
      cursor : pointer;
    } 
  }
  .router-link-active{
    color : black;
    background : white;
    border : 2px black solid;
    box-shadow : 1px 5px 15px rgba(0, 0, 0, 0.2);
  }


  @media (min-width : 700px) {
    .navbar{
      height : 100%;
      width : 50%;
      display : flex;
      justify-content: space-around;
      align-items: center;
      &--link{
        padding : 0px;
        background : unset;
        box-shadow : unset;
      }
    }
    .router-link-active{
      border : unset;
      color : green;
      background : unset;
      box-shadow : unset;
    }
  }
</style>
