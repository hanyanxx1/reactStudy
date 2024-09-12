import { useState } from "react";
import { useRequest } from "./ahooks";
function getName() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`zhufeng`);
    }, 1000);
  });
}
function App() {
  const [ready, setReady] = useState(false);
  const { data: name, loading } = useRequest(getName, {
    ready,
  });
  return (
    <>
      <p>
        Ready: {JSON.stringify(ready)}
        <button onClick={() => setReady(!ready)}>切换Ready</button>
      </p>
      {loading ? "加载中" : name ? <div>用户名: {name}</div> : null}
    </>
  );
}
export default App;
