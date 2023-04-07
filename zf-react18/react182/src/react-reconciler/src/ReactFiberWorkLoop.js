import {
  scheduleCallback as Scheduler_scheduleCallback,
  ImmediatePriority as ImmediateSchedulerPriority,
  UserBlockingPriority as UserBlockingSchedulerPriority,
  NormalPriority as NormalSchedulerPriority,
  IdlePriority as IdleSchedulerPriority,
} from "./Scheduler";
import { createWorkInProgress } from "./ReactFiber";
import { beginWork } from "./ReactFiberBeginWork";
import { completeWork } from "./ReactFiberCompleteWork";
import {
  commitMutationEffects,
  commitPassiveUnmountEffects,
  commitPassiveMountEffects,
  commitLayoutEffects,
} from "./ReactFiberCommitWork";
import {
  HostComponent,
  HostRoot,
  HostText,
  FunctionComponent,
} from "./ReactWorkTags";
import {
  NoFlags,
  Placement,
  Update,
  ChildDeletion,
  MutationMask,
  Passive,
} from "./ReactFiberFlags";
import { finishQueueingConcurrentUpdates } from "./ReactFiberConcurrentUpdates";
import {
  NoLane,
  NoLanes,
  SyncLane,
  getNextLanes,
  getHighestPriorityLane,
  markRootUpdated,
  includesBlockingLane,
} from "./ReactFiberLane";
import {
  getCurrentUpdatePriority,
  lanesToEventPriority,
  DiscreteEventPriority,
  ContinuousEventPriority,
  DefaultEventPriority,
  IdleEventPriority,
} from "./ReactEventPriorities";
import { getCurrentEventPriority } from "react-dom-bindings/src/client/ReactDOMHostConfig";

let workInProgress = null;
let rootDoesHavePassiveEffects = false;
let rootWithPendingPassiveEffects = null;
let workInProgressRootRenderLanes = NoLanes;

export function scheduleUpdateOnFiber(root, fiber, lane) {
  markRootUpdated(root, lane);
  ensureRootIsScheduled(root);
}

function ensureRootIsScheduled(root) {
  const nextLanes = getNextLanes(root, NoLanes);
  const newCallbackPriority = getHighestPriorityLane(nextLanes);
  if (newCallbackPriority === SyncLane) {
    // TODO
    debugger;
  } else {
    let schedulerPriorityLevel;
    switch (lanesToEventPriority(nextLanes)) {
      case DiscreteEventPriority:
        debugger;
        schedulerPriorityLevel = ImmediateSchedulerPriority;
        break;
      case ContinuousEventPriority:
        debugger;
        schedulerPriorityLevel = UserBlockingSchedulerPriority;
        break;
      case DefaultEventPriority:
        schedulerPriorityLevel = NormalSchedulerPriority;
        break;
      case IdleEventPriority:
        debugger;
        schedulerPriorityLevel = IdleSchedulerPriority;
        break;
      default:
        debugger;
        schedulerPriorityLevel = NormalSchedulerPriority;
        break;
    }
    Scheduler_scheduleCallback(
      schedulerPriorityLevel,
      performConcurrentWorkOnRoot.bind(null, root)
    );
  }
}

function performConcurrentWorkOnRoot(root, didTimeout) {
  const lanes = getNextLanes(root, NoLanes);
  if (lanes === NoLanes) {
    return null;
  }
  const shouldTimeSlice = !includesBlockingLane(root, lanes) && !didTimeout;
  if (shouldTimeSlice) {
    debugger;
    renderRootConcurrent(root, lanes);
  } else {
    renderRootSync(root, lanes);
  }
  const finishedWork = root.current.alternate;
  printFiber(finishedWork);
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
  root.finishedWork = finishedWork;
  commitRoot(root);
}

function renderRootConcurrent(root, lanes) {
  console.log(root, lanes);
}

