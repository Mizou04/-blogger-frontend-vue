<!-- choose title and thumbnail -->

<template lang="html">
  <div class="article__metadata">
    <input @input="changeHandler" ref="titleRef" v-model="props.source.title" class="article__metadata--input article__metadata--input-title" type="text"  name="title" placeholder="title here...">
    <img class="article__metadata--img-overview" src="null"/> 
    <button v-if="!props.source.thumbnail" class="article__metadata--btn article__metadata--btn-addImg" :src="props.source.thumbnail">Add Thumbnail</button> 
    <button v-else class="article__metadata--btn">Cancel</button> 
  </div>
</template>

<script lang="ts" setup>
  import useLayoutStore from "@/store/layout.store";
  import { defineProps, defineEmits, ref, Ref, onMounted } from "vue";
  import {IBlogPost} from "@/types/blogPost"

  let layoutStore = useLayoutStore();
  let props = defineProps<{source : Pick<IBlogPost, 'title' | 'thumbnail'>}>();
  let emits = defineEmits(["titleEdit"]);

  let titleRef : Ref = ref(null)

  onMounted(() => {
    (titleRef.value as HTMLInputElement).focus()
  })

  function changeHandler(e : Event){
    e.preventDefault();
    emits("titleEdit", (e.target as HTMLInputElement).value);
  }

</script>

<style lang="scss">
  @use "@/views/scss/scheme" as S;

  .article__metadata{
    position : relative;
    &--input{
      border : none;
      border-bottom: 1px rgb(208, 208, 208) solid;
      border-left: 1px rgba(208, 208, 208, 0.426) solid;
      background : transparent;
      padding : 0px 4px;
      width : 100%;
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
    &--img-overview{
      height : 360px;
      width : min(380px, 100%);
      margin-top: 10px;
      outline : none;
      border-radius: 4px;
    }
    &--btn{
      padding : 7px 15px;
      position : absolute;
      top : 50%;
      left : 50%;
      transform : translate(-50%);
      &-addImg{
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
  }
  
</style>
