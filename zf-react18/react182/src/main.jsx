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

function FunctionComponent() {
  return (
    <h1
      onClick={() => console.log("onClick FunctionComponent")}
      onClickCapture={() => console.log("onClickCapture FunctionComponent")}
    >
      hello
      <span
        style={{ color: "red" }}
        onClick={() => console.log("onClick span")}
        onClickCapture={() => console.log("onClickCapture span")}
      >
        world
      </span>
    </h1>
  );
}

let element = <FunctionComponent />;

const root = createRoot(document.getElementById("root"));
root.render(element);