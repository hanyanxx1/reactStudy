import { createUpdate, enqueueUpdate } from "./ReactUpdateQueue";
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

/**
 * 把虚拟DOMelement变成真实DoM插入或者说渲染到container容器中
 * @param {*} element
 * @param {*} container
 */
export function updateContainer(element, container) {
  //正常来说一个fiber节点会对应一个真实Dom节点，hostRootFiber对应的DoM节点就是containerInfo divi#root

  //获取hostRootFiber fiber根的根节点
  const current = container.current;
  const update = createUpdate();
  //element = <div key="title" id="title">title</div>
  update.payload = { element };
  //把更新添加到fiber的更新队列里
  enqueueUpdate(current, update);
  scheduleUpdateOnFiber(current);
}
