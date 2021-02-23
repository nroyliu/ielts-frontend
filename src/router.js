import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
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
  }]
});