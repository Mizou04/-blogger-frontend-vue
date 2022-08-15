<template lang="html">
  <div>
    <textarea :aria-valuemax="maxLength" @input="inputHandler" :placeholder="`this is the setted overview : \n\n ->` + props.text + '\n\n\t      you can modify it now'">
    </textarea>
    <p>{{`${lengthLeft}/${maxLength}`}}</p>
  </div>
</template>


<script lang="ts" setup>
  import { ref, Ref, defineProps, defineEmits, onMounted } from "vue";

  let textAreaValue = ref("");
  let props = defineProps<{
    text : string
  }>();
  let maxLength = ref(120);
  let lengthLeft = ref(maxLength.value);

  let emits = defineEmits<
  {
    (e : 'textChange', text : string) : void
  }>()

  function inputHandler(e : Event){
    let value = (e.target as HTMLTextAreaElement).value;
    emits('textChange', value);
    lengthLeft.value = maxLength.value - value.length;
  }

  onMounted(() => {
    console.log(props.text)
  })

</script>

<style scoped lang="scss">
  @use "@/views/scss/scheme" as S;
  div{
    width : 100%;
    height : 360px;
    position : relative;
    padding : 5px;
  }

  div > textarea{
    width : 100%;
    height : 100%;
    padding : 5px;
    resize : none;
    margin-top: 40px;
    box-shadow : S.$shadow;
    font-family: sans-serif;
    font-size: 1em;
    &::placeholder{
      font-size: 1.2em;
      color : hsl(210, 7%, 94%);
    }
  }
  div > p{
    position: absolute;
    bottom : -20px;
    right : 20px;
    font-size: .8em;
  }
</style>