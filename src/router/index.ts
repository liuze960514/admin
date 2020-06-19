import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Index from '@/views/Layout/Index.vue';

Vue.use(VueRouter)


export const asyncRouterMap = [
  {
    path: '/',
    name: 'dashboard',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: '首页',
          icon: 'fa fa-home',
          isLogin: true
        }
      }
    ]
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    hidden: true,
    component: Index,
    redirect: '/tableData',
    children: [
      {
        path: '/tableData',
        name: 'tableData',
        component: () => import('../views/DataManage/TableData.vue'),
        meta: {
          title: '表格管理',
          icon: 'fa fa-bar-table',
          isLogin: true
        }
      }
    ]
  },
  {
    path: '/chartsData',
    name: 'chartsData',
    meta: {
      title: '图表管理',
      icon: 'fa fa-bar-chart',
      isLogin: true
    },
    component: () => import('@/views/DataManage/ChartsData.vue')
  },
  {
    path: '/formData',
    name: 'formData',
    meta: {
      title: '表单管理',
      icon: 'fa fa-file-text-o',
      isLogin: true,
      roles: ['admin', 'editor']
    },
    component: () => import('@/views/DataManage/FormData.vue')
  },
]

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
  mode: 'hash',
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
