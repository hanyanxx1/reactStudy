import React from "react";
//导航上下文
const NavigationContext = React.createContext({});
//路径上下文
const LocationContext = React.createContext({});

export { NavigationContext, LocationContext };
export function Router({ children, location, navigator }) {
  const navigationContext = React.useMemo(() => ({ navigator }), [navigator]);
  const locationContext = React.useMemo(() => ({ location }), [location]);
  return (
    <NavigationContext.Provider value={navigationContext}>
      <LocationContext.Provider value={locationContext} children={children} />
    </NavigationContext.Provider>
  );
}
export function Routes({ children }) {
  return useRoutes(createRoutesFromChildren(children));
}
export function useLocation() {
  return React.useContext(LocationContext).location;
}
export function useSearchParams() {
  const location = React.useContext(LocationContext).location;
  const pathname = location.pathname;
  return new URLSearchParams(pathname.split("?")[1]);
}
export function useRoutes(routes) {
  let location = useLocation(); //当前的路径对象
  let pathname = location.pathname || "/"; //当前的路径
  for (let i = 0; i < routes.length; i++) {
    let { path, element } = routes[i];
    let match = matchPath(path, pathname);
    if (match) {
      return element;
    }
  }
  return null;
}

export function createRoutesFromChildren(children) {
  let routes = [];
  React.Children.forEach(children, (element) => {
    let route = {
      path: element.props.path,
      element: element.props.element,
    };
    routes.push(route);
  });
  return routes;
}

export function Route(props) {}
function compilePath(path) {
  let paramNames = [];
  let regexpSource =
    "^" +
    path.replace(/:(\w+)/g, (_, key) => {
      paramNames.push(key);
      return "([^\\/]+)";
    });
  regexpSource += "$";
  let matcher = new RegExp(regexpSource);
  return [matcher, paramNames];
}
export function matchPath(path, pathname) {
  let [matcher, paramNames] = compilePath(path);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let values = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index) => {
    memo[paramName] = values[index];
    return memo;
  }, {});
  return { params, pathname: matchedPathname, path };
}
