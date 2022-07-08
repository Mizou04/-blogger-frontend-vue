import {defineStore} from "pinia";
import {ref} from "vue"
export default defineStore("layout", {
  state :()=>{
    return {
      isDesktop : window.innerWidth > 700,
      drawerIsOpen : false
    }
  },
  actions : {
    toggleDesktop(){
      this.isDesktop = window.innerWidth > 700;
    },
    openDrawer(){
      this.drawerIsOpen = true;
    },
    closeDrawer(){
      this.drawerIsOpen = false;
    }
  },
  
})