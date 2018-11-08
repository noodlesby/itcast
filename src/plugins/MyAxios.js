import axios from 'axios';

const MyAxios = {};
MyAxios.install = function (Vue) {
  Vue.prototype.$http = axios;
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
};
export default MyAxios;
