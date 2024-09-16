import * as cache from "../utils/cache";

const useCachePlugin = (fetchInstance, { cacheKey }) => {
  const _setCache = (key, cachedData) => {
    cache.setCache(key, cachedData);
  };

  const _getCache = (key) => {
    return cache.getCache(key);
  };

  if (!cacheKey) {
    return {};
  }

  return {
    onBefore: (params) => {
      const cacheData = _getCache(cacheKey, params);
      if (!cacheData || !Object.hasOwnProperty.call(cacheData, "data")) {
        return {};
      }
      return {
        data: cacheData?.data,
      };
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
