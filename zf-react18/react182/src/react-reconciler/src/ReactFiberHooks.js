import ReactSharedInternals from "shared/ReactSharedInternals";
const { ReactCurrentDispatcher } = ReactSharedInternals;
let currentlyRenderingFiber = null;
let workInProgressHook = null;

function mountWorkInProgressHook() {
  const hook = {
    memoizedState: null,
    queue: null,
    next: null,
  };
  if (workInProgressHook === null) {
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    workInProgressHook = workInProgressHook.next = hook;
    debugger;
  }
  return workInProgressHook;
}
function dispatchReducerAction(fiber, queue, action) {
  console.log("dispatchReducerAction", action);
}
const HooksDispatcherOnMountInDEV = {
  useReducer: mountReducer,
};
function mountReducer(reducer, initialArg) {
  const hook = mountWorkInProgressHook();
  hook.memoizedState = initialArg;
  const queue = {
    pending: null,
    dispatch: null,
  };
  hook.queue = queue;
  const dispatch = (queue.dispatch = dispatchReducerAction.bind(
    null,
    currentlyRenderingFiber,
    queue
  ));
  return [hook.memoizedState, dispatch];
}
export function renderWithHooks(current, workInProgress, Component, props) {
  currentlyRenderingFiber = workInProgress;
  if (current !== null && current.memoizedState !== null) {
  } else {
    ReactCurrentDispatcher.current = HooksDispatcherOnMountInDEV;
  }
  const children = Component(props);
  currentlyRenderingFiber = null;
  return children;
}
