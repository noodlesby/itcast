import Vue from 'vue';
import Router from 'vue-router';

// 导入login组件
import Login from '@/views/Login';

Vue.use(Router);
const router = new Router({
  routes: [
    { name: 'login', path: '/', component: Login }
  ]
});
export default router;

