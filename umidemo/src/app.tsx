// 运行时配置

import { matchRoutes } from "umi";

//每一次路由切换都会触发
export function onRouteChange({ clientRoutes, location, routes }) {
  // console.log(clientRoutes); //和当前匹配的路由配置项
  // console.log(location); //当前匹配的location对象
  // console.log(routes, location.pathname); //当前匹配的location对象

  // console.log(matchRoutes(routes, location.pathname));

  // console.log(matchRoutes(clientRoutes, location.pathname));
  const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
  let title = route ? route.title : "";
  document.title = `${title ? title + "-" : ""}hy`;
}
