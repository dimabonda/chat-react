import styled from "styled-components";

export const AvatarWrap = styled.div`
    overflow: hidden;
    border-radius: 50%;
    width: 75px;
    height: 75px;
    position: relative;
    margin-right: 30px;
    &:hover div:last-child {
        z-index: 100;
    }
`;

export const AvatarOverlay = styled.div`
    background-color: grey;
    width: 75px;
    height: 75px;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center; 
    cursor: pointer;
    position: absolute;
    top: 0px;
    z-index: -1;
    img{
        height: 30px;
    }
`;