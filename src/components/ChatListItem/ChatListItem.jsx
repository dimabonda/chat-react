import { Avatar} from "@mui/material";
import { memo, useEffect } from "react";
import { connect } from "react-redux";
import { actionSetInputMessageValue } from "../../actions/actionsForChats";
import { backendURL } from "../../helpers/gql";
import { TimeLastMessage } from "../Time/Time";
import { ChatListItemLink, 
        ChatListItemContent, 
        ChatListItemTitle, 
        ChatListItemWrapper, 
        ChatListLastMessage,
        ChatListItemHeader, 
        ChatListItemFooter, 
        MessageDraftChatListItem
     } from "./ChatListItem.style";
import OwnerStar from "./icons8_star.png";
import OnwerStarActive from "./icons8_star_white.png";

const ChatListItem = ({chat, handleSetId, isActive, currUserId, setDraftValue, clearInput}) => {
    const inputValue = chat?.draft?.mainInputValue?.value || '';
    const draftValue = chat?.draft?.draftValue?.value;

    let timer;
    function showDraftMessage(){
        timer = setTimeout(() => {
            setDraftValue(chat._id, inputValue, 'draftValue')
        }, [10000])
    }

    useEffect(() => {
        showDraftMessage()
        return (() => {
            clearTimeout(timer);
        })
    },[inputValue])

    return (
            <ChatListItemWrapper isActive={isActive} onClick={() => {handleSetId(chat._id); clearInput()}}>
                <ChatListItemLink to={`/main/${chat._id}`}>
                    <Avatar
                        alt={chat?.title || 'chat'}
                        src={`${backendURL}/${chat.avatar?.url || ''}`}
                        sx={{ width: 45, height: 45, mr: '20px'}}
                    />
                    <ChatListItemContent>
                        <ChatListItemHeader>
                            <ChatListItemTitle isActive={isActive}>{chat.title}
                                {currUserId === chat?.owner?._id && <img src={isActive ? OnwerStarActive : OwnerStar} alt="ownerStar"/>}
                            </ChatListItemTitle>
                            <TimeLastMessage isActive={isActive} timestamp={ + chat.lastMessage?.createdAt}/>
                        </ChatListItemHeader>
                        <ChatListItemFooter>
                            {!draftValue ? <div>
                                {chat.lastMessage ?
                                    <ChatListLastMessage isActive={isActive}>
                                        <span>{(currUserId == chat.lastMessage?.owner._id) ? 'You' : chat.lastMessage?.owner.nick}:</span>
                                        {chat.lastMessage?.text?.replace(/ /g, "\u00a0") || ''}
                                    </ChatListLastMessage> 
                                 : <div></div>} 
                            </div> : <MessageDraftChatListItem isActive={isActive}><span>Draft:</span>{draftValue?.replace(/ /g, "\u00a0") || ''}</MessageDraftChatListItem>}
                        </ChatListItemFooter>
                    </ChatListItemContent>
                </ChatListItemLink> 
            </ChatListItemWrapper>
    )
}

export default connect(state => ({currUserId: state.auth?.payload?.sub?.id}), { setDraftValue: actionSetInputMessageValue})(memo(ChatListItem));