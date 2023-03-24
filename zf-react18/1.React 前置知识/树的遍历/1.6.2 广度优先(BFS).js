// 宽度优先搜索算法（又称广度优先搜索），其英文全称是 Breadth First Search
// 算法首先搜索距离为k的所有顶点，然后再去搜索距离为k+l的其他顶点

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

function bfs(node) {
  const state = [];
  state.push(node);
  let currnet;
  while ((currnet = state.shift())) {
    console.log(currnet.name);
    currnet.children &&
      currnet.children.forEach((child) => {
        state.push(child);
      });
  }
}

bfs(root);
