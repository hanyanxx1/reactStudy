import React from "react";
import ReactReduxContext from "../ReactReduxContext";
import { bindActionCreators } from "../../redux";

function useBoundDispatch(actions) {
  const { store } = React.useContext(ReactReduxContext);
  let boundActions = bindActionCreators(actions, store.dispatch);
  return boundActions;
}

export default useBoundDispatch;
