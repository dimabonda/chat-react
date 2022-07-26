import styled from "styled-components";

export const MessageWrapper = styled.div`
    display: flex;
    margin: 3px;
`;

export const MessageContainer = styled.div`
color: #000;
max-width: 400px;
background-color: ${props => props.isOwner ? '#E2DCC2' : '#CCCCCC'};
padding: 12px 16px 8px;
position: relative;
display: block;
border-radius: 5px 5px 5px 0px;
&::before{
    content: '';
    width: 15px;
    height: 15px;
    position: absolute;
    background-color: ${props => props.isOwner ? '#E2DCC2' : '#CCCCCC'};
    bottom: 0;
    left: -14px;
    clip-path: polygon(75% 63%, 83% 53%, 90% 41%, 94% 31%, 98% 15%, 100% 0, 100% 100%, 22% 100%, 34% 94%, 43% 88%, 55% 80%, 65% 72%);
};

${props => props.lastElem ? `
border-radius: 5px 5px 5px 5px;
&::before{
    display: none;
}
` : ` border-radius: 5px 5px 5px 5px
        &::before{
    } `
} 

`;

export const MessageText = styled.div`
    width: 100%;
    text-align: left;
    word-wrap: break-word;
    font-size: 14px;
    line-height: 1.4;
`;

export const TimeMessage = styled.span`
    color: #a1a1a1;
    font-size: 13px;
`; 

export const MessageFooter = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
`;

export const MessageOwner = styled.div`
    color: #a1a1a1;
    font-size: 13px;
    margin-right: 30px;
`;

export const ForwardedMessageHeader = styled.div`
    color: ${props => props.owner ? '#E67E22' : '#3498DB'};
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
`;

