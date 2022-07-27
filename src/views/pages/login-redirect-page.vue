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

  const userStore = useUserStore();
  const router = useRouter();

  onMounted(async ()=> {
    let myOpener = (opener || window);
    try{
      await userStore.getUserLogin(myOpener);
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
