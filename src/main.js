// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
// 从node_modules里找
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/style.css';
import '@/assets/css/index.css';
import App from './App';
import router from './router';
import axios from '../node_modules/axios';
import moment from '../node_modules/moment';

Vue.prototype.$http = axios;
Vue.filter('dateFormat', (originVal, format) => moment(originVal).format(format));

Vue.use(ElementUI);
// 在assets文件夹下的http.js中封装的axios的插件
// 全局的面包屑组件
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
});
