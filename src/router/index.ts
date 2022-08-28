import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'
import HomePage from "@/views/pages/home-page.vue"
import UsersPage from "@/views/pages/users-page.vue"
import AboutPage from "@/views/pages/about-page.vue"
import LinksPage from "@/views/pages/links-page.vue"
import LoginPage from "@/views/pages/login-page.vue"
import LoginRedirectPage from '@/views/pages/login-redirect-page.vue'
import ProfilePage from '@/views/pages/profile-page.vue'
import ErrorPage from '@/views/pages/error-page.vue'
import ArticlePage from '@/views/pages/article-page.vue'
import CreateArticlePage from '@/views/pages/create-article-page.vue'
import useUserStore from "@/store/user.store"

const routes: Array<RouteRecordRaw> = [
  {
    path : "/",
    name : "home",
    component : HomePage,
  },
  {
    path : "/users",
    name : "users",
    component : UsersPage,
  },
  {
    path : "/about",
    name : "about",
    component : AboutPage,
  },
  {
    path : "/links",
    name : "links",
    component : LinksPage,
  },
  {
    path : "/login",
    name : "login",
    component : LoginPage,
  },
  {
    path : "/signup",
    name : "signup",
    component : LoginPage,
  },
  {
    path : "/response",
    name : "response",
    component : LoginRedirectPage
  },
  {
    path : "/my-profile",
    name : 'myProfile',
    component : ProfilePage,
  },
  {
    path : "/user/:id",
    name : 'userProfile',
    component : ProfilePage,
  }, {
    path : "/error404",
    name : 'error',
    component : HomePage,
  },
  {
    path : '/article/:articleId',
    name : 'article',
    component : ArticlePage
  },
  {
    path : '/articles/new',
    name : 'createArticle',
    component : CreateArticlePage,
    // beforeEnter : (to, from)=>{
    //   const userStore = useUserStore();
    //   if(!userStore?.user?.id){
    //     return {name : "signup"}
    //   }
    // }
  }
  // {
  //   path : "/*",
  //   name : "unknown",
  //   component : defineComponent({
  //     template : "<div>Error not found</div>"
  //   })
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
