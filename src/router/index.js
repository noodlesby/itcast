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
  // 如果访问登录的路由地址，放过
  if (to.name === 'login') {
    next();
  } else {
    // 如果请求的不是登录页面，验证token
    // 1. 获取本地存储中的token
    const token = localStorage.getItem('token');
    if (!token) {
      // 2. 如果没有token，跳转到登录
      next({
        name: 'login'
      });
    } else {
      // 3. 如果有token，继续往下执行
      next();
    }
  }
});

export default router;
