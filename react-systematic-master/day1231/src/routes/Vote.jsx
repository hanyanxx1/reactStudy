import React from "react";
import styled from "styled-components";
import { Button } from 'antd';

// 样式处理
const VoteBox = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    width: 400px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #DDD;
        .title {
            font-size: 18px;
            line-height: 50px;
        }
        .num {
            font-size: 18px;
        }
    }

    .main {
        padding: 15px 0;
        p {
            line-height: 35px;
            font-size: 15px;
        }
    }

    .ant-btn {
        margin-right: 10px;
        border-radius: 0;
    }
`;

const Vote = function Vote() {
    return <VoteBox>
        <div className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">0</span>
        </div>
        <div className="main">
            <p>支持人数：0人</p>
            <p>反对人数：0人</p>
        </div>
        <div className="footer">
            <Button type="primary">
                支持
            </Button>
            <Button type="primary" danger>
                反对
            </Button>
        </div>
    </VoteBox>;
};
export default Vote;