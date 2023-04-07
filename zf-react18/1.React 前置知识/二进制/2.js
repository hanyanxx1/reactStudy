let result;

// 0b00000011
// 3
result = 0b00000011;
console.log(result);

// ~0b00000011 =>  0b11111100
// -4
result = ~0b00000011;
console.log(result);

console.log(result.toString(2));

//求补码的真值
//1 表示负号
//剩下的 1111100 开始转换
//1111100 减1 => 1111011
//1111100 取反 => 0000100 => 4

/**
 * 分离出所有比特位中最右边的1
 * 分离出最高优先级的车道
 * @param {*} lanes 车道
 * @returns 车道
 */
function getHighestPriorityLane(lanes) {
  //-12源码 => 10001100
  //-12的补码
  //1 最高符号位
  //0001100 其余取反=> 1110011 => 最后加1 => 1110100 => 补上符号位 11110100

  //lanes & -lanes
  //lanes           => 00001100
  //-lanes          => 11110100
  //lanes & -lanes  => 00000100 => 4

  return lanes & -lanes;
}

let lanes = 0b00001100; // => 12

getHighestPriorityLane(lanes) //=> 4