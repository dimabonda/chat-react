import { AudioItem } from "../MessageMediaItems/MessageAudioItem/AudioItem"
import { FileItem } from "../MessageMediaItems/MessageFileItem/MessageFileItem";
import { MessageImgItem } from "../MessageMediaItems/MessageImgItem/MessageImgItem";
import { MessageVideoItem } from "../MessageMediaItems/MessageVideoItem/MessageVideoItem";
import { MessageMediaItemWrap } from "./MessageMediaItem.style"

export const MessageMediaItem = ({file}) => {
    const url = file.url;
    const name = file?.originalFileName?.length > 22 ? 
    file.originalFileName.slice(0,10)  + '...' + file.originalFileName.slice(-10) : 
    file.originalFileName

    const checkType = (type) => {
        if (type?.includes("image")){
            return <MessageImgItem url={url} name={name}/>
        }else if (type?.includes("audio")){
            return <AudioItem url={url} name={name}/>
        }else if(type?.includes("video")){
            return <MessageVideoItem url={url} name={name}/>
        }else {
            return <FileItem url={url} name={name}/>
        }
    }

    return (
        <MessageMediaItemWrap>
            {checkType(file.type)}
        </MessageMediaItemWrap>
    )
}