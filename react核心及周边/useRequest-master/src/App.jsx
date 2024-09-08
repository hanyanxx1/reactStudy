// import { useRequest } from "ahooks";
import { useState } from "react";
import { useRequest } from "./ahooks";
let success = true;
function getName(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(`name${userId}`);
      } else {
        reject(new Error("获取用户名失败"));
      }
      // success = !success;
    }, 1000);
  });
}
const initialUserId = "1";
function App() {
  const [userId, setUserId] = useState(initialUserId);
  const { data, loading, error, run, runAsync, refresh, refreshAsync } = useRequest(getName, {
    manual: true,
    defaultParams: [initialUserId],
    onBefore: (params) => {
      console.info(`开始请求: ${params[0]}`);
    },
    onSuccess: (result, params) => {
      console.info(`请求成功:获取${params[0]}对应的用户名成功:${result}"!`);
    },
    onError: (error) => {
      console.error(`请求失败:${error.message}"!`);
    },
    onFinally: (params, result, error) => {
      console.info(`请求完成`);
    },
  });

  if (loading) {
    return <>加载中....</>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <input
        onChange={(event) => {
          setUserId(event.target.value);
        }}
        value={userId}
        placeholder="请输入用户ID"
      />
      <button onClick={() => run(userId)} disabled={loading}>
        {loading ? "获取中..." : "run"}
      </button>
      <button onClick={refresh}>refresh</button>
      <button onClick={refreshAsync}>refreshAsync</button>
      <div>用户名:{data}</div>
    </>
  );
}

export default App;
