import { useState, useRef } from "react";
import { useRequest } from "./ahooks";
let counter = 0;
function getName() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`zhufeng` + ++counter);
    }, 0);
  });
}
let updateSuccess = true;
function updateName(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (updateSuccess) {
        resolve(username);
      } else {
        reject(new Error(`修改用户名失败`));
      }
      updateSuccess = !updateSuccess;
    }, 3000);
  });
}
function App() {
  const lastRef = useRef();
  const [value, setValue] = useState("");
  const { data: name, mutate } = useRequest(getName, {
    name: "getName",
    pollingInterval: 1000,
  });
  const { run, loading, cancel } = useRequest(updateName, {
    manual: true,
    name: "updateName",
    loadingDelay: 1000,
    onSuccess: (result, params) => {
      setValue("");
      console.log(`用户名成功变更为 "${params[0]}" !`);
    },
    onError: (error, params) => {
      console.error(error.message);
      mutate(lastRef.current);
    },
    onCancel: () => {
      mutate(lastRef.current);
    },
  });
  console.log(loading);
  return (
    <>
      {name && <div>用户名: {name}</div>}
      <input
        onChange={(event) => setValue(event.target.value)}
        value={value}
        placeholder="请输入用户名"
      />
      <button
        onClick={() => {
          lastRef.current = name;
          mutate(value);
          run(value);
        }}
        type="button"
      >
        {loading ? "更新中......." : "更新"}
      </button>
      <button type="button" onClick={cancel}>
        取消
      </button>
    </>
  );
}

export default App;
