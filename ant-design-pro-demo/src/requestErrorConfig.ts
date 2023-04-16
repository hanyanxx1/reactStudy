/**
 * @name 对Axios的配置
 * @description 包含请求拦截器和响应拦截器
 * @doc https://umijs.org/docs/max/request#配置
 */
import { message } from 'antd';

export const request = {
  timeout: 6000,

  errorConfig: {
    errorHandler() {
      console.error("网路繁忙，请您稍后再试~~")
    },
  },

  requestInterceptors: [
    (config) => {
      const token = '';
      if (token && config.url !== 'api/adminUser/login') {
        config.headers['token'] = token;
      }
      return { config };
    },
  ],
  
  responseInterceptors: [
    (response) => {
      return response;
    },
  ],
};
