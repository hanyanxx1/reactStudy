import { produce } from "immer";

export const immer = (initializer) => {
  return (set, get, store) => {
    store.setState = (updater) => {
      const nextState = produce(updater);
      return set(nextState);
    };
    return initializer(set, get, store);
  };
};

export default immer;
