//可以给fiber添加一个副作用标识符，表示此fiber对应的D0M节点需要进行何种操作
export const NoFlags = 0b00000000000000000000000000; //0
export const PerformedWork = 0b00000000000000000000000001; //2
export const Placement = 0b00000000000000000000000010; //4
export const Update = 0b00000000000000000000000100; //6
export const Deletion = 0b00000000000000000000001000; //8
