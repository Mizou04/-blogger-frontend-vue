<template>
<div>
  <h1>hello VUE APP</h1>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name : "c-Homepage",
  setup() {
    return {
      h : "hello"
    }
  },
})
</script>


