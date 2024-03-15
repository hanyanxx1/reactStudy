import { updateDomTree, findDomByVNode } from "./react-dom";
import { deepClone } from "./utils";

export const updaterQueue = {
  isBatch: false,
  updaters: new Set(),
};

export function flushUpdaterQueue() {
  updaterQueue.isBatch = false;
  for (let updater of updaterQueue.updaters) {
    updater.launchUpdate();
  }
  updaterQueue.updaters.clear();
}

class Updater {
  constructor(ClassComponentInstance) {
    this.ClassComponentInstance = ClassComponentInstance;
    this.pendingStates = [];
  }
  addState(partialState) {
    this.pendingStates.push(partialState);
    this.preHandleForUpdate();
  }
  preHandleForUpdate() {
    if (updaterQueue.isBatch) {
      updaterQueue.updaters.add(this);
    } else {
      this.launchUpdate();
    }
  }
  launchUpdate(nextProps) {
    const { ClassComponentInstance, pendingStates } = this;
    let prevProps = deepClone(this.ClassComponentInstance.props);
    let prevState = deepClone(this.ClassComponentInstance.state);
    if (pendingStates.length === 0 && !nextProps) return;
    let isShouldUpdate = true;
    let nextState = this.pendingStates.reduce((preState, newState) => {
      return {
        ...preState,
        ...newState,
      };
    }, this.ClassComponentInstance.state);
    if (
      ClassComponentInstance.shouldComponentUpdate &&
      !ClassComponentInstance.shouldComponentUpdate(nextProps, nextState)
    ) {
      isShouldUpdate = false;
    }
    if (nextProps) ClassComponentInstance.props = nextProps;
    ClassComponentInstance.state = nextState;
    this.pendingStates.length = 0;
    if (isShouldUpdate) ClassComponentInstance.update(prevProps, prevState);
  }
}

export class Component {
  static IS_CLASS_COMPONENT = true;
  constructor(props) {
    this.updater = new Updater(this);
    this.props = props;
    this.state = {};
  }
  setState(partialState) {
    this.updater.addState(partialState);
  }
  update(prevProps, prevState) {
    let oldVNode = this.oldVNode;
    let oldDOM = findDomByVNode(oldVNode);
    if (this.constructor.getDerivedStateFromProps) {
      let newState = this.constructor.getDerivedStateFromProps(this.props, this.state) || {};
      this.state = { ...this.state, ...newState };
    }
    let snapshot =
      this.getSnapshotBeforeUpdate && this.getSnapshotBeforeUpdate(prevProps, prevState);
    let newVNode = this.render();
    updateDomTree(oldVNode, newVNode, oldDOM);
    this.oldVNode = newVNode;
    if (this.componentDidUpdate) {
      this.componentDidUpdate(this.props, this.state, snapshot);
    }
  }
}
