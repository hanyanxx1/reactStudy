import { NavLink, Outlet } from "umi";
import styled from "styled-components";

const StylePersonalBox = styled.div`
  display: flex;
  .menu {
    a {
      display: block;
      line-height: 35px;
      font-size: 16px;
      color: #000;
      &.action {
        color: green;
      }
    }
  }
  .content {
    padding: 20px;
    font-size: 14px;
  }
`;

const PersonalPage = () => {
  return (
    <StylePersonalBox>
      <div className="menu">
        <NavLink to="order">订单管理</NavLink>
        <NavLink to="profile">个人信息</NavLink>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </StylePersonalBox>
  );
};

export default PersonalPage;
