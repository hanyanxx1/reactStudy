export const Placement = 0b00000000000000000000000010; //2 添加 或者说创建
export const Update = 0b00000000000000000000000100; //4 更新

let workInProgress = { flags: 0 };
workInProgress.flags |= Update;
console.log(workInProgress);

workInProgress.flags |= Placement;
console.log(workInProgress);
