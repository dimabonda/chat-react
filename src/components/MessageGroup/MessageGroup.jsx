import { Avatar } from "@mui/material"
import { useMemo, useRef } from "react"
import { memo } from "react"
import { backendURL } from "../../helpers/gql"
import Message from "../Message/Message"
import { AvatarWrapper, MessageGroupWrapper, MessagesWrapper } from "./MessageGroup.style"

const AvatarComponent = memo(({url}) => {
    
    console.log('url')
    return (
        <AvatarWrapper>
            <Avatar
                // alt={message?.nick || message?.login ||  'avatar'}
                src={`${backendURL}/${url}`}
                sx={{width: 45, height: 45, mr: '20px', position: 'sticky', bottom: 0, marginBottom: '5px'}}
            />
        </AvatarWrapper>
    )
})

export const MessageGroup = ({messages, chatId, currUser}) => {
    
    const url = messages[0]?.owner?.avatar?.url || '';

    
    
    return (
        <MessageGroupWrapper>
            
            <MessagesWrapper>
                {messages.map((mes, i, arr) => <Message key={mes?._id || mes?.status} lastElem={i === 0 ? false : true} currUser={currUser} chatId={chatId} mes={mes}/> )}
            </MessagesWrapper>
            <AvatarComponent url={url}/>
        </MessageGroupWrapper> 
    )
}