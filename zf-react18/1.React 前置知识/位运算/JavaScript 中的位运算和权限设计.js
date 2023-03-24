//https://juejin.cn/post/6844903988945485837
let value = 0b10000000000000000000000000000000;
console.log(value, value.toString(2));
value = ~value;
console.log(value, value.toString(2));

// 3.1. 添加权限
let r = 0b100;
let w = 0b010;
let x = 0b001;

// 给用户赋全部权限（使用前面讲的 | 操作）
let user = r | w | x;

console.log(user);
// 7

console.log(user.toString(2));
// 111

//     r = 0b100
//     w = 0b010
//     r = 0b001
// r|w|x = 0b111

//3.2. 校验权限
r = 0b100;
w = 0b010;
x = 0b001;

// 给用户赋 r w 两个权限
user = r | w;
// user = 6
// user = 0b110 (二进制)

console.log((user & r) === r); // true  有 r 权限
console.log((user & w) === w); // true  有 w 权限
console.log((user & x) === x); // false 没有 x 权限

//3.3. 删除权限
user = 0b110; // 有 r w 两个权限

// 执行异或操作，删除 r 权限
user = user ^ r;

console.log((user & r) === r); // false 没有 r 权限
console.log((user & w) === w); // true  有 w 权限
console.log((user & x) === x); // false 没有 x 权限

console.log(user.toString(2)); // 现在 user 是 0b010

// 再执行一次异或操作
user = user ^ r;

console.log((user & r) === r); // true  有 r 权限
console.log((user & w) === w); // true  有 w 权限
console.log((user & x) === x); // false 没有 x 权限

console.log(user.toString(2)); // 现在 user 又变回 0b110

//方案2
r = 0b100;
w = 0b010;
x = 0b001;
user = 0b110; // 有 r w 两个权限

// 删除 r 权限
user = user & ~r;

console.log((user & r) === r); // false 没有 r 权限
console.log((user & w) === w); // true  有 w 权限
console.log((user & x) === x); // false 没有 x 权限

console.log(user.toString(2)); // 现在 user 是 0b010

// 再执行一次
user = user & ~r;

console.log((user & r) === r); // false 没有 r 权限
console.log((user & w) === w); // true  有 w 权限
console.log((user & x) === x); // false 没有 x 权限

console.log(user.toString(2)); // 现在 user 还是 0b010，并不会新增
