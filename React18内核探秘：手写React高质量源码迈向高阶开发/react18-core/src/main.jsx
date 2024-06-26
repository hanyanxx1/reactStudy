import * as React from "react";
import { createRoot } from "react-dom/client";

//========================================3.实现虚拟 DOM============================================

// let element = (
//   <h1>
//     hello<span style={{ color: "red" }}>world</span>
//   </h1>
// );
// const root = createRoot(document.getElementById("root"));
// root.render(element);

//========================================15.函数组件============================================

// function FunctionComponent() {
//   return (
//     <h1>
//       hello<span style={{ color: "red" }}>world</span>
//     </h1>
//   );
// }
// let element = <FunctionComponent />;
// const root = createRoot(document.getElementById("root"));
// root.render(element);

//========================================16.注册事件名============================================

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

// let element = <FunctionComponent />;
// const root = createRoot(document.getElementById("root"));
// root.render(element);

//========================================20.mountReducer============================================

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

// let element = <FunctionComponent />;
// const root = createRoot(document.getElementById("root"));
// root.render(element);

// function FunctionComponent() {
//   console.log("FunctionComponent render");
//   const [number, setNumber] = React.useState(10);
//   return <button onClick={() => setNumber((number) => number + 1)}>{number}</button>;
// }

// let element = <FunctionComponent />;
// const root = createRoot(document.getElementById("root"));
// root.render(element);

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

// let element = <FunctionComponent />;
// const root = createRoot(document.getElementById("root"));
// root.render(element);

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

// let element = <FunctionComponent />;
// const root = createRoot(document.getElementById("root"));
// root.render(element);

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

// let element = <FunctionComponent />;
// const root = createRoot(document.getElementById("root"));
// root.render(element);

//27.原来多个节点，现在只有一个节点
// function FunctionComponent() {
//   const [number, setNumber] = React.useState(0);
//   return number === 0 ? (
//     <ul key="container" onClick={() => setNumber(number + 1)}>
//       <li key="A">A</li>
//       <li key="B" id="B">
//         B
//       </li>
//       <li key="C">C</li>
//     </ul>
//   ) : (
//     <ul key="container" onClick={() => setNumber(number + 1)}>
//       <li key="B" id="B2">
//         B2
//       </li>
//     </ul>
//   );
// }

// let element = <FunctionComponent />;
// const root = createRoot(document.getElementById("root"));
// root.render(element);

//29.多个节点的数量和 key 相同，有的 type 不同
// function FunctionComponent() {
//   console.log("FunctionComponent");
//   const [number, setNumber] = React.useState(0);
//   return number === 0 ? (
//     <ul key="container" onClick={() => setNumber(number + 1)}>
//       <li key="A">A</li>
//       <li key="B" id="B">
//         B
//       </li>
//       <li key="C" id="C">
//         C
//       </li>
//     </ul>
//   ) : (
//     <ul key="container" onClick={() => setNumber(number + 1)}>
//       <li key="A">A2</li>
//       <p key="B" id="B2">
//         B2
//       </p>
//       <li key="C" id="C2">
//         C2
//       </li>
//     </ul>
//   );
// }

// let element = <FunctionComponent />;
// const root = createRoot(document.getElementById("root"));
// root.render(element);

//30.多个节点的类型和 key 全部相同，有新增元素
// function FunctionComponent() {
//   console.log("FunctionComponent");
//   const [number, setNumber] = React.useState(0);
//   return number === 0 ? (
//     <ul key="container" onClick={() => setNumber(number + 1)}>
//       <li key="A">A</li>
//       <li key="B" id="B">
//         B
//       </li>
//       <li key="C">C</li>
//     </ul>
//   ) : (
//     <ul key="container" onClick={() => setNumber(number + 1)}>
//       <li key="A">A</li>
//       <li key="B" id="B2">
//         B2
//       </li>
//       <li key="C">C2</li>
//       <li key="D">D</li>
//     </ul>
//   );
// }

//31.多个节点的类型和 key 全部相同，有删除老元素
// function FunctionComponent() {
//   console.log("FunctionComponent");
//   const [number, setNumber] = React.useState(0);
//   return number === 0 ? (
//     <ul key="container" onClick={() => setNumber(number + 1)}>
//       <li key="A">A</li>
//       <li key="B" id="B">
//         B
//       </li>
//       <li key="C">C</li>
//     </ul>
//   ) : (
//     <ul key="container" onClick={() => setNumber(number + 1)}>
//       <li key="A">A</li>
//       <li key="B" id="B2">
//         B2
//       </li>
//     </ul>
//   );
// }

//32.多个节点数量不同、key 不同
// function FunctionComponent() {
//   console.log("FunctionComponent");
//   const [number, setNumber] = React.useState(0);
//   return number === 0 ? (
//     <ul key="container" onClick={() => setNumber(number + 1)}>
//       <li key="A">A</li>
//       <li key="B" id="b">
//         B
//       </li>
//       <li key="C">C</li>
//       <li key="D">D</li>
//       <li key="E">E</li>
//       <li key="F">F</li>
//     </ul>
//   ) : (
//     <ul key="container" onClick={() => setNumber(number + 1)}>
//       <li key="A">A2</li>
//       <li key="C">C2</li>
//       <li key="E">E2</li>
//       <li key="B" id="b2">
//         B2
//       </li>
//       <li key="G">G</li>
//       <li key="D">D2</li>
//     </ul>
//   );
// }

// let element = <FunctionComponent />;
// const root = createRoot(document.getElementById("root"));
// root.render(element);

