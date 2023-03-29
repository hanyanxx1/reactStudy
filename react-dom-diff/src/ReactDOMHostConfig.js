import {
  createElement,
  setInitialProperties,
  diffProperties,
} from "./ReactDOMComponent";

//如果儿子只是一个数组或者字符串，就设置它的文本内容就行，不需要创建子fiber节点
export function shouldSetTextContent(type, props) {
  return (
    typeof props.children === "string" || typeof props.children === "number"
  );
}
export function createInstance(type) {
  return createElement(type);
}
export function finalizeInitialChildren(domElement, type, props) {
  setInitialProperties(domElement, type, props);
}
export function appendChild(parentInstance, child) {
  parentInstance.appendChild(child);
}
export function prepareUpdate(domElement, type, oldProps, newProps) {
  return diffProperties(domElement, type, oldProps, newProps);
}
export function removeChild(parentInstance, child) {
  parentInstance.removeChild(child);
}