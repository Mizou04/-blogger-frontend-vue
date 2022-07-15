import {defineStore, _ActionsTree, StoreGetters, StoreState, _GettersTree} from "pinia"
import { UnwrapRef } from "vue"
import { User } from "@/types/user"
import {useRouter} from "vue-router"

const router = useRouter();

interface State{
  user : User,
  urls : {google : string , facebook : string},
  loginError : boolean,
  loginErrorMsg : string
}


interface Actions extends _ActionsTree{
  setUser(user : User) : void, 
  setLoginError(v : boolean) : void,
  setLoginErrorMsg(msg : string) : void,
}


export default defineStore<string, State, _GettersTree<State>, Actions>('user', {
  state : ()=>{
    return {
      user : {name : "", email : "", username : "", id : "", joinedAt : "", lastModified : "", providerId : ""} || JSON.parse(window.localStorage.getItem("user") as string),
      loginError : false,
      loginErrorMsg : "",
      urls : {
        // google : "http://localhost:4000/authentication/google",
        google : "/response",
        facebook : "http://localhost:4000/authentication/google"
      }
    }
  },
  actions: {
    setUser(user : User){
      this.$state = {...this.state, user : user};
    },
    setLoginError(v : boolean){
      this.$state = {...this.state, loginError : v};
    },
    setLoginErrorMsg(msg : string) {
      this.$state = {...this.state, loginErrorMsg : msg};
    }},
  getters : {
    Guser: (state) =>{
      return state.user
    },
    GloginError : (state) =>{
      return state.loginError
    },
    GloginErrorMsg : (state) => {
      return state.loginErrorMsg
    },

  }
})