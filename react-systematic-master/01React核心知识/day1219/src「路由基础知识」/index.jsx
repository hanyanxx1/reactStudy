import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
/* 使用ANTD组件库 */
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
// import './index.less';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
