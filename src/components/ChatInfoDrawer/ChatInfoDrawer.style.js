import styled from "styled-components";

export const ChatInfoDrawerHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
`;

export const LeaveChatButton = styled.div`
    
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    height: 40px;
    cursor: pointer;
    &:hover{
        background-color: #f3f3f3;
    }
`;