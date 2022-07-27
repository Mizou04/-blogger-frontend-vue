<template lang="html">
  <button @click="logoutHandler">logout</button>
</template>


<script lang="ts" setup>
  import useUserStore from '@/store/user.store'
  import { useRouter } from "vue-router";
  
  const userStore = useUserStore();

  async function logoutHandler(e : Event){
    e.preventDefault();
    try {
      await fetch("http://localhost:4000/logout", {method : "POST", credentials : "include", redirect : "follow", referrerPolicy : "no-referrer"});
      // let res = await req.json();
      // useRouter().push("http://localhost:4000/logout")
      userStore.setUser(null);
      useRouter().push("/");
    } catch (e) {
      console.log(e)
    }
  }

</script>

<style lang="scss" scoped>
@mixin position($pos : after){
  &::#{$pos}{
    content : "";
    opacity : 0;
    box-shadow: 0px 2px 5px rgba(black, .15);
  }
}
  button{
    background : linear-gradiant(to bottom, hsl(0, 100%, 60%), hsl(0, 80%, 60%));
    color : black;
    padding : 5px 15px;
    text-align: center;
    box-shadow: 0px 2px 5px rgba(black, .15);
    @include position(before)
  }
  
</style>