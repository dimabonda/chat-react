import styled from "styled-components";
import { Link } from "react-router-dom";

export const ChatListItemWrapper = styled.li`
    padding: 0;
    background-color: ${(props) => props.isActive ? "#00a6dd" : "#fff"};
    height: 62px;
    width: 100%;
    &:hover{
        background-color: ${props => props.isActive ? "#00a6dd" : "#f3f3f3"};
    }
`;

export const ChatListItemLink = styled(Link)`
    display: flex;
    text-decoration: none;
    padding: 8px 13px 8px 8px;
`;

export const ChatListItemContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
`;

export const ChatListItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const ChatListItemTitle = styled.h3`
    margin: 0; 
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.3px;
    line-height: 1.5;
    text-align: left;
    color:${(props) => props.isActive ? "#fff" : "#000"} ;
    img{
        height: 12px;
        margin-left: 5px;
    }
`;

export const ChatListItemFooter = styled.div`
    display: flex;
    justify-content: space-between;
    // height: 13px;
    line-height: 0.5;
    width: 100%;
`;

export const ChatListLastMessage = styled.div`
    color: ${props => props.isActive ? "#fff" : "#a1a1a1"};
    font-size: 13px;
    line-height: 1.2;
    overflow: hidden !important; 
    text-overflow: ellipsis;
    span{
        color: ${props => props.isActive ? "#fff" : "#00a6dd"};
        margin-right: 5px;
    }
`;

export const MessageDraftChatListItem = styled.div`
    color: ${props => props.isActive ? "#fff" : "#a1a1a1"};
    font-size: 13px;
    line-height: 1.2;
    overflow: hidden !important; 
    text-overflow: ellipsis;
    span{
        color: ${props => props.isActive ? "#DDDDDD" : "#FF2109"};
        margin-right: 5px;
        font-size: 14px;
    }
`;
