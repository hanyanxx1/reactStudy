import { createStore, applyMiddleware } from "redux";
import combineReducers from "./reducers";
import { routerMiddleware, createReduxHistory } from "../history";

export const store = applyMiddleware(routerMiddleware)(createStore)(combineReducers);
window.store = store;
export const history = createReduxHistory(store);
