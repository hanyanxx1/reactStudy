import { useUpdateEffect } from "ahooks";
import { useRef } from "react";

const useAutoRunPlugin = (fetchInstance, { manual, ready = true, defaultParams = [] }) => {
  const hasAutoRun = useRef(false);
  hasAutoRun.current = false;
  useUpdateEffect(() => {
    if (!manual && ready) {
      hasAutoRun.current = true;
      fetchInstance.run(...defaultParams);
    }
  }, [ready]);
  return {
    onBefore: () => {
      if (!ready) {
        return {
          stopNow: true,
        };
      }
    },
  };
};

useAutoRunPlugin.onInit = ({ ready = true, manual }) => {
  return {
    loading: !manual && ready,
  };
};

export default useAutoRunPlugin;
