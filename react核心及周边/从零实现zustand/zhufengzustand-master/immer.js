

const { produce } = require('immer');
let baseState = {
  ids: [1, 2, 3],
  pos: {
    x: 1,
    y: 2
  }
}
const nextState = produce(baseState, (draft) => {
  draft.ids.push(4);
});

console.log(baseState === nextState);
console.log(baseState.pos === nextState.pos);
//比较对象是否相等不需要深度遍历对象的每一层属性

// 