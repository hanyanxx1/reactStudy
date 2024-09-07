import { produce } from 'immer';
export const immer = (initializer) => {
  return (set, get, store) => {
    store.setState = (updater) => {
      const nextState = produce(updater);
      console.log('nextState', typeof nextState);
      return set(nextState);
    }
    return initializer(store.setState, get, store);
  }
}
export default immer;
// produce的 第一参数不是baseState？？