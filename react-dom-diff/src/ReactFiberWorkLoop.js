/**
 * 不管如何更新，不管谁来更新，都会调度到这个方法里
 * @param {*} fiber
 */
export function scheduleUpdateOnFiber(fiber) {
  const fiberRoot = markUpdateLaneFromFiberToRoot(fiber);
  performSyncWorkOnRoot(fiberRoot);
}

function performSyncWorkOnRoot(fiberRoot) {
  // 至此从render到执行工作循环已经完成
  console.log(fiberRoot);
}

function markUpdateLaneFromFiberToRoot(sourceFiber) {
  let node = sourceFiber;
  let parent = node.parent;
  while (parent) {
    node = parent;
    parent = node.parent;
  }
  //node其实肯定fiber树的根节点，其实就是hostRootFiber .stateNode div#root
  return node.stateNode;
}
