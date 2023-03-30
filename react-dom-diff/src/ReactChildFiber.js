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
  //如果有老的更新老的，没有老的，返回新的
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
  function placeChild(newFiber, lastPlacedIndex, newIdx) {
    newFiber.index = newIdx;
    if (!shouldTrackSideEffects) {
      return lastPlacedIndex;
    }
    const current = newFiber.alternate;
    //如果有current说是更新，复用老节点的更新，不会添加Placement
    if (current) {
      const oldIndex = current.index;
      //6.如果老fiber它对应的真实DOM挂载的索引比lastplacedIndex小
      if (oldIndex < lastPlacedIndex) {
        //7.如果小于lastPlacedIndex则需要移动考fber，lastPlacedIndex不变
        newFiber.flags |= Placement;
        return lastPlacedIndex;
      } else {
        //8.如果大于lastPlacedIndex则不需要移动老fiber,更新lastPlacedIndex为老fiber的index
        return oldIndex;
      }
    } else {
      newFiber.flags = Placement;
      return lastPlacedIndex;
    }
  }
  function updateFromMap(existingChildren, returnFiber, newIdx, newChild) {
    const matchedFiber = existingChildren.get(newChild.key || newIdx);
    return updateElement(returnFiber, matchedFiber, newChild);
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
    //3.然后声明一个lastPlacedIndex变量，表示不需要移动的老节点的索引,默认为0
    let lastPlacedIndex = 0;
    //处理更新的情况，老fiber和新fiber都存在
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
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
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
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        if (!previousNewFiber) {
          resultingFirstChild = newFiber; //li(A)
        } else {
          previousNewFiber.sibling = newFiber; //li(B).sibling=li(C)
        }
        previousNewFiber = newFiber; //previousNewFiber=>li(C)
      }
    }
    //1.第一轮比较A和A，相同可以复用，更新，然后比较B和C，key不同直接跳出第一个循环
    //如果key不同，且oldFiber不为空，将剩下的老fiber放入map中
    const existingChildren = mapRemainingChildren(returnFiber, oldFiber);
    // 4.继续循环剩下的虚拟DOM节点，从C开始
    for (; newIdx < newChildren.length; newIdx++) {
      //5.如果能在map中找到相同key相同type的节点则可以复用老fber,并把此老fber从map中刚除
      const newFiber = updateFromMap(
        existingChildren,
        returnFiber,
        newIdx,
        newChildren[newIdx]
      );
      if (newFiber) {
        //说明是复用的老fiber
        if (newFiber.alternate) {
          existingChildren.delete(newFiber.key || newIdx);
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        if (!previousNewFiber) {
          resultingFirstChild = newFiber; //li(A)
        } else {
          previousNewFiber.sibling = newFiber; //li(B).sibling=li(C)
        }
        previousNewFiber = newFiber; //previousNewFiber=>li(C)
      }
    }
    //9.虚拟DOM循环结束后把map中所有的剩下的fiber全部标记为删除
    existingChildren.forEach((child) => deleteChild(returnFiber, child));
    return resultingFirstChild;
  }
  function mapRemainingChildren(returnFiber, currentFirstChild) {
    //2.把乘 下oldFiber的放入existingChildren这个map中
    //existingChildren={B:bFiber,C:CFiber,D:dFiber,E:eFiber,F:fFiber}
    const existingChildren = new Map();
    let existingChild = currentFirstChild;
    while (existingChild) {
      let key = existingChild.key || existingChild.index;
      existingChildren.set(key, existingChild);
      existingChild = existingChild.sibling;
    }
    return existingChildren;
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
