import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Layout/Index.vue'),
    meta: {
      title: '首页',
      isLogin: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
      title: '登录',
      isLogin: false
    }
  },
  {
    path: '/password',
    name: 'Password',
    component: () => import('@/views/Login/Password.vue'),
    meta: {
      title: '找回密码',
      isLogin: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/Register.vue'),
    meta: {
      title: '注册',
      isLogin: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to: any, from: any, next: any) => {
  // 三目运算符

  if (to.meta.title) {
    document.title = to.meta.title
    next()
  } else {
    document.title = '管理系统'
    next()
  }

  // const isLogin = localStorage.tsToken ? true : false;

  // if (to.meta.isLogin) {
  //   isLogin ? next() : next('/login')
  // } else next('/');

  next()
})

export default router
