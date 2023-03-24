class Stack {
  constructor() {
    this.data = [];
    this.top = 0;
  }

  push(node) {
    this.data[this.top++] = node;
  }

  pop() {
    return this.data[--this.top];
  }

  peek() {
    return this.data[this.top - 1];
  }

  size() {
    return this.top;
  }

  clear() {
    this.top = 0;
  }
}

const stack = new Stack();
stack.push("aaa");
stack.push("bbb");
stack.push("ccc");
console.log("stack.size()", stack.size());
console.log("stack.peek", stack.peek());
console.log("stack.pop()", stack.pop());
console.log("stack.peek()", stack.peek());
stack.push("4");
console.log("stack.peek", stack.peek());
stack.clear();
console.log("stack.size", stack.size());
stack.push("5");
console.log("stack.peek", stack.peek());
