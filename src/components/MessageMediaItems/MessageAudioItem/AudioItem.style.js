import styled from "styled-components";

export const FileWrap = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 5px 0;
`;

export const FileIconWrap = styled.div`
    height: 44px;
    width: 44px;
    border-radius: 50%;
    background-color: #3498DB;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
`;

export const FileIcon = styled.img`
    height: 26px;
`;

export const FileTitle = styled.div`
    font-size: 14px;
    font-weight: 600;
`;

export const DownloaderFile = styled.img`
    height: 16px;
    cursor: pointer;
`;

export const AudioPlayer = styled.audio`
    height: 30px;
    margin-top: 10px;
    width: 100%;
`;