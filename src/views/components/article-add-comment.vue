<template lang="html">
  <textarea @input="inputHandler" aria-valuemax="500">

  </textarea>
  <div class="actions">
    <div>
      <button class="actions--like"><ThumbUp/></button>
      <button class="actions--comment">comment</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineEmits, defineProps } from "vue";
  import { ThumbUp } from "mdue";
  
  let maxLength = ref(120);
  let lengthLeft = ref(maxLength.value);
  let emits = defineEmits<
  {
    (e : 'textChange', text : string) : void
  }>();
  
  function inputHandler(e : Event){
    let value = (e.target as HTMLTextAreaElement).value;
    emits('textChange', value);
    lengthLeft.value = maxLength.value - value.length;
  }

</script>

<style lang="scss">
  textarea{
    resize : none;
    width : 100%;
    height : 300px;
  }
  .actions{
    width : 100%;
    height : 50px;
    display : flex;
    justify-content: flex-end;
    & > div{
      width : 100px;
      height : 100%;
      display : flex;
      justify-content: space-around;
      align-items: center;
    }
  }
</style>