import { ListItem } from "@mui/material";
import styled from "styled-components";

export const UserMenuHeader = styled.div`
    padding: 25px;
`;

export const UserMenuTitle = styled.h3`
    margin: 0;
    margin-top: 15px;
    font-weight: 500;
`;

export const StyledSpan = styled.span`
    margin-left: 16px;
    font-weight: 500;
`;

export const ListItemWrap = styled(ListItem)`
    padding: 0;
    height: 40px;
    padding-left: 25px;
    cursor: pointer;
    &:hover{
        background-color: #f3f3f3;
    }
`;