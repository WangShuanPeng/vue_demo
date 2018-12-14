import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import Index from '@/views/index.vue'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/index',
      component: Index
    },
  ]
})

// 路由的前置守卫
// router.beforeEach((to, from, next) => {
  // 判断有没有token  登录不需要token
//   if (to.name === 'login') {
//     next()
//   } else {
//     const token = sessionStorage.getItem('token')
//     if (!token) {
//       router.push({name: 'login'})
//       Message.warning('请登录后跳转')
//       return
//     }
//     next()
//   }
// })

export default router
