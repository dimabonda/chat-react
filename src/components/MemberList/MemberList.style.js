import styled from "styled-components";

export const MemberListWrapper = styled.ul`
    max-height: 300px;
    margin: 0;
    padding: 0;
    list-style-type: none;
    overflow: hidden;
`;

export const MemberItem = styled.li`
    display: flex; 
    justify-content: left;
    align-items: center;
    padding: 5px 20px;
    &:hover{
        background-color: #f3f3f3;
    }
`;

export const MemberName = styled.div`
    
`;