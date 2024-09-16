import useCreation from "../../../useCreation";
import * as cache from "../utils/cache";

const useCachePlugin = (fetchInstance, { cacheKey, staleTime = 0 }) => {
  const _setCache = (key, cachedData) => {
    cache.setCache(key, cachedData);
  };

  const _getCache = (key) => {
    return cache.getCache(key);
  };

  useCreation(() => {
    if (!cacheKey) {
      return;
    }
    const cacheData = _getCache(cacheKey);
    if (cacheData && Object.hasOwnProperty.call(cacheData, "data")) {
      fetchInstance.state.data = cacheData.data;
      fetchInstance.state.params = cacheData.params;
      if (staleTime === -1 || new Date().getTime() - cacheData.time <= staleTime) {
        fetchInstance.state.loading = false;
      }
    }
  });

  if (!cacheKey) {
    return {};
  }

  return {
    onBefore: (params) => {
      const cacheData = _getCache(cacheKey, params);
      if (!cacheData || !Object.hasOwnProperty.call(cacheData, "data")) {
        return {};
      }
      if (staleTime === -1 || new Date().getTime() - cacheData.time <= staleTime) {
        return {
          loading: false,
          data: cacheData?.data,
          returnNow: true,
        };
      } else {
        return {
          data: cacheData?.data,
        };
      }
    },
    onSuccess: (data, params) => {
      if (cacheKey) {
        _setCache(cacheKey, {
          data,
          params,
          time: new Date().getTime(),
        });
      }
    },
  };
};

export default useCachePlugin;
