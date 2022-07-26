import { ReplyMessageMediaIcon } from "../ReplyMessageMediaIcon/ReplyMessageMediaIcon"
import { ReplyMessageContent, ReplyMessageDivider, ReplyMessageOwner, ReplyMessageText, ReplyMessageWrapper } from "./ReplyMessage.style"

export const ReplyMessage = ({message, owner}) => {
    return (
        <ReplyMessageWrapper>
            <ReplyMessageDivider owner={owner}/>
            {message.media && message?.media?.length !== 0 ? <ReplyMessageMediaIcon owner={owner} mediaFile={message.media[0]}/> : <></>}
            <ReplyMessageContent>
                <ReplyMessageOwner owner={owner}>{message?.owner?.nick}</ReplyMessageOwner>
                <ReplyMessageText>{message?.text?.replace(/ /g, "\u00a0")}</ReplyMessageText>
            </ReplyMessageContent>
        </ReplyMessageWrapper>
    )
}