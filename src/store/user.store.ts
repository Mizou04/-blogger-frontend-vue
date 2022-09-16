import {defineStore, _ActionsTree, StoreGetters, StoreState, _GettersTree} from "pinia"
import {useRouter} from "vue-router"
import useLayoutStore from "@/store/layout.store";
import { IUser } from "@/types/user";


interface State{
  readonly user : IUser | null,
  readonly urls : {google : string , facebook : string},
}


interface Actions extends _ActionsTree{
  setUser(user : IUser | null) : void, 
  getUserLogin(win : Window) : Promise<void>,
  // loginUser(win : Window, strategy : 'google' | 'facebook') : Promise<void>,
}


export default defineStore<string, State, _GettersTree<State>, Actions>('user', {
  state(){
    return {
      user : null,
      // user : {},
      urls : {
        google : "http://localhost:4000/authentication/google",
        // google : "/response",
        facebook : "http://localhost:4000/authentication/facebook"
      }
    }
  },
  actions: {
    setUser(user : IUser){
      this.$state = {...this.state, user : user};
    },
    async getUserLogin(win : Window) : Promise<void>{
      try {
        const req = await win.fetch("http://localhost:4000/authentication/user", 
        {
          credentials : "include",
          headers : {
            'Accept' : 'application/json,text/html',
          },
          'referrer' : ''
        }
        );
        const res = await req.json();
        if((res.data.user as IUser)?.id && (res.data.user as IUser)?.username){
          this.setUser(res.user);
        } 
      } catch (error) {
        // console.log(error)
      }
    }
  }
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