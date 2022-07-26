import { useRef, useState } from "react";
import { DropAudioPlayer, DropAudioTitle, DropAudioWrap, DropImgWrap, DropVideoWrap, 
    DropFileWrap, DropFileIcon, DropFileTitle, DropFileIconWrap, DropFileHeader, DropFileInfo, DropFileSize
 } from "./DropMediaFiles.style"
import FileIcon from './icons8-File.svg';
import MusicIcon from './icons8-music.png';

export const DropImg = ({url}) => {
    const image = useRef(null);

    return (
        <DropImgWrap src={url} ref={image}/>
    )
}

export const DropVideo = ({url}) => {
    return (
        <DropVideoWrap src={url} controls/>
    )
}

export const DropAudio = ({url, name, size}) => {

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(!isOpen);
    
    return (
        <DropAudioWrap>
            <DropFileWrap>
                <DropFileIconWrap isAudio={true} onClick={handleOpen}>
                    <DropFileIcon src={MusicIcon}/>
                </DropFileIconWrap>
                <DropFileInfo>
                    <DropFileTitle>{name}</DropFileTitle>
                    <DropFileSize>{size}</DropFileSize>
                </DropFileInfo>
            </DropFileWrap>

            {isOpen && <DropAudioPlayer controls src={url}/>}
        </DropAudioWrap>
    )
}

export const DropFile = ({size, name}) => {
    return(
        <DropFileWrap>
            <DropFileIconWrap>
                <DropFileIcon src={FileIcon}/>
            </DropFileIconWrap>
            <DropFileInfo>
                <DropFileTitle>{name}</DropFileTitle>
                <DropFileSize>{size}</DropFileSize>
            </DropFileInfo>
        </DropFileWrap>
    )
}

