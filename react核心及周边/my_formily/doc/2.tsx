// import { observable, autorun } from "./@formily/reactive";
// const obs = observable({ name: "1" });
// const tracker = () => {
//   console.log("tracker", obs.name);
// };

// autorun(tracker);
// obs.name = "2";

/* import React from "react";
import { observable } from "./@formily/reactive";
import { Observer } from "./@formily/reactive-react";
const username = observable({ value: "zhangsan" });
const age = observable({ value: 14 });

function App() {
  return (
    <>
      <Observer>
        {() => (
          <input
            value={username.value}
            onChange={(event) => {
              username.value = event.target.value;
            }}
          />
        )}
      </Observer>
      <Observer>
        {() => {
          console.log("username render");
          return <div>{username.value}</div>;
        }}
      </Observer>
      <Observer>
        {() => (
          <input
            value={age.value}
            onChange={(event) => {
              age.value = +event.target.value;
            }}
          />
        )}
      </Observer>
      <Observer>
        {() => {
          console.log("age render");
          return <div>{age.value}</div>;
        }}
      </Observer>
    </>
  );
}

export default App;
 */
