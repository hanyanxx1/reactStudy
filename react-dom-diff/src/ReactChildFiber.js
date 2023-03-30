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
  function createChild(returnFiber, newChild) {
    const created = createFiberFromElement(newChild);
    created.return = returnFiber;
    return created;
  }
  function updateElement(returnFiber, oldFiber, newChild) {
    if (oldFiber) {
      if (oldFiber.type === newChild.type) {
        const existing = multiplexProps(oldFiber, newChild.props);
        existing.return = returnFiber;
        return existing;
      }
    }
    //如果没有老fiber
    const created = createFiberFromElement(newChild);
    created.return = returnFiber;
    return created;
  }
  function updateSlot(returnFiber, oldFiber, newChild) {
    const key = oldFiber ? oldFiber.key : null;
    //如果新的虚拟DoM的key和老fiber的key一样
    if (newChild.key === key) {
      return updateElement(returnFiber, oldFiber, newChild);
    } else {
      //如果key不一样，直接结束返回null
      return null;
    }
  }
  function placeChild(newFiber, newIdx) {
    newFiber.newIdx = newIdx;
    if (!shouldTrackSideEffects) {
      return;
    }
    const current = newFiber.alternate;
    //如果有current说是更新，复用老节点的更新，不会添加Placement
    if (current) {
      //TODO现在是只处理初次挂载，更新情况我们暂不处理
    } else {
      newFiber.flags = Placement;
    }
  }
  /**
   * 如果新的虚拟DOM是一个数组的话，也就是说有多个儿子的话
   * @param {*} returnFiber ul
   * @param {*} currentFirstChild null
   * @param {*} newChild [liA,liB,liC]
   */
  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren) {
    //将要返回的第一个新fiber
    let resultingFirstChild = null;
    //上一个新fiber
    let previousNewFiber = null;
    //当前的老fiber
    let oldFiber = currentFirstChild;
    //下一个老fiber
    let nextOldFiber = null;
    //新的虚拟DOM的索引
    let newIdx = 0;
    // 处理更新的情况 ,老fiber和新的fiber都存在
    for (; oldFiber && newIdx < newChildren.length; newIdx++) {
      nextOldFiber = oldFiber.sibling;
      //试图复用老fiber
      const newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx]);
      //如果key不一样 ，跳出第一轮循环
      if (!newFiber) break;
      //老fiber存在，但是新的fiber并没有复用老fiber
      if (oldFiber && !newFiber.alternate) {
        deleteChild(returnFiber, oldFiber);
      }
      //核心是给当前的newFiber 添加一个副作用flags,叫新增
      placeChild(newFiber, newIdx);
      if (!previousNewFiber) {
        resultingFirstChild = newFiber;
      } else {
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (newIdx === newChildren.length) {
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }
    //如果没有老fiber了
    if (!oldFiber) {
      // 循环虚拟DOM数组，为每个虚拟DOM创建一个新的fiber
      for (; newIdx < newChildren.length; newIdx++) {
        const newFiber = createChild(returnFiber, newChildren[newIdx]); //li(C)
        placeChild(newFiber, newIdx);
        if (!previousNewFiber) {
          resultingFirstChild = newFiber; //li(A)
        } else {
          previousNewFiber.sibling = newFiber; //li(B).sibling=li(C)
        }
        previousNewFiber = newFiber; //previousNewFiber=>li(C)
      }
    }
    return resultingFirstChild;
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
      if (newChild.$$typeof === REACT_ELEMENT_TYPE) {
        return placeSingleChild(
          reconcileSingleElement(returnFiber, currentFirstChild, newChild)
        );
      }
    }
    if (Array.isArray(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild);
    }
  }
  return reconcileChildFibers;
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