//33.useEffect
// function Counter() {
//   const [number, setNumber] = React.useState(0);
//   React.useEffect(() => {
//     console.log("useEffect1");
//     return () => {
//       console.log("destroy useEffect1");
//     };
//   });
//   React.useEffect(() => {
//     console.log("useEffect2");
//     return () => {
//       console.log("destroy useEffect2");
//     };
//   });
//   React.useEffect(() => {
//     console.log("useEffect3");
//     return () => {
//       console.log("destroy useEffect3");
//     };
//   });
//   return (
//     <div
//       onClick={() => {
//         setNumber(number + 1);
//       }}
//     >
//       {number}
//     </div>
//   );
// }

// let element = <Counter />;
// const root = createRoot(document.getElementById("root"));
// root.render(element);

//34.useLayoutEffect
// function Counter() {
//   const [number, setNumber] = React.useState(0);
//   React.useEffect(() => {
//     console.log("useEffect1");
//     return () => {
//       console.log("destroy useEffect1");
//     };
//   });
//   React.useLayoutEffect(() => {
//     console.log("useLayoutEffect2");
//     return () => {
//       console.log("destroy useLayoutEffect2");
//     };
//   });
//   React.useEffect(() => {
//     console.log("useEffect3");
//     return () => {
//       console.log("destroy useEffect3");
//     };
//   });
//   return (
//     <div
//       onClick={() => {
//         setNumber(number + 1);
//       }}
//     >
//       {number}
//     </div>
//   );
// }

// let element = <Counter />;
// const root = createRoot(document.getElementById("root"));
// root.render(element);

//36.初次渲染
let element = <h1>hello</h1>;
const root = createRoot(document.getElementById("root"));
root.render(element);

//37.更新渲染
// function FunctionComponent() {
//   const [number, setNumber] = React.useState(0);
//   return (
//     <button
//       onClick={() => {
//         setNumber(number + 1);
//       }}
//     >
//       {number}
//     </button>
//   );
// }

//38.并发渲染
// function FunctionComponent() {
//   console.log("FunctionComponent");
//   const [number, setNumber] = React.useState(0);
//   React.useEffect(() => {
//     setNumber((number) => number + 1);
//   }, []);
//   return <button onClick={() => setNumber(number + 1)}>{number}</button>;
// }

//39.批量更新
// function FunctionComponent() {
//   console.log("FunctionComponent");
//   const [number, setNumber] = React.useState(0);
//   React.useEffect(() => {
//     setNumber((number) => number + 1);
//     setNumber((number) => number + 1);
//   }, []);
//   return (
//     <button
//       onClick={() => {
//         setNumber((number) => number + 1);
//         setNumber((number) => number + 1);
//       }}
//     >
//       {number}
//     </button>
//   );
// }

// import { getCurrentTime } from "../src/scheduler/src/forks/Scheduler";

//40.高优更新打断低优更新(useRef)
// function FunctionComponent() {
//   const [numbers, setNumbers] = React.useState(new Array(10).fill("A"));
//   const divRef = React.useRef();
//   React.useEffect(() => {
//     setTimeout(() => {
//       divRef.current.click();
//     }, 10);
//     setNumbers((numbers) => numbers.map((item) => item + "B"));
//   }, []);
//   return (
//     <div
//       ref={divRef}
//       onClick={() => {
//         setNumbers((numbers) => numbers.map((item) => item + "C"));
//       }}
//     >
//       {numbers.map((number, index) => (
//         <span key={index}>{number}</span>
//       ))}
//     </div>
//   );
// }

// 41.饥饿问题
// let counter = 0;
// let timer;
// let bCounter = 0;
// let cCounter = 0;
// function FunctionComponent() {
//   const [numbers, setNumbers] = React.useState(new Array(100).fill("A"));
//   const divRef = React.useRef();
//   const updateB = (numbers) => new Array(100).fill(numbers[0] + "B");
//   updateB.id = "updateB" + bCounter++;
//   const updateC = (numbers) => new Array(100).fill(numbers[0] + "C");
//   updateC.id = "updateC" + cCounter++;
//   React.useEffect(() => {
//     timer = setInterval(() => {
//       console.log(divRef);
//       divRef.current.click();
//       if (counter++ === 0) {
//         setNumbers(updateB);
//       }
//       divRef.current.click();
//       if (counter++ > 10) {
//         clearInterval(timer);
//       }
//     });
//   }, []);
//   return (
//     <div ref={divRef} onClick={() => setNumbers(updateC)}>
//       {numbers.map((number, index) => (
//         <span key={index}>{number}</span>
//       ))}
//     </div>
//   );
// }

// const element = <FunctionComponent />;

//42.context
// const NameContext = React.createContext("");
// const AgeContext = React.createContext("");

// function Child() {
//   const name = React.useContext(NameContext);
//   const age = React.useContext(AgeContext);
//   return <button>{name + age}</button>;
// }
// function App() {
//   const [name, setName] = React.useState("a");
//   const [age, setAge] = React.useState("1");
//   return (
//     <div>
//       <button
//         onClick={() => {
//           setName(name + "a");
//         }}
//       >
//         setName
//       </button>
//       <button
//         onClick={() => {
//           setAge(age + "1");
//         }}
//       >
//         setAge
//       </button>
//       <NameContext.Provider value={name}>
//         <AgeContext.Provider value={age}>
//           <Child />
//         </AgeContext.Provider>
//       </NameContext.Provider>
//     </div>
//   );
// }

// const element = <App />;
// const root = createRoot(document.getElementById("root"));
// root.render(element);
