import { REACT_ELEMENT_TYPE } from "./ReactSymbols";
import { createFiberFromElement } from "./ReactFiber";
import { Placement } from "./ReactFiberFlags";

function ChildReconciler(shouldTrackSideEffects) {
  /**
   * 根据element 构建单节点 element 并让它的return属性，指向当前最新的正在构建的fiberRoot 即 workInProgress
   * @param {*} returnFiber 新的父fiber
   * @param {*} currentFirstChild current就是老的意思，老的第一个子fiber
   * @param {*} newChild 新的虚拟DOM
   * @returns
   */
  function reconcileSingleElement(returnFiber, currentFirstChild, element) {
    const created = createFiberFromElement(element);
    created.return = returnFiber;
    return created;
  }
  /**
   * 放至新节点
   * @param {*} newFiber
   */
  function placeSingleChild(newFiber) {
    //如果当前需要跟踪副作用，并且当前这个新的fiber'它的替身不存在
    if (shouldTrackSideEffects && !newFiber.alternate) {
      //给这个新fiber添加一个副作用，表示在未来提交阶段的DOM操作中会向真实DOM树中添加此节点
      newFiber.flags = Placement;
    }
    return newFiber;
  }
  /**
   * 构建新的子Fiber
   * @param {*} returnFiber 新的父fiber
   * @param {*} currentFirstChild current就是老的意思，老的第一个子fiber
   * @param {*} newChild 新的虚拟DOM
   */
  function reconcileChildFibers(returnFiber, currentFirstChild, newChild) {
    //判断newChild是不是一个对象，如果是的话说明新的虚拟Dom只有一个React元素节点
    const isObject = typeof newChild === "object" && newChild;
    // 说明新的虚拟DOM是单节点
    if (isObject) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(
            reconcileSingleElement(returnFiber, currentFirstChild, newChild)
          );
      }
    }
  }
  return reconcileChildFibers;
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
