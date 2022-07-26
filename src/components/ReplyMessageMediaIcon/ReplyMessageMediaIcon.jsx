import { backendURL } from "../../helpers/gql"
import { ReplyMessageMediaIconWrap } from "./ReplyMessageMediaIcon.style";
import AudioFile from "./icons8-music.png";
import AudioFileOwner from "./icons8-music-owner.png";
import VideoFile from "./icons8-video.png";
import VideoFileOwner from "./icons8-video-owner.png";
import File from "./icons8-file.png";
import FileOwner from "./icons8-file-owner.png";

export const checkTypeFileForReply = (type, own, url) => {
    if(type.includes("image")){
        return <img src={`${backendURL}/${url || ''}`} style={{marginRight: '10px', height: '40px', width: '40px', borderRadius: '3px'}}/>
    } else if(type.includes("video")){
        return <img src={own ? VideoFileOwner : VideoFile} style={{width: '40px', margin: '0 3px'}} />
    } else if (type.includes("audio")){
        return <img src={own ? AudioFileOwner : AudioFile} style={{width: '40px', margin: '0 3px'}} />
    } else {
        return <img src={own ? FileOwner : File} style={{width: '40px', margin: '0 3px'}} />
    }
}

export const ReplyMessageMediaIcon = ({mediaFile, owner}) => {
    
    return (
        <ReplyMessageMediaIconWrap>
            {checkTypeFileForReply(mediaFile?.type, owner, mediaFile.url)}
        </ReplyMessageMediaIconWrap>
    )
}