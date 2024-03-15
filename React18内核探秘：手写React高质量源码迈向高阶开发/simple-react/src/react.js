import { REACT_ELEMENT, REACT_FORWARD_REF, toVNode, shallowEqual, REACT_MEMO } from "./utils";
import { Component } from "./Component";
export * from "./hooks";

function createElement(type, properties = {}, children) {
  let ref = properties.ref || null; // 后面会讲到，这里只需要知道是跟操作DOM相关
  let key = properties.key || null; // 后面会讲到，这里只需要知道这个跟DOM DIFF相关

  ["ref", "key", "__self", "__source"].forEach((key) => {
    // 可能还会有别的属性也不需要，在发现的时候我们再添加需要删除的属性
    delete properties[key]; // props中有些属性并不需要
  });

  let props = { ...properties };

  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(toVNode);
  } else {
    props.children = toVNode(children);
  }

  return {
    $$typeof: REACT_ELEMENT,
    type,
    ref,
    key,
    props,
  };
}

function createRef() {
  return {
    current: null,
  };
}

function forwardRef(render) {
  return {
    $$typeof: REACT_FORWARD_REF,
    render,
  };
}

class PureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }
}

function memo(type, compare = shallowEqual) {
  return {
    $$typeof: REACT_MEMO,
    type,
    compare,
  };
}

const React = {
  createElement,
  Component,
  createRef,
  forwardRef,
  PureComponent,
  memo,
};

export default React;
