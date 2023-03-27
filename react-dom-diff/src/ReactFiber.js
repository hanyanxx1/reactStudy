import { HostRoot } from "./ReactWorkTags";

export function createHostRootFiber() {
  return createFiber(HostRoot);
}

/**
 * 创建fiber节点
 * @param {*} tag fiber的标签HostRoot指的是根节点div span HostComponent
 * @param {*} pendingProps 等待生效的属性对象
 * @param {*} key
 * @returns
 */
function createFiber(tag, pendingProps, key) {
  return new FiberNode(tag, pendingProps, key);
}

function FiberNode(tag, pendingProps, key) {
  this.tag = tag;
  this.pendingProps = pendingProps;
  this.key = key;
}
