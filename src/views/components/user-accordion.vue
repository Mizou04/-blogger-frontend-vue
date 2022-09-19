<template lang="html">
    <details>
      <summary>
        {{name}}
      </summary>
      <div>
        <router-link to="/my-profile" v-slot="{navigate}">
        <button @click="navigate" class="accordion--profile">
          my profile
        </button>
      </router-link>
      <button href="http://localhost:4000/logout" class="accordion--profile" @click.prevent="logoutHandler">logout</button>
      </div>
    </details>
</template>

<script lang="ts" setup>
  import LogoutButton from "@/views/components/logout-button.vue";
  import useUserStore from '@/store/user.store'
  import { useRouter } from "vue-router";
  import {defineProps} from "vue"
  
  defineProps<{
    name : string
  }>();

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
  details{
    position : relative;
    padding : 5px 7px;
    cursor : pointer;
    & > summary{
      font-weight: 700;
      &::marker{
        font-size: .7em;
        transition : all 0.2s 0s ease-in-out;
      }
    }
    & > div{
      position : absolute;
      top : calc(100% + 10px);
      left : -15px;
      width : calc(100% + 20px);
      height : 120px;
      padding : 10px 7px;
      background : white;
      box-shadow: S.$shadow, -1px -2px 6px rgba(#000000, .1);
      text-align: center;
      border-radius : 6px;
    }
    & a {
      color : black;
      text-decoration: none;
    }
    & .accordion--profile{
      padding : 7px;
      width : 100%;
      border : none;
      font-size: 1em;
      font-weight: 100;
      transition : box-shadow 0.1s 0s ease-in-out;
      background : transparent;
      text-align : start;
      margin-top : 5px;
      &:hover{
        box-shadow: none; 
      }
    }
  }
  
</style>