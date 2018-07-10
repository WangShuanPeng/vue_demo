import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Users from '@/views/users/Users'
import Roles from '@/views/roles/Roles'

Vue.use(Router)

export default new Router({
  routes: [
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
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
