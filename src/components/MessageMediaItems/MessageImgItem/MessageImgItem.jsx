import { backendURL } from "../../../helpers/gql"
import { DownloadImg, ImageItem, MessageImgItemWrap } from "./MessageImgItem.style"
import DownloadIcon from '../MessageAudioItem/icons8-download.png';
import { saveFile } from "../../../helpers/saveFile";
import { DownloaderFile } from "../MessageAudioItem/AudioItem.style";

export const MessageImgItem = ({url, name}) => {
    return(
        <MessageImgItemWrap>
            <ImageItem src={`${backendURL}/${url || ''}`}/>
            <DownloadImg onClick={() => saveFile(`${backendURL}/${url}`, name)} src={DownloadIcon}></DownloadImg>
        </MessageImgItemWrap>
    )
}