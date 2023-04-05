import * as React from "react";
import { createRoot } from "react-dom/client";
// let element = (
//   <h1>
//     hello<span style={{ color: "red" }}>world</span>
//   </h1>
// );

// function FunctionComponent() {
//   return (
//     <h1>
//       hello<span style={{ color: "red" }}>world</span>
//     </h1>
//   );
// }

// function FunctionComponent() {
//   return (
//     <h1
//       onClick={() => console.log("onClick FunctionComponent")}
//       onClickCapture={() => console.log("onClickCapture FunctionComponent")}
//     >
//       hello
//       <span
//         style={{ color: "red" }}
//         onClick={() => console.log("onClick span")}
//         onClickCapture={() => console.log("onClickCapture span")}
//       >
//         world
//       </span>
//     </h1>
//   );
// }

// const reducer = (state, action) => {
//   if (action.type === "add") return state + 1;
//   // if (action.type === "mul") return state * 2;
//   return state;
// };
// function FunctionComponent() {
//   const [number, setNumber] = React.useReducer(reducer, 0);
//   // const [number1, setNumber1] = React.useReducer(reducer, 2);
//   return (
//     <button
//       onClick={() => {
//         setNumber({ type: "add" });
//         // setNumber({ type: "mul" });
//         // setNumber1({ type: "add" });
//         // setNumber1({ type: "mul" });
//       }}
//     >
//       {/* {number + number1} */}
//       {number}
//     </button>
//   );
// }

// function FunctionComponent() {
//   console.log("FunctionComponent render");
//   const [number, setNumber] = React.useState(10);
//   return (
//     <button onClick={() => setNumber((number) => number + 1)}>{number}</button>
//   );
// }

//24.单节点(key 相同,类型相同)
// function FunctionComponent() {
//   const [number, setNumber] = React.useState(0);
//   return number === 0 ? (
//     <div onClick={() => setNumber(number + 1)} key="title" id="title">
//       title
//     </div>
//   ) : (
//     <div onClick={() => setNumber(number + 1)} key="title" id="title2">
//       title2
//     </div>
//   );
// }

//25.单节点 key 不同,类型相同
// function FunctionComponent() {
//   const [number, setNumber] = React.useState(0);
//   return number === 0 ? (
//     <div onClick={() => setNumber(number + 1)} key="title1" id="title">
//       title
//     </div>
//   ) : (
//     <div onClick={() => setNumber(number + 1)} key="title2" id="title2">
//       title2
//     </div>
//   );
// }

//26.单节点 key 相同,类型不同
// function FunctionComponent() {
//   const [number, setNumber] = React.useState(0);
//   return number === 0 ? (
//     <div onClick={() => setNumber(number + 1)} key="title1" id="title1">
//       title1
//     </div>
//   ) : (
//     <p onClick={() => setNumber(number + 1)} key="title1" id="title1">
//       title1
//     </p>
//   );
// }

//27.原来多个节点，现在只有一个节点
function FunctionComponent() {
  const [number, setNumber] = React.useState(0);
  return number === 0 ? (
    <ul key="container" onClick={() => setNumber(number + 1)}>
      <li key="A">A</li>
      <li key="B" id="B">
        B
      </li>
      <li key="C">C</li>
    </ul>
  ) : (
    <ul key="container" onClick={() => setNumber(number + 1)}>
      <li key="B" id="B2">
        B2
      </li>
    </ul>
  );
}

let element = <FunctionComponent />;

const root = createRoot(document.getElementById("root"));
root.render(element);
