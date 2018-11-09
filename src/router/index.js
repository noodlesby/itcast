import Vue from 'vue';
import Router from 'vue-router';
// 导入login组件
import Login from '@/views/Login';
import Home from '@/views/Home';
import User from '@/views/users/User';
import Rights from '@/views/rights/Rights';
import Roles from '@/views/rights/Roles';
import Categories from '@/views/goods/Categories';
import { Message } from 'element-ui';

Vue.use(Router);
const router = new Router({
  routes: [
    { name: 'login', path: '/', component: Login },
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [
        { name: 'users', path: '/users', component: User },
        { name: 'rights', path: '/rights', component: Rights },
        { name: 'roles', path: '/roles', component: Roles },
        { name: 'categories', path: '/categories', component: Categories }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  // 判断是否是登录页面
  if (to.name.toLowerCase() !== 'login') {
    const token = sessionStorage.getItem('token');
    if (!token) {
      Message.warning('您尚未登陆，请登录后访问');
      router.push('/');
      return;
    }
  }
  next();
});
export default router;

