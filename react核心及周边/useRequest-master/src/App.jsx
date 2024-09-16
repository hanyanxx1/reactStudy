import { useState } from "react";
import { useRequest, clearCache } from "./ahooks";
let counter = 0;
function getName(keyword = "") {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        time: new Date().toLocaleTimeString(),
        data: keyword + ++counter,
      });
    }, 2000);
  });
}
function User() {
  const { data, loading, params, run } = useRequest(getName, {
    cacheKey: "cacheKey",
    staleTime: 5000,
  });
  const [keyword, setKeyword] = useState(params[0] || "");
  if (!data && loading) {
    return <p>加载中...</p>;
  }
  return (
    <>
      <div>
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <button
          onClick={() => {
            run(keyword);
          }}
        >
          获取用户名
        </button>
      </div>
      <button onClick={() => clearCache("cacheKey")}>清除缓存</button>
      <p>后台加载中: {loading ? "true" : "false"}</p>
      <p>最近的请求时间: {data?.time}</p>
      <p>Keyword: {keyword}</p>
      <p>{data?.data}</p>
    </>
  );
}
function App() {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      <button type="button" onClick={() => setVisible(!visible)}>
        {visible ? "隐藏" : "显示"}
      </button>
      {visible && <User />}
    </div>
  );
}
export default App;
