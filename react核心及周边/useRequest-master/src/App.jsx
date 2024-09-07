// import { useRequest } from "ahooks";
import { useRequest } from "./ahooks";

function getName() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("hy");
    }, 2000);
  });
}

function App() {
  const { data, loading } = useRequest(getName);

  if (loading) {
    return <>加载中....</>;
  }

  return <div>用户名:{data}</div>;
}

export default App;
