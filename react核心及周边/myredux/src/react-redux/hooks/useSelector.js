import { useContext, useLayoutEffect, useState } from "react";
import { shallowEqual } from "../";
import ReactReduxContext from "../ReactReduxContext";
function useSelector(selector, equalityFn = shallowEqual) {
  const { store } = useContext(ReactReduxContext);
  return useSyncExternalStore(store.subscribe, () => selector(store.getState()));
}

function useSyncExternalStore(subscribe, getSnapshot) {
  let [state, setState] = useState(getSnapshot());
  useLayoutEffect(() => {
    subscribe(() => {
      setState(getSnapshot());
    });
  }, []);
  return state;
}

export default useSelector;
