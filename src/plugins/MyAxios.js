import axios from 'axios';

const MyAxios = {};
MyAxios.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  /* 设置拦截器 */
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (config.url.toLowerCase() !== 'login') {
      config.headers.Authorization = sessionStorage.getItem('token');
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
  Vue.prototype.$http = axios;
};
export default MyAxios;
