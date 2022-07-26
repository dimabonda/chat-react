import { Avatar } from "@mui/material"
import { backendURL } from "../../helpers/gql"
import { SearchChatItemLink, SearchChatItemName, SearchChatItemWrapper } from "./SearchChatListItem.style"


export const SearchChatListItem = ({chat, addForwardedMessageToChat, forwardedMessage, handleClose}) => {
    return (
        <SearchChatItemWrapper onClick={() => {handleClose(); addForwardedMessageToChat(chat?._id, {forwarded: forwardedMessage})}}>
            <SearchChatItemLink to={`/main/${chat._id}`}>
                <Avatar
                alt={chat.title}
                src={`${backendURL}/${chat?.avatar?.url || ''}`}
                sx={{ width: "48px", height: "48px", m: "0 20px"}}        
                />
                <SearchChatItemName>{chat.title}</SearchChatItemName>
            </SearchChatItemLink>
        </SearchChatItemWrapper>
    )
}