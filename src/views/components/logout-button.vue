<template lang="html">
  <a href="http://localhost:4000/logout" @click.prevent="logoutHandler">logout</a>
</template>


<script lang="ts" setup>
  import useUserStore from '@/store/user.store'
  import { useRouter } from "vue-router";
  
  const userStore = useUserStore();
  const router = useRouter();

  async function logoutHandler(){
    try {
      await fetch("http://localhost:4000/logout", {method : "POST", credentials : "include", referrerPolicy : "no-referrer",mode : process.env.NODE_ENV == "production" ? "cors" : "no-cors", headers : {'Access-Control-Allow-Origin' : "cross-origin"}});
      // let res = await req.json();
      router.push("/")
      userStore.setUser(null);
      userStore.setIsNewUser(false);
      // useRouter().push("/");
    } catch (e) {
      console.log(e)
    }
  }

</script>

<style lang="scss" scoped>
  @use "@/views/scss/scheme" as S;
  @mixin position($pos : after){
  &::#{$pos}{
    content : "";
    // height : 100%;
    // width : 30px;
    // opacity : 1;
    // box-shadow: 0px 0px 5px rgba(black, 1);
    // position : absolute;
    // left : 0px;
    // top : 0px;
    // transform : scale(1.2);
  }
}
  a{
    // background : linear-gradient(to bottom, hsl(0, 100%, 55%), hsl(0, 90%, 54%));
    background : S.$buttons--color-cta;
    box-shadow : S.$shadow;
    color : white;
    border-radius: 4px;
    padding : 7px 35px;
    text-decoration : none;
    text-align: center;
    box-shadow: 0px 2px 5px rgba(black, .15);
    position : relative;
    animation : zoom 3s 0s infinite linear;
    @include position(before);
  }

  
</style>