import { createWorkInProgress } from "./ReactFiber";
import { beginWork } from "./ReactFiberBeginWork";
//当前正在更新的根
let workInProgressRoot = null;
//当前正在更新fiber节点
let workInProgress = null;
/**
 * 不管如何更新，不管谁来更新，都会调度到这个方法里
 * @param {*} fiber
 */
export function scheduleUpdateOnFiber(fiber) {
  const fiberRoot = markUpdateLaneFromFiberToRoot(fiber);
  performSyncWorkOnRoot(fiberRoot);
}

/**
 * 根据老的fiber树和更新对象创建新的fiber树，然后根据新的fiber树更新真实DoM
 * @param {*} fiberRoot
 */
function performSyncWorkOnRoot(fiberRoot) {
  workInProgressRoot = fiberRoot;
  workInProgress = createWorkInProgress(workInProgressRoot.current);
  workLoopSync();
}

/**
 * 开始自上而下的构建新fiber树
 */
function workLoopSync() {
  while (workInProgress) {
    performUnitOfWork(workInProgress);
  }
}

/**
 * 执行工作单元
 * @param {} workInProgress 要处理的fiber
 */
function performUnitOfWork(unitOfWork) {
  //获取当前正在构建的fiber的替身
  const current = workInProgress.alternate;
  //开始构建当前fiber的子fiber链表
  //它会返回下一个要处理的fiber,一般都是unitofWork的大儿子
  // div#title这个fiber 它的返回值是一个null
  let next = beginWork(current, unitOfWork);
  //在beginWork后，需要把新属性同步到老属性上
  //div id =1 memoizedProps={id:2}  pendingProps={id:2}
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  //当前的fiber还有子节点
  if (next) {
    workInProgress = next;
  } else {
    //如果当前的fiber没有子fiber，那么当前的fiber就算完成
    completeUnitOfWork(unitOfWork);
  }
}

function completeUnitOfWork(unitOfWork) {
  console.log(unitOfWork);
}

function markUpdateLaneFromFiberToRoot(sourceFiber) {
  let node = sourceFiber;
  let parent = node.return;
  while (parent) {
    node = parent;
    parent = parent.return;
  }
  //node其实肯定fiber树的根节点，其实就是hostRootFiber .stateNode div#root
  return node.stateNode;
}
