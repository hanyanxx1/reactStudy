import { useRef } from "react";
import * as cache from "../utils/cache";
import useCreation from "../../../useCreation";
import * as cachePromise from "../utils/cachePromise";
import * as cacheSubscribe from "../utils/cacheSubscribe";
const useCachePlugin = (
  fetchInstance,
  {
    cacheKey,
    staleTime = 0,
    cacheTime = 5 * 60 * 1000,
    setCache: customSetCache,
    getCache: customGetCache,
  }
) => {
  const unSubscribeRef = useRef();
  const currentPromiseRef = useRef();
  const _setCache = (key, cachedData) => {
    if (customSetCache) {
      customSetCache(cachedData);
    } else {
      cache.setCache(key, cacheTime, cachedData);
    }
    cacheSubscribe.trigger(key, cachedData.data);
  };

  const _getCache = (key, params) => {
    if (customGetCache) {
      return customGetCache(params);
    }
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
    onRequest: (service, args) => {
      let servicePromise = cachePromise.getCachePromise(cacheKey);
      if (servicePromise && servicePromise !== currentPromiseRef.current) {
        return {
          servicePromise,
        };
      }
      servicePromise = service(...args);
      currentPromiseRef.current = servicePromise;
      cachePromise.setCachePromise(cacheKey, servicePromise);
      return {
        servicePromise,
      };
    },
    onSuccess: (data, params) => {
      if (cacheKey) {
        _setCache(cacheKey, {
          data,
          params,
          time: new Date().getTime(),
        });
        unSubscribeRef.current = cacheSubscribe.subscribe(cacheKey, (d) => {
          fetchInstance.setState({
            data: d,
          });
        });
      }
    },
  };
};
export default useCachePlugin;
