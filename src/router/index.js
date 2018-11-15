import Vue from 'vue';
import Router from 'vue-router';
import { Message } from 'element-ui';
// 导入login组件
const Login = () => import('@/views/Login');
const Home = () => import('@/views/Home');
const User = () => import('@/views/users/User');
const Rights = () => import('@/views/rights/Rights');
const Roles = () => import('@/views/rights/Roles');
const Categories = () => import('@/views/goods/Categories');
const Goods = () => import('@/views/goods/Goods');
const AddGoods = () => import('@/views/goods/AddGoods');
const Params = () => import('@/views/goods/Params');
const Orders = () => import('@/views/orders/Orders');
const Reports = () => import('@/views/reports/Reports');

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
        { name: 'categories', path: '/categories', component: Categories },
        { name: 'goods', path: '/goods', component: Goods },
        { name: 'addgoods', path: '/goods/add', component: AddGoods },
        { name: 'params', path: '/params', component: Params },
        { name: 'orders', path: '/orders', component: Orders },
        { name: 'reports', path: '/reports', component: Reports }
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

