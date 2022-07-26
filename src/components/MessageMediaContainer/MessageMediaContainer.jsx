import { memo } from "react"
import { MessageMediaItem } from "../MessageMediaItem/MessageMediaItem"
import { MessageMediaContainerWrap, MessageMediaList } from "./MessageMediaContainer.style"

const MessageMediaContainer = ({media}) => {
    return (
        <MessageMediaContainerWrap>
            <MessageMediaList>
                {media.map(file => <MessageMediaItem key={file._id} file={file}/>)}
            </MessageMediaList>
        </MessageMediaContainerWrap>
    )
}

export const MemoMessageMediaContainer = memo(MessageMediaContainer);