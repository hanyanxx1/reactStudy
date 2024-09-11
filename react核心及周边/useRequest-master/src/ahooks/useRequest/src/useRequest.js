import useRequestImplement from "./useRequestImplement";
// import useLoggerPlugin from "./plugins/useLoggerPlugin";
import useLoadingDelayPlugin from "./plugins/useLoadingDelayPlugin";
import usePollingPlugin from "./plugins/usePollingPlugin";

function useRequest(service, options = {}, plugins) {
  return useRequestImplement(service, options, [
    ...(plugins || []),
    // useLoggerPlugin,
    useLoadingDelayPlugin,
    usePollingPlugin,
  ]);
}

export default useRequest;
