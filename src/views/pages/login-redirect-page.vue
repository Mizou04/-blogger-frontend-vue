<template lang="html">
  <div>
    <a href="" @click.prevent="window.close()">close this popup if not closed in 3 seconds</a>
  </div>
</template>

<script setup lang="ts">
  import {onMounted} from "vue"
  import {useRouter, useRoute} from "vue-router"
  import useUserStore from "@/store/user.store"
  import {User} from "@/types/user";

  const store = useUserStore();
  const router = useRouter();

  onMounted(async ()=>{
    try {
      const response = await opener?.fetch("http://localhost:4000/me", {method : "GET"});
      //if response has an ID means we have a User
      const resJson : User | string = await response.json();
      opener.console.log(resJson);
      if((resJson as User).id){
        store.setUser(resJson as User);
        opener.console.log("resJson");
        opener.localStorage.setItem("user",JSON.stringify(resJson));
        // opener.history.push()
        router.replace("/");
      //else we have Error login instead
      } else {
        store.setLoginError(true);
        store.setLoginErrorMsg(resJson as string);
        router.replace("/");
        setTimeout(() => {
          store.loginError = false;
          store.loginErrorMsg = "";
        }, 10000);
      }
    } catch (error) {
      store.setLoginError(true);
      store.setLoginErrorMsg((error as Error).message);
      opener.console.log((error as Error).stack);
    }
    setTimeout(() => {
      window.close();
    }, 3000);
  })
  // onMounted(()=>{
  //   try {
  //     opener?.console.log("hello")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })


</script>
