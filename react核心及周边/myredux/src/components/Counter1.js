// import React, { Component } from "react";
// import actions from "../store/actions/counter1";
// import { connect } from "../react-redux";
// class Counter1 extends Component {
//   render() {
//     let { number, add1, minus1 } = this.props;
//     return (
//       <div>
//         <p>{number}</p>
//         <button onClick={add1}>+</button>
//         <button onClick={minus1}>-</button>
//         <button onClick={() => setTimeout(() => add1(), 1000)}>1秒后加1</button>
//       </div>
//     );
//   }
// }
// let mapStateToProps = (state) => state.counter1;
// export default connect(mapStateToProps, actions)(Counter1);

import React from "react";
import { useDispatch, useSelector } from "../react-redux";
function Counter1() {
  let state = useSelector((state) => state.counter1); //状态映射函数 connect(mapStateToProps)
  let dispatch = useDispatch();
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={() => dispatch({ type: "ADD1" })}>+</button>
    </div>
  );
}
export default Counter1;
