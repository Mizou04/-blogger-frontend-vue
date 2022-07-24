import {defineStore, _ActionsTree, StoreGetters, StoreState, _GettersTree} from "pinia"
import { UnwrapRef } from "vue"
import { User } from "@/types/user"
import {useRouter} from "vue-router"
import { HTTPClient } from "@/helpers/http.helpers";
import { storeUser } from "@/helpers/storage.helpers";

const router = useRouter();

interface State{
  user : User | null,
  urls : {google : string , facebook : string},
  loginError : boolean,
  loginErrorMsg : string
}


interface Actions extends _ActionsTree{
  setUser(user : User) : void, 
  setLoginError(v : boolean) : void,
  setLoginErrorMsg(msg : string) : void,
  getUserCredentials() : Promise<void>
  getUser() : Promise<void>
}


export default defineStore<string, State, _GettersTree<State>, Actions>('user', {
  state(){
    return {
      // user :JSON.parse(window.sessionStorage.getItem("user") as string) || this.actions?.getUserCredentials() || {name : "", email : "", username : "", id : "", joinedAt : "", lastModified : "", providerId : ""},
      user : {name : "hamza", email : "", username : "",joinedAt : "12"},
      loginError : false,
      loginErrorMsg : "",
      urls : {
        google : "http://localhost:4000/authentication/google",
        // google : "/response",
        facebook : "http://localhost:4000/authentication/facebook"
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
    async getUserCredentials() : Promise<void>{
      const parentWindow = (opener || window); // if no parent we take the same window
      const httpClient = new HTTPClient(parentWindow)
      try {
        const response = await httpClient.call("http://localhost:4000/me", {method : "GET", credentials : "include"});
        parentWindow.console.log(response);
        //if response has an ID means we have a User
        if((response as User).id){
          this.setUser(response as User);
          parentWindow.console.log("response : ", response);
          storeUser(parentWindow, response);
          if(opener){
            window.close();
          }
          parentWindow.history.replace('/');
          
          // router.replace("/");
        //else we have Error login instead
        } else {
          this.setLoginError(true);
          this.setLoginErrorMsg(response as string);
          if(opener){
            window.close();
          }
          // router.replace("/login");
          parentWindow.history.replace('/');
          setTimeout(() => {
            this.loginError = false;
            this.loginErrorMsg = "";
          }, 10000);
        }
        } catch (error) {
          this.setLoginError(true);
          this.setLoginErrorMsg((error as Error).message);
          parentWindow.console.log((error as Error).stack);
        }
      },
    async getUser() : Promise<void>{
      const win : Window = (opener || window);
      try {
        const req = await win.fetch("http://localhost:4000/", 
        {
          credentials : "include",
          headers : {
            'Accept' : 'application/json,text/html',
          },
          'referrer' : ''
        }
        );
        const res = await req.json();
        if((res as User).id){
          this.user = res;
        }
        console.log(120 + " User_store", this.user, res);
      } catch (error) {
        console.log(error)
      }
    }
  },
})


// async getUserCredentials() : Promise<void>{
//   let targetWindow = (opener || window);
//   let httpClient = new HTTPClient(targetWindow)
//   try {
//     const response = await httpClient.call("http://localhost:4000/me", {method : "GET"});
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