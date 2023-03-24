// 应用场景
// React 虚拟 DOM 的构建
// React 的 fiber 树构建

let root = {
  name: "A",
  children: [
    {
      name: "B",
      children: [{ name: "B1" }, { name: "B2" }],
    },
    {
      name: "C",
      children: [{ name: "C1" }, { name: "C2" }],
    },
  ],
};

function dfs(node) {
  console.log(node);
  node.children &&
    node.children.forEach((child) => {
      dfs(child);
    });
}

dfs(root);
