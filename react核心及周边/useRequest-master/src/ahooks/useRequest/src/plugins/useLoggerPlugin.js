const useLoggerPlugin = (fetchInstance, { name }) => {
  return {
    onBefore: () => {
      console.log(name, "onBefore");
      return { id: name };
    },
    onRequest: (...rest) => {
      console.log(name, "onRequest", rest);
      return { servicePromise: Promise.resolve("onRequest返回值") };
    },
    onSuccess: (...rest) => {
      console.log(name, "onSuccess", fetchInstance.state.name, fetchInstance.state.id, rest);
    },
    onError: () => {
      console.log(name, "onError");
    },
    onFinally: (...rest) => {
      console.log(name, "onFinally", rest);
    },
    onCancel: () => {
      console.log(name, "onCancel");
    },
    onMutate: () => {
      console.log(name, "onMutate");
    },
  };
};
useLoggerPlugin.onInit = ({ name }) => {
  console.log(name, "onInit");
  return { name };
};
export default useLoggerPlugin;
