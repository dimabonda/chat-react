import styled from 'styled-components'
/////////////image
export const DropImgWrap = styled.img`
    max-width: 100%; 
    height: 80px;
`;

////////////////////video
export const DropVideoWrap = styled.video`
    // height: 200px;
    width: 100%;
`;

//////////////////////////////////////audio
export const DropAudioWrap = styled.div`
`;

export const DropAudioPlayer = styled.audio`
    height: 30px;
    margin-top: 10px;
    width: 100%;
`;

export const DropAudioTitle = styled.div`
`;

export const DropFileHeader = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
`
////////////////////////////////////////another files
export const DropFileWrap = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
`;

export const DropFileIconWrap = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #3498DB;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    cursor: ${(props) => props.isAudio ? 'pointer' : 'auto'}
`;

export const DropFileIcon = styled.img`
    height: 24px;
`;

export const DropFileInfo = styled.div`
    
`;

export const DropFileTitle = styled.div`
    font-size: 14px;
    font-weight: 600;
`;

export const DropFileSize = styled.div`
    color: #a1a1a1;
    font-size: 14px;
`;





