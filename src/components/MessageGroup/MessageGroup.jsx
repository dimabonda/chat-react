import { Avatar } from "@mui/material"
import { memo } from "react"
import { backendURL } from "../../helpers/gql"
import Message from "../Message/Message"
import { AvatarWrapper, MessageGroupWrapper, MessagesWrapper } from "./MessageGroup.style"

export const MessageGroup = ({messages, chatId, currUser}) => {
    
    return (
        <MessageGroupWrapper>
            <MessagesWrapper>
                {messages.map((mes, i, arr) => <Message key={mes?._id || mes?.status} lastElem={i === 0 ? false : true} currUser={currUser} chatId={chatId} mes={mes}/> )}
            </MessagesWrapper>
            <AvatarWrapper>
                <Avatar
                    alt={messages[0]?.nick || messages[0]?.login ||  'avatar'}
                    src={`${backendURL}/${messages[0]?.owner?.avatar?.url || ''}`}
                    sx={{width: 45, height: 45, mr: '20px', position: 'sticky', bottom: 0, marginBottom: '5px'}}
                />
            </AvatarWrapper>
        </MessageGroupWrapper> 
    )
}