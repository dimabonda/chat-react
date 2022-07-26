import styled from "styled-components";

export const ChatInfoDrawerMediaListWrapper = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const ChatInfoDrawerMediaItem = styled.li`
    padding: 5px 20px;
    display: flex;
    justify-content: left;
    align-items: center;
    cursor: pointer;
    &:hover{
        background-color: #f3f3f3;
    }
`;