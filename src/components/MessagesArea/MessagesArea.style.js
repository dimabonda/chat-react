import styled from "styled-components";
import 'simplebar/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';

export const MessagesAreaWrapper = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden auto;
    position: relative;
    display: flex;
    flex-direction: column-reverse;
`;


export const SimpleBarWrapper = styled(SimpleBar)`
    height: 100%;
    overflow-x: hidden;
    div.simplebar-content-wrapper, div.simplebar-content, div.simplebar-vertical{
        display: flex;
        flex-direction: column-reverse;
    }
`;

export const DropContainer = styled.div`
    height: 100%;
    overflow: hidden; 
    width: 100%;
    position: relative;
    div.drop{
        display: ${props => props.isDragAccept ? 'flex': 'none'};
        justify-content: center;
        font-size: 30px;
        align-items: center;
        position: absolute;
        color: rgba(0,0,0,.4);
        z-index: 100;
        width: 100%;
        height: 100%;
        border: 3px dashed grey;
        background: rgba(0,0,0,.3);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const ScrollBottom = styled.div`
    position: absolute;
    transition: all 0.2s ease-out;
    right: 50px;
    bottom: ${props => props.isVisible ? '50px' : '-50px'};
    border-radius: 50%;
    background-color: #00a6dd;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    cursor: pointer;
`;