import styled from 'styled-components';

export const MessageDraftWrapper = styled.div`
    height: 50px;
    display: flex;
    justify-content: left;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 16px;
`;

export const MessageDraftContainer = styled.div`
    display: flex;
    justify-content: left;
    padding: 0 20px;
    width: 100%;
    overflow: hidden;
`;

export const MessageDraftInfo = styled.div`
    overflow: hidden;
    margin-left: 10px;
`;
export const MessageOwnerDraftName = styled.div`
    color: #00a6dd;
    font-weight: 600;
    font-size: 14px;
    text-align: left;

`;

export const MessageDraftText = styled.div`
    color: #a1a1a1;
    font-size: 14px;
    overflow: hidden !important; 
    text-overflow: ellipsis;
    text-align: left;
`;

export const MessageDraftBoxWrapper = styled.div`
   
`;

