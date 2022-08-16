<!-- choose title and thumbnail -->

<template lang="html">
  <div class="article__metadata">
    <div style="position: relative">
      <input 
        :aria-valuemax="maxLength" 
        @input="changeHandler" 
        ref="titleRef" 
        :value="props.source.title" 
        :style="maxLength - lengthLeft > 0 && maxLength - lengthLeft < 20 ? {borderBottom : '2px rgba(255, 82, 144, 0.735) solid'} : ''"
        class="article__metadata--input article__metadata--input-title" type="text"  name="title" placeholder="title here...">
      <p style="position: absolute; right : 30px; bottom : 0px; font-size: .8em;">{{`${lengthLeft}/${maxLength}`}}</p>
      <br/><span>{{maxLength - lengthLeft > 0 && maxLength - lengthLeft < 20 ? 'should be between 20 and 80 characters long' : ''}}</span>
    </div>
      
    <div class="article__metadata--img">
      <div v-if="!props.source.thumbnail || props.source.thumbnail.match(/#[0-9A-F]{6}|#[0-9A-F]{3}|rgba?\(|hsla?\(/gim)" :style="{background : props.source.thumbnail}" class="article__metadata--img-overview">
        {{props.source.title}}
      </div>
      <img v-else class="article__metadata--img-overview" :src="props.source.thumbnail"/> 
      <button class="article__metadata--btn article__metadata--btn-addImg">Add Thumbnail</button> 
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useLayoutStore from "@/store/layout.store";
  import { defineProps, defineEmits, ref, Ref, onMounted } from "vue";
  import {IBlogPost} from "@/types/blogPost"

  let layoutStore = useLayoutStore();
  let props = defineProps<{source : Pick<IBlogPost, 'title' | 'thumbnail'>}>();
  let emits = defineEmits(["titleEdit"]);

  let titleRef : Ref = ref("");
  let maxLength = ref(80);
  let lengthLeft = ref(maxLength.value);

  onMounted(() => {
    (titleRef.value as HTMLInputElement).focus()
  })

  function changeHandler(e : Event){
    e.preventDefault();
    let value = (e.target as HTMLInputElement).value.trim();
    emits("titleEdit", value);
    lengthLeft.value = maxLength.value - value.length;
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
      width : 95%;
      height : 40px;
      outline : none;
      transition : padding .3s 0s ease-in;
      transition : font-size .2s 0s ease-in;
      margin : auto;
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
    &--img{
      position : relative;
      width : min(90%);
      height : 360px;
      margin : auto;
      &-overview{
        height : 360px;
        width : 100%;
        margin-top: 10px;
        outline : none;
        border-radius: 4px;
        //if image src is actually a linear gradiant or color in general
        padding : 0px 10px;
        font-family: cambria;
        font-size: 8vw;
        color : black;
        text-transform: uppercase;
        font-weight : 600;
        text-align : center;
        display : flex;
        justify-content: center;
        word-break: break-word;
        align-items : center;
      }
    }
    &--btn{
      padding : 7px 15px;
      position : absolute;
      top : 50%;
      left : 50%;
      transform : translate(-50%, -50%);
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
