import styled from "styled-components";

export const ChatInfoModalWrapper = styled.div`
    width: 100%;
    min-height: 400px;
`;

export const ChatInfoModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 18px 16px 20px;
    background-color: #fff;
    border-radius: 10px;
    align-items: center;
`;

export const ChatInfoModalName = styled.h3`
    margin: 0;
    font-weight: 500;
    font-size: 18px;
    padding-left: 10px;
`;

export const ChatInfoModalMain = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px 10px;
    background-color: #fff;
    
    
`;

export const ChatInfoTitle = styled.div`
    font-size: 18px;
    font-weight: 500;
`;

export const Divider = styled.div`
    height: 12px;
    background-color: #f3f3f3;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #ececec;
    margin-bottom: 8px;
    margin-right: 1px;
`;

export const MemberListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
`;

export const MemberAmount = styled.div`
    font-size: 15px;
    text-transform: uppercase;
    font-weight: 500;
    
`;

export const ChatInfoModalAvatar = styled.div`
    margin-right: 30px;
    width: 75px;
    height: 75px;
    overflow: hidden;
    border-radius: 50%;
    &:hover section{
        transform: translateY(-30px);
        transition: transform 0.5s ease-out;
    }
    section{
        transform: translateY(0px);
        transition: transform 0.5s ease-out;
    }
`;

