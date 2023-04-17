import React from 'react';
import { SettingDrawer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message } from 'antd';
import Footer from '@/components/Footer';
import { Question } from '@/components/RightContent';
import defaultSettings from '../config/defaultSettings';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
const loginPath = '/login';

/**
 * @name 给initalState赋值
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export const getInitialState = async () => {
  //页面加载时，只要跳转的不是登录页，我们都需要从服务器获取登录者信息，
  //存放到initialState,currentuser.以此来处理后续的登录态校验! !=> 如果没有登录，则直接跳转到登录页! !
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = {
      name: 'hy练习',
      avatar:
        'https://img2.baidu.com/it/u=3618236253,1028428296&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1681837200&t=edfd0138e7a88c36d9cdd0e599378a90',
    };
    return {
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    settings: defaultSettings,
  };
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState, setInitialState }) => {
  return {
    //头部导航右侧内容渲染
    actionsRender: () => [<Question key="doc" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    //尾部内容的渲染
    footerRender: () => <Footer />,
    //路由切换时触发
    onPageChange: () => {
      // const { location } = history;
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    //右侧切换主题的按钮
    childrenRender: (children) => {
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => {
                return {
                  ...preInitialState,
                  settings,
                };
              });
            }}
          />
        </>
      );
    },
    // 其余的配置项
    ...initialState?.settings,
  };
};

export const request = {
  timeout: 6000,

  errorConfig: {
    errorHandler() {
      console.error('网路繁忙，请您稍后再试~~');
    },
  },

  requestInterceptors: [
    (config) => {
      const token = '';
      if (token && config.url !== 'api/adminUser/login') {
        config.headers['token'] = token;
      }
      return { config };
    },
  ],

  responseInterceptors: [
    (response) => {
      return response;
    },
  ],
};