export function flushPassiveEffects() {
  if (rootWithPendingPassiveEffects !== null) {
    const root = rootWithPendingPassiveEffects;
    commitPassiveUnmountEffects(root.current);
    commitPassiveMountEffects(root, root.current);
  }
}

function commitRoot(root) {
  const { finishedWork } = root;
  if (
    (finishedWork.subtreeFlags & Passive) !== NoFlags ||
    (finishedWork.flags & Passive) !== NoFlags
  ) {
    if (!rootDoesHavePassiveEffects) {
      rootDoesHavePassiveEffects = true;
      Scheduler_scheduleCallback(flushPassiveEffects);
    }
  }
  const subtreeHasEffects =
    (finishedWork.subtreeFlags & MutationMask) !== NoFlags;
  const rootHasEffect = (finishedWork.flags & MutationMask) !== NoFlags;
  if (subtreeHasEffects || rootHasEffect) {
    commitMutationEffects(finishedWork, root);
    commitLayoutEffects(finishedWork, root);
    root.current = finishedWork;
    if (rootDoesHavePassiveEffects) {
      rootDoesHavePassiveEffects = false;
      rootWithPendingPassiveEffects = root;
    }
  }
}

function printFiber(fiber) {
  /*
  fiber.flags &= ~Forked;
  fiber.flags &= ~PlacementDEV;
  fiber.flags &= ~Snapshot;
  fiber.flags &= ~PerformedWork;
  */
  if (fiber.flags !== 0) {
    console.log(
      getFlags(fiber.flags),
      getTag(fiber.tag),
      typeof fiber.type === "function" ? fiber.type.name : fiber.type,
      fiber.memoizedProps
    );
    if (fiber.deletions) {
      for (let i = 0; i < fiber.deletions.length; i++) {
        const childToDelete = fiber.deletions[i];
        console.log(
          getTag(childToDelete.tag),
          childToDelete.type,
          childToDelete.memoizedProps
        );
      }
    }
  }
  let child = fiber.child;
  while (child) {
    printFiber(child);
    child = child.sibling;
  }
}

function getTag(tag) {
  switch (tag) {
    case FunctionComponent:
      return `FunctionComponent`;
    case HostRoot:
      return `HostRoot`;
    case HostComponent:
      return `HostComponent`;
    case HostText:
      return HostText;
    default:
      return tag;
  }
}

function getFlags(flags) {
  if (flags === (Update | Placement | ChildDeletion)) {
    return `自己移动和子元素有删除`;
  }
  if (flags === (ChildDeletion | Update)) {
    return `自己有更新和子元素有删除`;
  }
  if (flags === ChildDeletion) {
    return `子元素有删除`;
  }
  if (flags === (Placement | Update)) {
    return `移动并更新`;
  }
  if (flags === Placement) {
    return `插入`;
  }
  if (flags === Update) {
    return `更新`;
  }
  return flags;
}

function prepareFreshStack(root, lanes) {
  workInProgress = createWorkInProgress(root.current, null);
  workInProgressRootRenderLanes = lanes;
  finishQueueingConcurrentUpdates();
}

function renderRootSync(root, lanes) {
  prepareFreshStack(root, lanes);
  workLoopSync();
}

function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate;
  const next = beginWork(current, unitOfWork, workInProgressRootRenderLanes);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  if (next === null) {
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }
}

function completeUnitOfWork(unitOfWork) {
  let completedWork = unitOfWork;
  do {
    const current = completedWork.alternate;
    const returnFiber = completedWork.return;
    completeWork(current, completedWork);
    const siblingFiber = completedWork.sibling;
    if (siblingFiber !== null) {
      workInProgress = siblingFiber;
      return;
    }
    completedWork = returnFiber;
    workInProgress = completedWork;
  } while (completedWork !== null);
}

export function requestUpdateLane() {
  const updateLane = getCurrentUpdatePriority();
  if (updateLane !== NoLane) {
    debugger;
    return updateLane;
  }
  const eventLane = getCurrentEventPriority();
  return eventLane;
}
