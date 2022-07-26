import styled from "styled-components";

export const AsideWrap = styled.aside`
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100vh;
    // box-shadow: 0 0 10px -1px #BDBDBD;
    border-right: 1px solid #e9e9e9;
`;

export const SearchInput = styled.input`
    height: 32px;
    width: 100%;
    background-color: #f1f1f1;
    box-sizing: border-box;
    border-radius: 3px;
    border: none;
    padding: 0 10px;
    &::placeholder{
        color: #9b9b9b;
        letter-spacing: 0.5px;
    }
    &:focus{
        outline: none !important;
        border: 2px solid #00a6dd;
        background-color: #fff;
    }
`;

export const SearchAppBarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    margin-right: 12px;
`;