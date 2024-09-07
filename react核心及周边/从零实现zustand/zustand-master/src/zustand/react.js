import { createStore } from "./vanilla";
import { useCallback, useRef, useSyncExternalStore } from "react";

export function useStore(api, selector) {
  const lastSnapshotRef = useRef(null);
  const lastSelectionRef = useRef(null);

  const getSelection = useCallback(() => {
    let lastSelection = lastSnapshotRef.current;
    if (lastSelection === null) {
      const nextSnapShot = api.getState();
      const nextSelection = selector(nextSnapShot);
      lastSnapshotRef.current = nextSnapShot;
      lastSelectionRef.current = nextSelection;
      return nextSelection;
    } else {
      const lastSnapshot = lastSnapshotRef.current;
      const nextSnapshot = api.getState();
      if (Object.is(lastSnapshot, nextSnapshot)) {
        return lastSelection;
      }
      const nextSelection = selector(nextSnapshot);
      lastSnapshotRef.current = nextSnapshot;
      lastSelectionRef.current = nextSelection;
      return nextSelection;
    }
  }, []);

  let value = useSyncExternalStore(api.subscribe, getSelection);
  return value;
}

export const create = (createState) => {
  const api = createStore(createState);
  return (selector) => useStore(api, selector);
};

export default create;
