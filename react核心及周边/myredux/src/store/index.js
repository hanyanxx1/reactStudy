import { applyMiddleware, createStore } from "../redux";
import reducer from "./reducers";
import logger from "../redux-logger";
import thunk from "../redux-thunk";
import promise from "../redux-promise";

const store = applyMiddleware(promise, thunk, logger)(createStore)(reducer);

export default store;
