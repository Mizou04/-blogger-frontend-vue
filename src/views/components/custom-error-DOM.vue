<template lang="html">
  <div :style="props.style" :class="props.class || 'page_error'">
    <p class="page_error--msg">{{props.msg || route.params.msg}}</p>
  </div>
</template>


<script lang="ts" setup>
import {StyleHTMLAttributes, defineProps, onMounted} from "vue"
import {useRoute} from "vue-router"
  const route = useRoute();
  const props = defineProps<{ 
    msg : string,
    style? : StyleHTMLAttributes,
    class? : string
  }>()

onMounted(()=>{
  console.log('hiiiiii')
})

</script>

<style lang="scss">
  .page_error{
    background : rgb(255, 80, 80);
    text-align: center;
    border : 2px rgb(220, 3, 3) solid;
    position : fixed;
    display : flex;
    justify-content : center; 
    align-items : center;
    top : 40px;
    left : 0;
    height : 80px;
    width : 100vw;
    z-index : 1000000;
    &--msg{
      color : rgb(220, 3, 3);
      font-size: 1.1em;
      width : 100%;
      height : auto;
    }
  }
</style>