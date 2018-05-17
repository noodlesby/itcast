// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
// 从node_modules里找
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/style.css';
import http from '@/assets/js/http';
import MyBreadcrumb from '@/components/common/brandcrumb';
import App from './App';
import router from './router';

Vue.use(ElementUI);
// 在assets文件夹下的http.js中封装的axios的插件
Vue.use(http);
// 全局的面包屑组件
Vue.component(MyBreadcrumb.name, MyBreadcrumb);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
});
