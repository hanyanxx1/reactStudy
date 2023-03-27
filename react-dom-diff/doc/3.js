function createWorkInProgress(fiber) {
  // A -> B -> A -> B -> ...
  console.log(fiber)
  let newFiber = fiber.next;
  if (!newFiber) {
    newFiber = { root: "B" };
    newFiber.next = fiber;
    fiber.next = newFiber;
  }
  return newFiber;
}

let fiberA = {
  root: "A",
};

 createWorkInProgress(createWorkInProgress(createWorkInProgress(createWorkInProgress(fiberA))))


