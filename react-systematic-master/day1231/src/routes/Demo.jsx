import React from "react";
import styled from "styled-components";
import { Button } from 'antd';

/* 样式处理 */
const DemoBox = styled.div`
    margin: 40px auto;
    padding: 20px;
    width: 200px;
    border: 1px solid #DDD;
    .num{
        display: block;
        font-size: 20px;
        line-height: 40px;
    }
    .ant-btn{
        border-radius: 0;
    }
`;

const Demo = function Demo() {
    return <DemoBox>
        <span className="num">0</span>
        <Button type="primary">
            按钮
        </Button>
        <Button type="primary" danger>
            异步按钮
        </Button>
    </DemoBox>;
};
export default Demo;