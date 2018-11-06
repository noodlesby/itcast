import Vue from 'vue';
import Router from 'vue-router';
// 导入login组件
import Login from '@/views/Login';
import Home from '@/views/Home';

Vue.use(Router);
const router = new Router({
  routes: [
    { name: 'login', path: '/', component: Login },
    { name: 'home', path: '/home', component: Home }
  ]
});
export default router;

