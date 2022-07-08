<template lang="html">
  <router-link >
    <slot>some content here</slot>
  </router-link>
</template>

<script lang="ts" setup>
  import {useRoute} from "vue-router"

  let {} = useRoute();
</script>

<style scoped lang="scss">
</style>