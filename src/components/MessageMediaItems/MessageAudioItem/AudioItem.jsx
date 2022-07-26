import { FileWrap, FileIconWrap, FileIcon, AudioPlayer, FileTitle, DownloaderFile } from "./AudioItem.style";
import MusicIcon from '../../DropMediaItem/DropMediaFiles/icons8-music.png';
import { useState } from "react";
import { backendURL } from "../../../helpers/gql";
import DownloadIcon from './icons8-download.png';
import { saveFile } from "../../../helpers/saveFile";

export const AudioItem = ({url, name}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(!isOpen);

    return (
        <div>
            <FileWrap>
                <FileIconWrap isAudio={true} onClick={handleOpen}>
                    <FileIcon src={MusicIcon}/>
                </FileIconWrap>
                <div>
                    <FileTitle>{name}</FileTitle>
                    <div style={{display: 'flex', justifyContent: 'right'}}>
                        <DownloaderFile onClick={() => saveFile(`${backendURL}/${url}`, name)} src={DownloadIcon}></DownloaderFile>
                    </div>
                    
                </div>
            </FileWrap>

            {isOpen && <AudioPlayer controls src={`${backendURL}/${url || ''}`}/>}
        </div>
    )
}