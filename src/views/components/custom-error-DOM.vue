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
  console.log(history.state)
})

</script>

<style lang="scss">
  .page_error{
    background : rgb(255, 80, 80);
    text-align: center;
    border : 2px rgb(220, 3, 3) solid;
    position : fixed;
    top : 0;
    left : 0;
    height : 40px;
    width : 100vw;
    &--msg{
      color : rgb(220, 3, 3);
      font-size: 1.1em;
      width : 100%;
      height : 100%;
    }
  }
</style>