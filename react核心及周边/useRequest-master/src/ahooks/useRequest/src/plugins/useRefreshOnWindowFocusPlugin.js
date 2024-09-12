import { useEffect, useRef } from "react";
import limit from "../utils/limit";
import subscribeFocus from "../utils/subscribeFocus";
import useUnmount from "../../../useUnmount";

const useRefreshOnWindowFocusPlugin = (
  fetchInstance,
  { refreshOnWindowFocus, focusTimespan = 5000 }
) => {
  const unsubscribeRef = useRef();

  const stopSubscribe = () => {
    unsubscribeRef.current?.();
  };

  useEffect(() => {
    if (refreshOnWindowFocus) {
      const limitRefresh = limit(fetchInstance.refresh.bind(fetchInstance), focusTimespan);
      unsubscribeRef.current = subscribeFocus(() => limitRefresh());

      return () => {
        stopSubscribe();
      };
    }
  }, [refreshOnWindowFocus, focusTimespan]);

  useUnmount(() => {
    stopSubscribe();
  });

  return {};
};

export default useRefreshOnWindowFocusPlugin;
