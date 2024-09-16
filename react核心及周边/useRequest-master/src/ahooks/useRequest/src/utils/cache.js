const cache = new Map();

const setCache = (key, cachedData) => {
  cache.set(key, {
    ...cachedData,
  });
};

const getCache = (key) => {
  return cache.get(key);
};

export { getCache, setCache };
