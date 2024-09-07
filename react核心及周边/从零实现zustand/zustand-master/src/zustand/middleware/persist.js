export function createJSONStorage(storage) {
  return {
    getItem(name) {
      const str = storage.getItem(name);
      return str ? JSON.parse(str) : {};
    },
    setItem(name, newValue) {
      storage.setItem(name, JSON.stringify(newValue));
    },
  };
}

export const persist = (createState, { name, storage }) => {
  return (set, get, api) => {
    //重写getState方法
    let result = createState(
      (...args) => {
        //先调用老的set方法，把新状态保存好
        set(...args);
        //然后再把新状态保存到本地存储中
        storage.setItem(name, get());
      },
      get,
      api
    );
    //把本地存储中存的值取出来放到仓库中
    queueMicrotask(() => {
      set(storage.getItem(name));
    });
    return result;
  };
};
