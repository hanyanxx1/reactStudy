export const Placement = 0b00000000000000000000000010; //2 添加 或者说创建

function collectEffectList(returnFiber, completeWork) {
  //如果父亲 没有effectList,那就让父亲的firstEffect链表头指向自己的头
  if (!returnFiber.firstEffect) {
    returnFiber.firstEffect = completeWork.firstEffect;
  }
  //如果自己有链表尾
  if (completeWork.lastEffect) {
    //并且父亲也有链表尾
    if (returnFiber.lastEffect) {
      // 把自己身上的effectList挂接到父亲的链表尾部
      returnFiber.lastEffect.nextEffect = completeWork.firstEffect;
    }
    returnFiber.lastEffect = completeWork.lastEffect;
  }
  const flags = completeWork.flags;
  //如果此完成的Fiber有副作用，那么就需要添加到effectList里
  if (flags) {
    //如果父fiber有lastEffect的话，说明父fiber已经有effect链表
    if (returnFiber.lastEffect) {
      returnFiber.lastEffect.nextEffect = completeWork;
    } else {
      returnFiber.firstEffect = completeWork;
    }
    returnFiber.lastEffect = completeWork;
  }
}

let rootFiber = { key: "rootFiber" };
let fiberA = { key: "A", flags: Placement };
let fiberB = { key: "B", flags: Placement };
let fiberC = { key: "C", flags: Placement };
collectEffectList(fiberA, fiberB); // fiberA.firstEffect => fiberA.lastEffect => fiberB
collectEffectList(fiberA, fiberC); // fiberA.firstEffect => fiberB , fiberA.lastEffect.nextEffect => fiberA.lastEffect => fiberC
collectEffectList(rootFiber, fiberA);
let effectList = "";
let nextEffect = rootFiber.firstEffect;
while (nextEffect) {
  effectList += `${nextEffect.key}=>`;
  nextEffect = nextEffect.nextEffect;
}
effectList += "null";
console.log(effectList);
