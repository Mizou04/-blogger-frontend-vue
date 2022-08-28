import {defineStore, _ActionsTree} from "pinia";
import {Range} from "@/types/Range";
import {IBlogPostMin} from "@/types/blogPost";

import useLayoutStore from "./layout.store";

type TState = {
  overallLength : number, 
  articles : IBlogPostMin[],
  range : Range,
  page: number
}

interface TActions extends _ActionsTree{
  populateArticles(page? : number): Promise<void>,
  restoreState() : void,
}

export default defineStore<string, TState, any, TActions>("articles", {
  state : function (){
    return {
      overallLength : 0,
      articles : [],
      range : {from : 1, to : 10},
      page : 1,
    }
  },
  actions : {
    async populateArticles(page? : number) : Promise<void>{
      this.range = Range.goTo(page || this.page, this.range);
      let layoutStore = useLayoutStore();
      try {
        let timeout : number = setTimeout(()=>{
          throw new Error("Request Timeout");
        }, 1e4);
        let response = await fetch(process.env.NODE_ENV == "development" ?`http://localhost:4000/articles/${this.range.from}-${this.range.to}` : `/articles/${this.range.from}-${this.range.to}`);
        let json : {data : IBlogPostMin[], overAllLength : number} = await response.json();
        this.overallLength = json.overAllLength;
        this.articles = json.data;
        if(this.overallLength > 0){
          clearTimeout(timeout);
        }
      } catch (error) {
        layoutStore.showError((error as Error).message);
      }
    },
    restoreState(){
      this.overallLength = 0;
      this.articles = [];
      this.range = {from : 1, to : 10};
      this.page = 1;
    }
  }
})