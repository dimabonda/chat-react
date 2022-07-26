import { Link } from 'react-router-dom';
import styled from 'styled-components'

export const SearchChatItemWrapper = styled.li`
    width: 100%;
    height: 60px;
    &:hover{
        background-color: #f3f3f3;
    }
`;

export const SearchChatItemName = styled.div`
    color: #000;
    font-weight: 500;
`;

export const SearchChatItemLink = styled(Link)`
    display: flex;
    justify-content: left;
    align-items: center;
    text-decoration: none;
    padding: 8px 13px 8px 8px;
`;