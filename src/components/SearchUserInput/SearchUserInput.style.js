import styled from "styled-components";

export const SearchUserInputWrapper = styled.div`
    width: 100%;
    display: flex;
    padding: 0px 20px 5px;
`;

export const SUInput = styled.input`
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