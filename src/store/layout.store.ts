import {defineStore} from "pinia";
import {ref} from "vue"
export default defineStore("layout", {
  state :()=>{
    return {
      isDesktop : window.innerWidth > 700,
      drawerIsOpen : false,
      isError : false,
      errorMsgDOM : "",
      headerVisibility : true
    }
  },
  actions : {
    toggleDesktop(){
      this.isDesktop = window.innerWidth > 700;
    },
    toggleHeader(){
      this.headerVisibility = !this.headerVisibility;
    },
    showError(msg : string){
      this.isError = true;
      this.errorMsgDOM = msg;
    },
    hideError(){
      this.isError = false;
      this.errorMsgDOM = "";
    },
    openDrawer(){
      this.drawerIsOpen = true;
    },
    closeDrawer(){
      this.drawerIsOpen = false;
    }
  },
  
})