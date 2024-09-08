import useLatest from "../../useLatest";
import useUpdate from "../../useUpdate";
import useCreation from "../../useCreation";
import useMount from "../../useMount";
import useMemoizedFn from "../../useMemoizedFn";
import Fetch from "./Fetch";

function useRequestImplement(service, options) {
  const { manual, ...rest } = options;
  const fetchOptions = { manual, ...rest };
  const serviceRef = useLatest(service);
  const update = useUpdate();
  const fetchInstance = useCreation(() => {
    return new Fetch(serviceRef, fetchOptions, update);
  }, []);
  useMount(() => {
    if (!manual) {
      fetchInstance.run();
    }
  });
  return {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
    run: useMemoizedFn(fetchInstance.run.bind(fetchInstance)),
    runAsync: useMemoizedFn(fetchInstance.runAsync.bind(fetchInstance)),
  };
}

export default useRequestImplement;
