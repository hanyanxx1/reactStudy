import { REACT_ELEMENT_TYPE } from "./ReactSymbols";
import { createFiberFromElement, createWorkInProgress } from "./ReactFiber";
import { Deletion, Placement } from "./ReactFiberFlags";

function ChildReconciler(shouldTrackSideEffects) {
  /**
   * 因为这个老的子fiber在新的虚拟DOM树不存在了，则标记为删除
   * @param {*} returnFiber 新fiber
   * @param {*} childToDelete 老的要删除的子节点
   */
  function deleteChild(returnFiber, childToDelete) {
    //如果不需要跟踪副作用，直接返回
    if (!shouldTrackSideEffects) {
      return;
    }
    //把自己这个副作用添加到父effectList中
    //刷除类型的副作用一般放在父f1ber副作用链表的前面，在进行DOM操作时候先执行删除操作
    const lastEffect = returnFiber.lastEffect;
    if (lastEffect) {
      lastEffect.nextEffect = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else {
      //父fiber节点effectList是空
      returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }
    //清空下一个副作用对象
    childToDelete.nextEffect = null;
    //标记为删除
    childToDelete.flags = Deletion;
  }
  /**
   * 删除剩下的儿子们
   * @param {*} returnFiber 新fiber
   * @param {*} childToDelete 老的要删除的子节点
   */
  function deleteRemainingChildren(returnFiber, childToDelete) {
    while (childToDelete) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }
  }

  /**
   * 复用老fiber
   * @param {*} oldFiber 老fiber
   * @param {*} pendingProps 新fiber的element
   * @returns
   */
  function multiplexProps(oldFiber, pendingProps) {
    return createWorkInProgress(oldFiber, pendingProps);
  }

  /**
   * 根据element 构建单节点 element 并让它的return属性，指向当前最新的正在构建的fiberRoot 即 workInProgress
   * @param {*} returnFiber 新的父fiber
   * @param {*} currentFirstChild current就是老的意思，老的第一个子fiber
   * @param {*} newChild 新的虚拟DOM
   * @returns
   */
  function reconcileSingleElement(returnFiber, currentFirstChild, element) {
    //获取新的虚拟DOM的key
    let key = element.key;
    //获取第一个老的fiber节点
    let child = currentFirstChild;
    while (child) {
      //老fiber的ekey和新的虚拟DoM的key相同说明
      if (child.key === key) {
        //判断老的fiberl的type和新的虚拟DOMtype是否相同
        if (child.type === element.type) {
          //准备复用child老fiber节点，删除剩下的其他fiebr
          deleteRemainingChildren(returnFiber, child.sibling);
          //在复用老fiber的时候，会传递新的虚拟DoM的属性对象到新fiber的pendingProps.上
          const existing = multiplexProps(child, element.props);
          existing.return = returnFiber;
          return existing;
        } else {
          //已经配上key了，但是type不同，则删除包括当前的老fiberi在内所所有后续的老fiber
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        //如果不相同说明当前这个老fiber不是对应于新的虚拟D0州节点
        //把此老fiber标记为别除，并且继续弟弟
        deleteChild(returnFiber, child);
      }
      //继续匹配弟弟们
      child = child.sibling;
    }

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
        default:
          return;
      }
    }
  }
  return reconcileChildFibers;
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
