import { backendURL } from "../../../helpers/gql"
import { saveFile } from "../../../helpers/saveFile"
import { DownloaderFile, FileIcon, FileIconWrap, FileTitle, FileWrap } from "../MessageAudioItem/AudioItem.style";
import File from '../../DropMediaItem/DropMediaFiles/icons8-File.svg';
import DownloadIcon from '../MessageAudioItem/icons8-download.png';

export const FileItem = ({url, name}) => {

    return (
        <div>
            <FileWrap>
                <FileIconWrap>
                    <FileIcon src={File}/>
                </FileIconWrap>
                <div>
                    <FileTitle>{name}</FileTitle>
                    <div style={{display: 'flex', justifyContent: 'right'}}>
                        <DownloaderFile onClick={() => saveFile(`${backendURL}/${url}`, name)} src={DownloadIcon}></DownloaderFile>
                    </div>
                </div>
            </FileWrap>
        </div>
    )
}