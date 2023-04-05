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

function FunctionComponent() {
  const [number, setNumber] = React.useState(0);
  return number === 0 ? (
    <div onClick={() => setNumber(number + 1)} key="title1" id="title">
      title
    </div>
  ) : (
    <div onClick={() => setNumber(number + 1)} key="title2" id="title2">
      title2
    </div>
  );
}

let element = <FunctionComponent />;

const root = createRoot(document.getElementById("root"));
root.render(element);
