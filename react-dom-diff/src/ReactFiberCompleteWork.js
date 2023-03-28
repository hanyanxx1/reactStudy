import { HostComponent } from "./ReactWorkTags";
import { createInstance, finalizeInitialChildren } from "./ReactDOMHostConfig";

export function completeWork(currnet, workInProgress) {
  const newProps = workInProgress.pendingProps;
  switch (workInProgress.tag) {
    case HostComponent:
      //创建真是的DOM节点
      const type = workInProgress.type; //div,span,p
      //创建此fiber的真实DOM
      const instance = createInstance(type, newProps);
      //让此Fiber的真实DOM属性指向instance
      workInProgress.stateNode = instance;
      //给真实DOM添加属性包括如果独生子是字符串或数字的情况
      finalizeInitialChildren(instance, type, newProps);
      break;
    default:
      break;
  }
}
