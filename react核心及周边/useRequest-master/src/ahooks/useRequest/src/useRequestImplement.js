import useLatest from "../../useLatest";
import useUpdate from "../../useUpdate";
import useCreation from "../../useCreation";
import useMount from "../../useMount";
import Fetch from "./Fetch";

function useRequestImplement(service) {
  const serviceRef = useLatest(service);
  const update = useUpdate();
  const fetchInstance = useCreation(() => {
    return new Fetch(serviceRef, update);
  }, []);
  useMount(() => {
    fetchInstance.run();
  });
  return {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
  };
}

export default useRequestImplement;
