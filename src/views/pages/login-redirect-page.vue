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

  onMounted(()=> {
    try{
      store.getUserCredentials();
    } catch(e){
      console.log(e)
    }
    setTimeout(() => {
      window.close();
    }, 3000);
    }
  )
  // onMounted(()=>{
  //   try {
  //     opener?.console.log("hello")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })
// async getUserCredentials() : Promise<void>{
//   let currentWindow = (opener || window);
//   let HttpClient = new HTTPClient(currentWindow)
//   try {
//     const response = await HttpClient.call("http://localhost:4000/me", {method : "GET"});
//     currentWindow.console.log(response);
//     //if response has an ID means we have a User
//     if((response as User).id){
//       this.setUser(response as User);
//       currentWindow.console.log("response : ", response);
//       storeUser(currentWindow, response);
//       if(opener){
//         window.close();
//       }
//       currentWindow.history.replace('/');
//       // router.replace("/");
//     //else we have Error login instead
//     } else {
//       this.setLoginError(true);
//       this.setLoginErrorMsg(response as string);
//       if(opener){
//         window.close();
//       }
//       // router.replace("/login");
//       currentWindow.history.replace('/');
//       setTimeout(() => {
//         this.loginError = false;
//         this.loginErrorMsg = "";
//       }, 10000);
//     }
//     } catch (error) {
//       this.setLoginError(true);
//       this.setLoginErrorMsg((error as Error).message);
//       currentWindow.console.log((error as Error).stack);
//     }
//   }

</script>
