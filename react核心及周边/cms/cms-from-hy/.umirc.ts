import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: { dataField: 'data' },
  layout: {
    title: 'CMS',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '实体管理',
      path: '/entity',
      component: './Entity',
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      target: 'http://localhost:7001',
      pathRewrite: {
        '^/api': '',
      },
      changeOrigin: true,
    },
  },
});
