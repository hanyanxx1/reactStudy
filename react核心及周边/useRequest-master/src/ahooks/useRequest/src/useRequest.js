import useRequestImplement from "./useRequestImplement";
// import useLoggerPlugin from "./plugins/useLoggerPlugin";
import useLoadingDelayPlugin from "./plugins/useLoadingDelayPlugin";
import usePollingPlugin from "./plugins/usePollingPlugin";
import useAutoRunPlugin from "./plugins/useAutoRunPlugin";
import useRefreshOnWindowFocusPlugin from "./plugins/useRefreshOnWindowFocusPlugin";
import useDebouncePlugin from "./plugins/useDebouncePlugin";
import useThrottlePlugin from "./plugins/useThrottlePlugin";
import useRetryPlugin from "./plugins/useRetryPlugin";
import useCachePlugin from "./plugins/useCachePlugin";

function useRequest(service, options = {}, plugins) {
  return useRequestImplement(service, options, [
    ...(plugins || []),
    // useLoggerPlugin,
    useLoadingDelayPlugin,
    usePollingPlugin,
    useAutoRunPlugin,
    useRefreshOnWindowFocusPlugin,
    useDebouncePlugin,
    useThrottlePlugin,
    useRetryPlugin,
    useCachePlugin,
  ]);
}

export default useRequest;
