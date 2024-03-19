import { scheduleCallback } from "scheduler";
import { createWorkInProgress } from "./ReactFiber";
import { beginWork } from "./ReactFiberBeginWork";

let workInProgress = null;
export function scheduleUpdateOnFiber(root) {
  ensureRootIsScheduled(root);
}

function ensureRootIsScheduled(root) {
  scheduleCallback(performConcurrentWorkOnRoot.bind(null, root));
}

function performConcurrentWorkOnRoot(root) {
  renderRootSync(root);
}

function prepareFreshStack(root) {
  workInProgress = createWorkInProgress(root.current, null);
}

function renderRootSync(root) {
  prepareFreshStack(root);
  workLoopSync();
}

function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}
function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate;
  const next = beginWork(current, unitOfWork);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  if (next === null) {
    //completeUnitOfWork(unitOfWork);
    workInProgress = null;
  } else {
    workInProgress = next;
  }
}
