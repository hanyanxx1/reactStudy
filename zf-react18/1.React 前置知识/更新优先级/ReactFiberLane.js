const NoLanes = 0b00;
const NoLane = 0b00;
const SyncLane = 0b01;
const SyncBatchedLane = 0b10;
/**
 * 判断subset是不是set的子集
 * @param {*} set
 * @param {*} subset
 * @returns
 */
function isSubsetOfLanes(set, subset) {
  return (set & subset) === subset;
}
/**
 * 合并两个车道
 * @param {*} a
 * @param {*} b
 * @returns
 */
function mergeLanes(a, b) {
  return a | b;
}
module.exports = {
  NoLane,
  NoLanes,
  SyncLane,
  SyncBatchedLane,
  isSubsetOfLanes,
  mergeLanes,
};
