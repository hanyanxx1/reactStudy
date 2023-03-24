const {
  NoLane,
  NoLanes,
  isSubsetOfLanes,
  mergeLanes,
} = require("./ReactFiberLane");
function initializeUpdateQueue(fiber) {
  const queue = {
    baseState: fiber.memoizedState, //本次更新前该Fiber节点的state,Update基于该state计算更新后的state
    firstBaseUpdate: null, //本次更新前该Fiber节点已保存的Update链表头
    lastBaseUpdate: null, //本次更新前该Fiber节点已保存的Update链表尾
    shared: {
      //触发更新时，产生的Update会保存在shared.pending中形成单向环状链表
      //当由Update计算state时这个环会被剪开并连接在lastBaseUpdate后面
      pending: null,
    },
  };
  fiber.updateQueue = queue;
}
function enqueueUpdate(fiber, update) {
  const updateQueue = fiber.updateQueue;
  if (updateQueue === null) {
    return;
  }
  const sharedQueue = updateQueue.shared;
  const pending = sharedQueue.pending;
  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  sharedQueue.pending = update;
}

/**
 * 处理更新队列
 * @param {*} fiber
 * @param {*} renderLanes
 */
function processUpdateQueue(fiber, renderLanes) {
  //获取此fiber上的更新队列
  const queue = fiber.updateQueue;
  //获取第一个更新
  let firstBaseUpdate = queue.firstBaseUpdate;
  let lastBaseUpdate = queue.lastBaseUpdate;
  //判断一下是否在等待生效的的更新，如果有，变成base队列
  let pendingQueue = queue.shared.pending;
  if (pendingQueue !== null) {
    //等待生效的队列是循环队列
    queue.shared.pending = null;
    //最后一个等待的更新 update4
    const lastPendingUpdate = pendingQueue;
    //第一个等待的更新 update1
    const firstPendingUpdate = lastPendingUpdate.next;
    //把环剪断，最后一个不再指向第一个
    lastPendingUpdate.next = null;
    //把等待生效的队列添加到base队列中
    //如果base队列为空
    if (lastBaseUpdate === null) {
      firstBaseUpdate = firstPendingUpdate;
    } else {
      //否则就把当前的更新队列添加到base队列的尾部
      lastBaseUpdate.next = firstPendingUpdate;
    }
    //尾部也接上
    lastBaseUpdate = lastPendingUpdate;
  }
  //开始计算新的状态
  if (firstBaseUpdate !== null) {
    //先获取老的值{number:0}
    let newState = queue.baseState;
    let newLanes = NoLanes;
    let newBaseState = null; //新的基础状态
    let newFirstBaseUpdate = null; //第一个跳过的更新
    let newLastBaseUpdate = null; //新的最后一个基本更新
    let update = firstBaseUpdate; //指向第一个更新
    do {
      //获取更新车道
      const updateLane = update.lane;
      //如果优先级不够，跳过这个更新，如果这是第一个跳过的更新，上一个状态和更新成为newBaseState和newFirstBaseUpdate
      if (!isSubsetOfLanes(renderLanes, updateLane)) {
        const clone = {
          id: update.id,
          lane: updateLane,
          payload: update.payload,
        };
        if (newLastBaseUpdate === null) {
          newFirstBaseUpdate = newLastBaseUpdate = clone; // first=last=update1
          newBaseState = newState; //0
        } else {
          newLastBaseUpdate = newLastBaseUpdate.next = clone;
        }
        //更新队列中的剩下的优先级
        newLanes = mergeLanes(newLanes, updateLane);
      } else {
        //如果有足够的优先级 如果有曾经跳过的更新，仍然追加在后面
        if (newLastBaseUpdate !== null) {
          const clone = {
            id: update.id,
            //NoLane是所有的优先级的子集，永远不会被跳过
            lane: NoLane,
            payload: update.payload,
          };
          newLastBaseUpdate = newLastBaseUpdate.next = clone;
        }
        newState = getStateFromUpdate(update, newState);
      }
      update = update.next;
      if (!update) {
        break;
      }
    } while (true);

    if (!newLastBaseUpdate) {
      newBaseState = newState;
    }
    queue.baseState = newBaseState;
    queue.firstBaseUpdate = newFirstBaseUpdate;
    queue.lastBaseUpdate = newLastBaseUpdate;
    fiber.lanes = newLanes;
    fiber.memoizedState = newState;
  }
}

function getStateFromUpdate(update, prevState) {
  const payload = update.payload;
  let partialState = payload(prevState);
  return Object.assign({}, prevState, partialState);
}
module.exports = {
  initializeUpdateQueue,
  enqueueUpdate,
  processUpdateQueue,
};
