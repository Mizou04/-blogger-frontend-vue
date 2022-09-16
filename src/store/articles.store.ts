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
  previousPage() : void,
  nextPage(): void,
  goToPage(page : number): void
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
      this.articles = [];
      this.range = Range.goTo(page || this.page, this.range);
      const layoutStore = useLayoutStore();
      try {
        
        const response = await fetch(process.env.NODE_ENV == "development" ?`http://localhost:4000/articles/${this.range.from}-${this.range.to}` : `/articles/${this.range.from}-${this.range.to}`);
        const json : {data : IBlogPostMin[], overAllLength : number} = await response.json();
        this.articles = json.data;
        this.overallLength = json.overAllLength;
        if(this.overallLength == 0){
          throw new Error("NO DATA")
        }

        
      } catch (error) {
        let message = (error as Error).message;
        if(/^failed to fetch$/igm.test(message)){
          message = "Internet Connection Error "
        }
        layoutStore.showError(message)
      }
    },
    restoreState(){
      this.overallLength = 0;
      this.articles = [];
      this.range = {from : 1, to : 10};
      this.page = 1;
    },
    previousPage(){
      if(this.page == 1) return;
      this.page--;
    },
    nextPage(){
      const totalPageNumber = this.overallLength / (this.range.to - this.range.from + 1);
      if(this.page == totalPageNumber) return;
      this.page++;
    },
    goToPage(page : number){
      const totalPageNumber = this.overallLength / (this.range.to - this.range.from + 1);
      if(page <= 0) return;
      if(page > totalPageNumber) return;
      this.page = page;
    }
  }
})