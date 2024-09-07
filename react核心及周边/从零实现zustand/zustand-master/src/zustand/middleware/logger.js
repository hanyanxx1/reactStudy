const logger = (createState) => {
  return (set, get, api) => {
    return createState(
      (...args) => {
        console.log("  applying", args);
        set(...args);
        console.log("  new state", get());
      },
      get,
      api
    );
  };
};

export default logger;
