import { backendURL } from "../../../helpers/gql"
import { DownloadVideo, MessageVideoItemWrap, VideoItem } from "./MessageVideoItem.style";
import DownloadIcon from '../MessageAudioItem/icons8-download.png';
import { saveFile } from "../../../helpers/saveFile";

export const MessageVideoItem = ({url, name}) => {
    return(
        <MessageVideoItemWrap>
            <VideoItem controls src={`${backendURL}/${url || ''}`} />
            <DownloadVideo onClick={() => saveFile(`${backendURL}/${url}`, name)} src={DownloadIcon}></DownloadVideo>
        </MessageVideoItemWrap>
    )
}