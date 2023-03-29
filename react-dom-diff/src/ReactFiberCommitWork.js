import { appendChild, removeChild } from "./ReactDOMHostConfig";
import { HostComponent, HostRoot } from "./ReactWorkTags";
import { updateProperties } from "./ReactDOMComponent";

function getParentStateNode(fiber) {
  let parent = fiber.return;
  do {
    if (parent.tag === HostComponent) {
      return parent.stateNode;
    } else if (parent.tag === HostRoot) {
      return parent.stateNode.containerInfo;
    } else {
      parent = parent.return;
    }
  } while (parent);
}

/**
 * 插入节点
 * @param {*} nextEffect
 */
export function commitPlacement(nextEffect) {
  let stateNode = nextEffect.stateNode;
  let parentStateNode = getParentStateNode(nextEffect);
  appendChild(parentStateNode, stateNode);
}

/**
 * 提交DOM更新操作
 * @param {*} current
 * @param {*} finishedWork
 */
export function commitWork(current, finishedWork) {
  const updatePayload = finishedWork.updateQueue;
  finishedWork.updateQueue = null;
  if (updatePayload) {
    updateProperties(finishedWork.stateNode, updatePayload);
  }
}

export function commitDeletion(fiber) {
  if (!fiber) return;
  let parentStateNode = getParentStateNode(fiber);
  removeChild(parentStateNode, fiber.stateNode);
}
