import {
  withRouter,
  useSearchParams,
  createSearchParams,
  useLocation,
} from "umi";

/**
 * 参数接受的集中方式：
 * 1.withRouter props中接受参数
 * 2.createSearchParams 获取 searchURL传参
 * 3.const [sup] = useSearchParams sup对象中直接获取
 * @param param0
 * @returns
 */
const ProfilePage = ({ location }) => {
  /* console.log(location.search); //?lx=0&name=zhufeng
  const usp = new URLSearchParams(location.search); //=>console.log(createSearchParams(location.search));
  console.log(usp.get("lx")); */

  /* const [usp] = useSearchParams();
  console.log(usp.get("lx")); */

  const locatoinV6 = useLocation();
  console.log(location.state, locatoinV6.state);

  return <div>我的信息</div>;
};

export default withRouter(ProfilePage);
