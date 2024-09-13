// import { useRequest } from "ahooks";
import { useRequest } from "./ahooks";
function getName(suffix) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`zhufeng` + suffix);
    }, 300);
  });
}
function App() {
  const {
    data: name,
    loading,
    run,
  } = useRequest(getName, {
    throttleWait: 1000,
  });
  return (
    <>
      <input onChange={(e) => run(e.target.value)} />
      {loading ? "加载中" : name ? <div>用户名: {name}</div> : null}
    </>
  );
}
export default App;
