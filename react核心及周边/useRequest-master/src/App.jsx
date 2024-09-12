import { useState } from "react";
import { useRequest } from "./ahooks";
let counter = 0;
function getName() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`zhufeng` + ++counter);
    }, 1000);
  });
}
function App() {
  const [userId, setUserId] = useState("1");
  const { data: name, loading } = useRequest(getName, {
    refreshOnWindowFocus: true,
    focusTimespan: 5000,
  });
  return (
    <>
      <input value={userId} onChange={(event) => setUserId(event.target.value)} />
      {loading ? "加载中" : name ? <div>用户名: {name}</div> : null}
    </>
  );
}
export default App;
