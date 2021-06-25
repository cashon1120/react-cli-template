import axios from 'axios'
import { BASE_URL} from '../config/index.js'

axios.defaults.baseURL = BASE_URL; // 配置axios请求的地址


//配置发送请求前的拦截器 可以设置token信息 
axios.interceptors.request.use(config => {
  if(config.url.indexOf('yiketianqi') === -1 && config.url.indexOf('tts') == -1){
    config.data = {...config.data }
    config.headers = {
      Authorization: '',
      'authority-token': '',
      platformId: 1
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 配置响应拦截器 
axios.interceptors.response.use(res => {
  return Promise.resolve(res.data);
}, error => {
  return Promise.reject(error);
})

export default axios