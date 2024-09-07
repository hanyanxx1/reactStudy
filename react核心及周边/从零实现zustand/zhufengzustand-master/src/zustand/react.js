
import { createStore } from './vanilla';
import { useSyncExternalStore, useRef, useCallback, useState, useEffect } from 'react';

/* function useSyncExternalStore(subscribe, getSnapshot) {
  const [state, setState] = useState(getSnapshot());
  useEffect(() => {
    return subscribe((newState) => {
      setState(newState);
    });
  }, []);
  return state;
} */

export function useStore(api, selector) {
  //它用来缓存上一次的整个状态快照
  const lastSnapshotRef = useRef(null);
  //用来缓存上一次选择的结果对象
  const lastSelectionRef = useRef(null);
  const getSelection = useCallback(() => {
    //获取上一次的选择值
    let lastSelection = lastSnapshotRef.current;
    if (lastSelection === null) {
      //获取新的完整状态
      const nextSnapShot = api.getState();
      //获取新的选择值
      const nextSelection = selector(nextSnapShot);
      lastSnapshotRef.current = nextSnapShot
      lastSelectionRef.current = nextSelection;
      return nextSelection;
    } else {
      //如果不是第一次
      //获取老快照
      const lastSnapshot = lastSnapshotRef.current;
      //获取新的快照
      const nextSnapshot = api.getState();
      //如果快照一样，选择器一样，肯定结果也一样
      if (Object.is(lastSnapshot, nextSnapshot)) {
        return lastSelection;
      }
      //计算新的选择值
      const nextSelection = selector(nextSnapshot);
      lastSnapshotRef.current = nextSnapshot
      lastSelectionRef.current = nextSelection;
      return nextSelection;
    }
  }, []);
  let value = useSyncExternalStore(api.subscribe, getSelection);
  return value;
}
export const create = (createState) => {
  // 1.创建仓库
  const api = createStore(createState);
  //2.返回一个自定义hook,里面可以通过useStore获取仓库中最新的状态
  return (selector) => useStore(api, selector);
}


export default create;