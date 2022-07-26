import styled from 'styled-components'

export const SearchChatWrap = styled.div`
    width: 100%;
    // height: 560px;
`;

export const SearchChatHeader = styled.div`
    width: 100%;
    padding: 20px 20px 10px;
    font-weight: 500;
    font-size: 18px;
`;

export const SearchChatFooter = styled.div`
    display: flex;
    padding: 10px 15px;
    justify-content: right;
    align-items: center;
`;

export const SearchChatInputWrapper = styled.div`
    width: 100%;
    display: flex;
    padding: 0px 20px 5px;
`;

export const SearchChatInput = styled.input`
    width: 100%;
    border: none;
    background-color: #fff;
    padding: 0 10px;
    box-sizing: border-box;
    height: 32px;
    font-size: 14px;
    outline: none !important;
    &::placeholder{
        color: #9b9b9b;
        letter-spacing: 0.5px;
        font-weight: 300;
    }
`;

export const SearchChatListWrapper = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
    height: 400px;
    overflow: hidden;
`;