import styled from "styled-components";

export const ReplyMessageWrapper = styled.div`
    height: 40px;
    display: flex;
    justify-content: left;
    margin-bottom: 8px;
`;

export const ReplyMessageDivider = styled.div`
    height: 100%;
    width: 3px;
    background-color: ${props => props.owner ? '#E67E22' : '#3498DB'} ;
    margin-right: 10px;
    border-radius: 2px;
`;

export const ReplyMessageContent = styled.div`
    // display: flex;
    // flex-direction: column;
    // justify-content: space-around;
    width: 100%;
    overflow: hidden;
`;

export const ReplyMessageOwner = styled.div`
    color: ${props => props.owner ? '#E67E22' : '#3498DB'};
    letter-spacing: 0.8px;
    font-weight: 600;
    font-size: 14px;
    text-align: left;
`;

export const ReplyMessageText = styled.div`
    font-size: 12px;
    text-align: left;
    min-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
`;