import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} hy练习`}
      links={[
        {
          key: 'hy练习',
          title: '个人练习',
          href: 'https://github.com/hanyanxx1/reactStudy',
          blankTarget: true,
        },
        {
          key: '视频平台',
          title: '视频平台',
          href: 'https://www.javascriptpaixun.cn/',
          blankTarget: true,
        },
        {
          key: '开源信息',
          title: '开源信息',
          href: 'https://github.com/newbee-ltd',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
