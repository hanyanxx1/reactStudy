/**
 * 初始化更新队列
 * 所有的fiber都会等待理更新内容放在更新队列中
 */
export function initializeUpdateQueue(fiber) {
  const updateQueue = {
    shared: {
      pending: null,
    },
  };
  fiber.updateQueue = updateQueue;
}

let fiber = { baseState: { number: 0 } };
initializeUpdateQueue(fiber);

export function createUpdate() {
  return {};
}

/**
 * 向当前的fiber的更新队列中添加一个更新
 * @param {*} fiber
 * @param {*} update
 */
export function enqueueUpdate(fiber, update) {
  const updateQueue = fiber.updateQueue;
  const sharedQueue = updateQueue.shared;
  let pending = sharedQueue.pending;
  if (!pending) {
    update.next = update;
  } else {
    // update2.next = update1.next
    update.next = pending.next;
    // update1.next = update2.next
    pending.next = update;
  }
  //fiber.updateQueue.shared.pending = update2
  sharedQueue.pending = update;
}
