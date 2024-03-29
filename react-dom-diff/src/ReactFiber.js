import { HostComponent, HostRoot } from "./ReactWorkTags";
import { NoFlags } from "./ReactFiberFlags";

export function createHostRootFiber() {
  return createFiber(HostRoot);
}

/**
 * 创建fiber节点
 * @param {*} tag fiber的标签HostRoot指的是根节点div span HostComponent
 * @param {*} pendingProps 等待生效的属性对象
 * @param {*} key
 * @returns
 */
function createFiber(tag, pendingProps, key) {
  return new FiberNode(tag, pendingProps, key);
}

function FiberNode(tag, pendingProps, key) {
  this.tag = tag;
  this.pendingProps = pendingProps;
  this.key = key;
}

/**
 * 根据老fiber创建新fiber
 * @param {*} current
 * @param {*} pendingProps
 */
export function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate;
  if (!workInProgress) {
    workInProgress = createFiber(current.tag, pendingProps, current.key);
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
  }
  workInProgress.flags = NoFlags;
  workInProgress.child = null;
  workInProgress.sibling = null;
  workInProgress.updateQueue = current.updateQueue;
  //在dom diff的过程会给fiberi添加副作用
  workInProgress.firstEffect =
    workInProgress.lastEffect =
    workInProgress.nextEffect =
      null;
  return workInProgress;
}

/**
 * 根据虚拟DoM元素创建fiber节点
 * @param {*} element
 */
export function createFiberFromElement(element) {
  const { key, type, props } = element;
  let tag;
  if (typeof type === "string") {
    //span div p
    tag = HostComponent; // 标签等于原生组件
  }
  const fiber = createFiber(tag, props, key);
  fiber.type = type;
  return fiber;
}
