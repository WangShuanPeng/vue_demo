import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Users from '@/views/users/Users'
import Roles from '@/views/roles/Roles'
import Rights from '@/views/roles/Rights'
import { Message } from 'element-ui'
import Goods from '@/views/goods/Goods'
import Categories from '@/views/goods/Categories'
import Params from '@/views/goods/Params'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/users',
          name: 'user',
          component: Users
        },
        {
          path: '/roles',
          name: 'roles',
          component: Roles
        },
        {
          path: '/rights',
          name: 'rights',
          component: Rights
        },
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },
        {
          path: '/categories',
          name: 'categories',
          component: Categories
        },
        {
          path: '/params',
          name: 'params',
          component: Params
        }
      ]
    }

  ]
})

// 路由的前置守卫
router.beforeEach((to, from, next) => {
  // 判断有没有token  登录不需要token
  if (to.name === 'login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if (!token) {

      router.push({name : 'login'})
      Message.warning('请登录后跳转')
      return
    }
    next()
  }

})

export default router
