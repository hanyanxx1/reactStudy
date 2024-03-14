const UpdateState = 0;
function initializeUpdateQueue(fiber) {
  const queue = {
    shared: {
      pending: null,
    },
  };
  fiber.updateQueue = queue;
}
function createUpdate() {
  const update = { tag: UpdateState };
  return update;
}
function enqueueUpdate(fiber, update) {
  const updateQueue = fiber.updateQueue;
  const sharedQueue = updateQueue.shared;
  const pending = sharedQueue.pending;
  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  updateQueue.shared.pending = update;
}
function getStateFromUpdate(update, prevState) {
  switch (update.tag) {
    case UpdateState: {
      const { payload } = update;
      const partialState = payload;
      return Object.assign({}, prevState, partialState);
    }
    default:
      return prevState;
  }
}
function processUpdateQueue(workInProgress) {
  const queue = workInProgress.updateQueue;
  const pendingQueue = queue.shared.pending;
  if (pendingQueue !== null) {
    queue.shared.pending = null;
    const lastPendingUpdate = pendingQueue;
    const firstPendingUpdate = lastPendingUpdate.next;
    lastPendingUpdate.next = null;
    let newState = workInProgress.memoizedState;
    let update = firstPendingUpdate;
    while (update) {
      newState = getStateFromUpdate(update, newState);
      update = update.next;
    }
    workInProgress.memoizedState = newState;
  }
}
let fiber = { memoizedState: { id: 1 } };
initializeUpdateQueue(fiber);
let update1 = createUpdate();
update1.payload = { name: "zhufeng" };
enqueueUpdate(fiber, update1);
let update2 = createUpdate();
update2.payload = { age: 14 };
enqueueUpdate(fiber, update2);
processUpdateQueue(fiber);
console.log(fiber);
