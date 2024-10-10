import React from "react";
import actions from "../store/actions/counter2";
import { useSelector, useBoundDispatch } from "../react-redux";
function Counter3() {
  let { number } = useSelector((state) => state.counter2);
  let boundActions = useBoundDispatch(actions);
  return (
    <div>
      <p>{number}</p>
      <button onClick={boundActions.add2}>+</button>
      <button onClick={boundActions.minus2}>-</button>
    </div>
  );
}
export default Counter3;
