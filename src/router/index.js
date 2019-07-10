import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index/index'
import home from '../views/index/home'
import login from '../views/login/login'
import User from './modules/user'
Vue.use(Router)
export const constRouter=[
  {
    path: '/',
    redirect:"index",
  },
  {
    path:"/login",
    name:"login",
    component:login,
    hidden: true,
    meta:{
      title:"登录",
      icon:""
    }
  },
  {
    path: '/index',
    name: 'index',
    component:index,
    redirect:'/home',
    meta:{
      title:"index",
      icon:""

    },
    children:[
      {
        path:'/home',
        name: 'home',
        component: home,
        meta:{
          title:'home',
          icon:"home"
        }
      },
    ]
  } 
]
export const asyncRouter=[
  User
]
export default new Router({
  //mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes:constRouter
})
