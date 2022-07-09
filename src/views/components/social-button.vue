<template lang="html">
  <router-link :to="'/' + social">
    <button :class="`button--social ${social ? 'button--social-'+social : ''}`">Login with {{social}}</button>
  </router-link>
</template>

<script lang="ts" setup>
  import {defineProps} from "vue"

  defineProps<{social : string}>()

  function clickHandler(e : MouseEvent){
    window.open(process.env.product)
  }

</script>


<style lang="scss">
  .button{
    &--social{
      border : 2px black solid;
      width : min(400px, 80%);
      padding : 10px;
      position : relative;
      margin : auto;
      font-size: 1.4em;
      font-weight: 700;
      background : white;
      border-radius: 5px;
      cursor : pointer;
      box-shadow: 1px 2px 5px rgba(16, 17, 23, 0.164);
      transition : all 0.3s 0s ease;
      &:hover{
        box-shadow: unset;
      }
      &-facebook{
        background : blue;
        color : white;
        text-shadow : 1px 1px 2px black
      }
      &-google{
        background : white;
      }
    }
  }
</style>