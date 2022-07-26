import styled from "styled-components";
import TextareaAutosize from 'react-textarea-autosize';

export const InputAreaWrapper = styled.div`
    width: 100%;
    background-color: #fff;
    // border-top: 1px solid #e9e9e9;
    // display: flex;
    // align-items: center;
    img{
        margin: 0 20px;
        cursor: pointer;
    }
`;

export const TextArea = styled(TextareaAutosize)`
    display: block;
    border: 0.1px solid #fff;
    padding: 0;
    width: 100%;
    resize: none;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    height: 24px;
    overflow: hidden;
    outline: none;
    
`;

