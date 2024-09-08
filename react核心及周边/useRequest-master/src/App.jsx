// import { useRequest } from "ahooks";
import { useRequest } from "./ahooks";

function getName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve("hy");
      reject(new Error("获取用户名失败"));
    }, 2000);
  });
}

function App() {
  const { data, loading, error } = useRequest(getName);

  if (loading) {
    return <>加载中....</>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <div>用户名:{data}</div>;
}

export default App;
