import axios from 'axios';

const httpHelper = {};
// 配置Vue插件
httpHelper.install = function fn(Vue) {
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1';
  Vue.prototype.$http = axios;
};

export default httpHelper;
