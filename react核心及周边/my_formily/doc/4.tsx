/* import { createForm, onFormInit, onFormReact } from "@formily/core";
import React, { useMemo, useState } from "react";

function App() {
  const [state, setState] = useState("init");
  const form = useMemo(() => {
    return createForm({
      effects() {
        onFormInit(() => {
          setState("表单已初始化");
        });
        onFormReact((form) => {
          if (form.values.input == "Hello") {
            setState("响应Hello");
          } else if (form.values.input == "World") {
            setState("响应World");
          }
        });
      },
    });
  }, []);

  return (
    <div>
      <p>{state}</p>
      <button
        onClick={() => {
          form.setValuesIn("input", "Hello");
        }}
      >
        Hello
      </button>
      <button
        onClick={() => {
          form.setValuesIn("input", "World");
        }}
      >
        World
      </button>
    </div>
  );
}

export default App;
 */
