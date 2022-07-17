import {defineStore, _ActionsTree, StoreGetters, StoreState, _GettersTree} from "pinia"
import { UnwrapRef } from "vue"
import { User } from "@/types/user"
import {useRouter} from "vue-router"
import { HTTPClient } from "@/helpers/http.helpers";
import { storeUser } from "@/helpers/storage.helpers";

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
  getUserCredentials() : Promise<void>
}


export default defineStore<string, State, _GettersTree<State>, Actions>('user', {
  state(){
    return {
      // user :JSON.parse(window.sessionStorage.getItem("user") as string) || this.actions?.getUserCredentials() || {name : "", email : "", username : "", id : "", joinedAt : "", lastModified : "", providerId : ""},
      user :JSON.parse(window.sessionStorage.getItem("user") as string) || {},
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
    },
    // async getUserCredentials(targetWindow : Window & typeof globalThis) : Promise<User | string>{
    //   let HttpClient = new HTTPClient(targetWindow);
    //   let response : User | string;
    //   try {
    //     response = await HttpClient.call("http://localhost:4000/me", {method : "GET"});
    //     //if response has an ID means we have a User
    //     if((response as User).id){
    //       targetWindow.console.log("response : ", response);
    //       return response;
    //     //else we have Error login instead
    //     } else {
    //       this.setLoginError(true);
    //       this.setLoginErrorMsg(response as string);
    //       setTimeout(() => {
    //         this.loginError = false;
    //         this.loginErrorMsg = "";
    //       }, 10000);
    //     }
    //     } catch (error) {
    //       this.setLoginError(true);
    //       this.setLoginErrorMsg((error as Error).message);
    //       targetWindow.console.log((error as Error).stack);
    //     }
    //     return response!
    //   }
    async getUserCredentials() : Promise<void>{
      let currentWindow = (opener || window);
      let HttpClient = new HTTPClient(currentWindow)
      try {
        const response = await HttpClient.call("http://localhost:4000/me", {method : "GET"});
        currentWindow.console.log(response);
        //if response has an ID means we have a User
        if((response as User).id){
          this.setUser(response as User);
          currentWindow.console.log("response : ", response);
          storeUser(currentWindow, response);
          if(opener){
            window.close();
          }
          currentWindow.history.replace('/');
          // router.replace("/");
        //else we have Error login instead
        } else {
          this.setLoginError(true);
          this.setLoginErrorMsg(response as string);
          if(opener){
            window.close();
          }
          // router.replace("/login");
          currentWindow.history.replace('/');
          setTimeout(() => {
            this.loginError = false;
            this.loginErrorMsg = "";
          }, 10000);
        }
        } catch (error) {
          this.setLoginError(true);
          this.setLoginErrorMsg((error as Error).message);
          currentWindow.console.log((error as Error).stack);
        }
      }
  },
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


// async getUserCredentials() : Promise<void>{
//   let targetWindow = (opener || window);
//   let HttpClient = new HTTPClient(targetWindow)
//   try {
//     const response = await HttpClient.call("http://localhost:4000/me", {method : "GET"});
//     targetWindow.console.log(response);
//     //if response has an ID means we have a User
//     if((response as User).id){
//       this.setUser(response as User);
//       targetWindow.console.log("response : ", response);
//       storeUser(targetWindow, response);
//       if(opener){
//         window.close();
//       }
//       targetWindow.history.replace('/');
//       // router.replace("/");
//     //else we have Error login instead
//     } else {
//       this.setLoginError(true);
//       this.setLoginErrorMsg(response as string);
//       if(opener){
//         window.close();
//       }
//       // router.replace("/login");
//       targetWindow.history.replace('/');
//       setTimeout(() => {
//         this.loginError = false;
//         this.loginErrorMsg = "";
//       }, 10000);
//     }
//     } catch (error) {
//       this.setLoginError(true);
//       this.setLoginErrorMsg((error as Error).message);
//       targetWindow.console.log((error as Error).stack);
//     }
//   }