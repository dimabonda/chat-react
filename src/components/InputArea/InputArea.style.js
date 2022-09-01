import styled from "styled-components";
import TextareaAutosize from 'react-textarea-autosize';

export const MainInputArea = styled.div`
    border-top: 1px solid #e9e9e9;
    display: flex;
    align-items: center;
    
`;

export const InputAreaWrapper = styled.div`
    width: 100%;
    background-color: #fff;
    img{
        margin: 0 20px;
        cursor: pointer;
    }
`;

export const TextAreaWrapper = styled.div`
    padding: 10px 0;
    display: flex;
    align-items: center;
`;

export const TextArea = styled(TextareaAutosize)`
    display: block;
    border: 0.1px solid #fff;
    padding: 0;
    width: 100%;
    resize: none;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    height: 24px;
    overflow: hidden;
    outline: none;
`;

