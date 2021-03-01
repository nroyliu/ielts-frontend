import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import {
  userinfo
} from './server/api'

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: '/login',
      component: () => import('@/views/Login/login')
    }, {
      path: '/',
      component: () => import('@/views/Home/home')
    }, {
      path: '/main',
      component: () => import('@/views/Layout'),
      redirect: '/main/index',
      children: [{
        path: 'index',
        component: () => import('@/views/ExamPage/check')
      }, {
        path: 'confirm',
        component: () => import('@/views/ExamPage/confirm')
      }, {
        path: 'testSound',
        component: () => import('@/views/ExamPage/testSound')
      }, {
        path: 'topic',
        component: () => import('@/views/Topic'),
      }]
    },
    {
      path: '/analysis',
      component: () => import('@/views/Analysis')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path != '/login') {
    let token = localStorage.token || ''
    userinfo({
      token
    }).then(res => {
      next()
    }).catch(err => {
      next('/login')
    })
  } else {
    next()
  }
})

export default router