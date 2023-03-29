import { HostComponent } from "./ReactWorkTags";
import {
  createInstance,
  finalizeInitialChildren,
  prepareUpdate,
} from "./ReactDOMHostConfig";
import { Update } from "./ReactFiberFlags";

export function completeWork(currnet, workInProgress) {
  const newProps = workInProgress.pendingProps;
  switch (workInProgress.tag) {
    case HostComponent:
      //在新的fiber构建完成的时候，收集更新并且标识更新副作用
      if (currnet && workInProgress.stateNode) {
        updateHostComponent(
          currnet,
          workInProgress,
          workInProgress.tag,
          newProps
        );
      } else {
        //创建真是的DOM节点
        const type = workInProgress.type; //div,span,p
        //创建此fiber的真实DOM
        const instance = createInstance(type, newProps);
        //让此Fiber的真实DOM属性指向instance
        workInProgress.stateNode = instance;
        //给真实DOM添加属性包括如果独生子是字符串或数字的情况
        finalizeInitialChildren(instance, type, newProps);
      }
      break;
    default:
      break;
  }
}

/**
 *
 * @param {*} currnet 老fiber
 * @param {*} workInProgress 新fiber
 * @param {*} tag
 * @param {*} newProps 新虚拟DOM上的属性
 */
function updateHostComponent(current, workInProgress, tag, newProps) {
  // 老fiber上的老属性
  let oldProps = current.memoizedProps;
  //可复用真是的DOM节点
  const instance = workInProgress.stateNode;
  const updatePayload = prepareUpdate(instance, tag, oldProps, newProps);
  workInProgress.updateQueue = updatePayload;
  if (updatePayload) {
    //如果原来是0，变是4 100，如果原来是2 010，变成110
    workInProgress.flags |= Update;
    //当flags=6的话，就是既要插入新位置，又要更新，针对移动节点的情况
  }
}

/**
 * 根fiber rootFiber updateQueue 上面是一个环状链表 update {payload:element}
 * 原生组件fiber HostComponent updateQueue=updatePayload 数组 [key1,value1,key2,value2]
 */
