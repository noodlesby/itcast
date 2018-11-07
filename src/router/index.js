import Vue from 'vue';
import Router from 'vue-router';
// 导入login组件
import Login from '@/views/Login';
import Home from '@/views/Home';
import User from '@/views/users/User';

Vue.use(Router);
const router = new Router({
  routes: [
    { name: 'login', path: '/', component: Login },
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [{ name: 'user', path: '/user', component: User }]
    }
  ]
});
export default router;

