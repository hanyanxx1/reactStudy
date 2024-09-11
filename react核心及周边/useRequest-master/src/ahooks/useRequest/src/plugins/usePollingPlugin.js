import { useUpdateEffect } from "ahooks";
import { useRef } from "react";

const usePollingPlugin = (fetchInstance, { pollingInterval }) => {
  const timeRef = useRef();
  const stopPolling = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
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
