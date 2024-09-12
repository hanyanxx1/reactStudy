import useUpdateEffect from "../../../useUpdateEffect";
import { useRef } from "react";
import isDocumentVisible from "../utils/isDocumentVisible";
import subscribeReVisible from "../utils/subscribeReVisible";

const usePollingPlugin = (fetchInstance, { pollingInterval, pollingWhenHidden = true }) => {
  const timeRef = useRef();
  const unsubscribeRef = useRef();

  const stopPolling = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    unsubscribeRef.current?.();
  };

  useUpdateEffect(() => {
    if (!pollingInterval) {
      stopPolling();
    }
  }, [pollingInterval]);

  if (!pollingInterval) {
    return {};
  }

  return {
    onBefore() {
      stopPolling();
    },
    onFinally() {
      if (!pollingWhenHidden && !isDocumentVisible()) {
        subscribeReVisible(() => {
          fetchInstance.refresh();
        });
        return;
      }
      timeRef.current = setTimeout(() => {
        fetchInstance.refresh();
      }, pollingInterval);
    },
    onCancel() {
      stopPolling();
    },
  };
};
export default usePollingPlugin;
