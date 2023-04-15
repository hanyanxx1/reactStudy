import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: "pnpm",

  // 关闭sourceMap文件的生成
  devtool: false,
  hash: true,
  // 多大(10KB)以内的图片，自动BASE64
  inlineLimit: 10000,
  //设置JS压缩的方式默认是esbuild
  jsMinifier: "terser",
  jsMinifierOptions: {},

  //设置umi插件
  plugins: [],
  //设置打包后资源导入的路径 「 默认是"/"" 」,可以设置CDN
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  /*有关于路由的处理 */
  history: {
    type: "hash",
  },
  historyWithQuery: {},

  //跨域代理
  proxy: {
    "/api": {
      target: "",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },

  //基于链式写法，修改webpack配置项
  chainWebpack(memo, { env, webpack }) {},

  //配合headScripts可以把项目中一些第三方模块，单独在html中进行导入导入的可以是CDN地址] ，以此减少打包后主JS的大小! !
  externals: {},
  headScripts: [],
  links: [],
  metas: [],

  //额外的扩展项
  extraBabelPlugins: [],
  extraBabelPresets: [],
  extraPostCSSPlugins: [],

  //浏览器兼容处理
  //默认全量导入polyfill来处理ES6 API的兼容，也可以手动按需导入
  // polyfill: {},
  //设置需要兼容的最低版本浏览器
  targets: {
    ie: 11,
  },
});
