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

  onMounted(async ()=> {
    try{
      await store.getUserCredentials();
      console.log(store.user)
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

</script>
