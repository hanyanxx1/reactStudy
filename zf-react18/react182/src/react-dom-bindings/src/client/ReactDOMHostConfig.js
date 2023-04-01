import { setInitialProperties } from "./ReactDOMComponent";
export function shouldSetTextContent(type, props) {
  return (
    typeof props.children === "string" || typeof props.children === "number"
  );
}

export const appendInitialChild = (parent, child) => {
  parent.appendChild(child);
}

export const createInstance = (type, props, internalInstanceHandle) => {
  const domElement = document.createElement(type);
  return domElement;
};

export const createTextInstance = (content) => document.createTextNode(content);

export function finalizeInitialChildren(domElement, type, props) {
  setInitialProperties(domElement, type, props);
}