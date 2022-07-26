import styled from "styled-components";

export const SearchUserItemWrapper = styled.li`
    width: 100%;
    height: 60px;
    &:hover{
        background-color: #f3f3f3;
    }
    display: flex;
    justify-content: left;
    align-items: center;
`;

export const SearchUserItemName = styled.div``;

export const BadgeImgWrapper = styled.div`
    background-color: #00a6dd; 
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center; 
    border: 2px solid #fff;
`;

export const AvatarWrapper = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    transition-duration: 100ms;
    transition-property: border, padding;
    ${props => props.checked && `
        border: 2px solid #00a6dd;
        padding: 2px;
    `}
`;