/**
 * 初始化更新队列
 * 所有的fiber都会等待理更新内容放在更新队列中
 */
function initializeUpdateQueue(fiber) {
  const updateQueue = {
    shared: {
      pending: null,
    },
  };
  fiber.updateQueue = updateQueue;
}

let fiber = { baseState: { number: 0 } };
initializeUpdateQueue(fiber);

function createUpdate() {
  return {};
}

/**
 * 向当前的fiber的更新队列中添加一个更新
 * @param {*} fiber
 * @param {*} update
 */
function enqueueUpdate(fiber, update) {
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

const update1 = createUpdate();
update1.payload = { number: 1 }; // update1 = {payload:{number: 1}}
//把update1添加到更新队列链表里
enqueueUpdate(fiber, update1);
const update2 = createUpdate();
update2.payload = { number: 2 }; // update2 = {payload:{number: 2}}
//把update2添加到更新队列链表里
enqueueUpdate(fiber, update2);

const update3 = createUpdate();
update3.payload = { number: 3 }; // update3 = {payload:{number: 3}}
//把update3添加到更新队列链表里
enqueueUpdate(fiber, update3);

// console.log(fiber.updateQueue.shared.pending.next.next)
