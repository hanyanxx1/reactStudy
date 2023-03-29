//可以给fiber添加一个副作用标识符，表示此fiber对应的D0M节点需要进行何种操作
export const NoFlags = 0b00000000000000000000000000; //0 没有动作
export const Placement = 0b00000000000000000000000010; //2 添加 或者说创建
export const Update = 0b00000000000000000000000100; //4 更新
export const PlacementAndUpdate = 0b00000000000000000000000110; //6 移动
export const Deletion = 0b00000000000000000000001000; //8 删除
