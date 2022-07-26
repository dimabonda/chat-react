import styled from "styled-components";

export const TimeWrapper = styled.div`
    font-size: 14px;
    color: ${props => props.isActive ? "#fff" : "#a1a1a1"};
`;