import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/password',
    name: 'Password',
    component: () => import('@/views/Login/Password.vue'),
    meta: {
      title: '找回密码'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/Register.vue'),
    meta: {
      title: '注册'
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

  const isLogin = localStorage.tsToken ? true : false;
  if (to.path == "/login" || to.path == "/password" || to.path == "/register") {
    isLogin ? next('/') : next();
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router
