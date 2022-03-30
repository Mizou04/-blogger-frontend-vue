<template>
  <div class="form--container">
    <form @submit.prevent="submit" ref="myForm" @change="change({name, username, email})" class="form" method="POST" action="http://localhost:3000/user">
      <input required v-model.trim="name" type="text" name="name" placeholder="Your Name">
      <input required v-model.trim="username" type="text" name="username" placeholder="Your Username">
      <input required v-model.trim="email" type="text" name="email" placeholder="Your Email">
      <button @click.prevent="submit($event)"  type="submit">Sign up</button>
    </form>
    <!-- <h1>YOU SEE ME?</h1> -->
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref} from 'vue';

let myForm = ref();
let name = ref("");
let username = ref("");
let email = ref("");

function submit(e : Event){
  e.preventDefault();
  (myForm.value as HTMLFormElement).submit();
}

function change(){
  // userFormData = {...data};
  console.log(name.value, username.value, email.value);
}

// export default defineComponent({
//   setup(props, ctx) {
//     return {change, submit, myForm, name, username, email}
//   },
// })
</script>


<style lang="scss" scoped>
.form{
  &--container{
    width : 300px;
    height : 300px;
  }
  width : 100%;
  height : 100%;
}
</style>