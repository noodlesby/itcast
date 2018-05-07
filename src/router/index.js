import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login/login';
import Home from '@/components/home/home';


Vue.use(Router);

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home
    }
  ]
});

// 配置路由的拦截器
router.beforeEach((to, from, next) => {
  next();
});

export default router;
