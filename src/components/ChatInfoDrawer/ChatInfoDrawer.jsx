import { Avatar, Drawer, IconButton } from "@mui/material"
import { ChatInfoModalAvatar, ChatInfoModalMain, ChatInfoModalName, ChatInfoTitle, Divider, MemberAmount, MemberListHeader } from "../ChatInfoModal/ChatInfoModal.style"
import { ChatInfoDrawerHeader, LeaveChatButton } from "./ChatInfoDrawer.style"
import CloseIcon from "../ChatInfoModal/icons8-close.svg";
import { ChatMembersAmount } from "../ChatPageHeader/ChatPageHeader.style";
import { CDropZoneAvatarForChat } from "../ChatInfoModal/ChatInfoModal";
import { backendURL } from "../../helpers/gql";
import { history } from "../../App";
import { useEffect } from "react";
import { connect } from "react-redux";
import { actionUpsertChat } from "../../actions/actionsForChats";
import { MemberList } from "../MemberList/MemberList";
import MembersIcon from "../ChatInfoModal/user.png";
import AddUserIcon from "../ChatInfoModal/add-user.png";
import Exit from "../ChatInfoOptions/icons8_exit.png";
import { actionUpsertUser } from "../../actions/actionsForUser";
import { ChatInfoDrawerMediaList } from "../ChatInfoDrawerMediaList/ChatInfoDrawerMediaList";
import { actionOpenModal } from "../../actions/actionsForModal";

const ChatInfoDrawer = ({open, closeChatMenu, chats, userId, openModal, leaveChat, updateChat}) => {

    const [,route, histId] = history.location.pathname.split('/');
    useEffect(() => {
        chats[histId] || closeChatMenu()
    }, [chats[histId]])

    const amount = chats[histId]?.members?.length;
    const isOwner = userId === chats[histId]?.owner?._id;

    return(
        <Drawer
            anchor='right'
            variant="persistent"
			open={open}
			onClose={closeChatMenu}>
            <div style={{width: '300px'}}>
                <ChatInfoDrawerHeader>
                    <ChatInfoModalName>Chat Info</ChatInfoModalName>
                    <IconButton onClick={closeChatMenu}>
                        <img style={{cursor: 'pointer'}} src={CloseIcon}/>
                    </IconButton>
                </ChatInfoDrawerHeader>
                <ChatInfoModalMain>
                    <ChatInfoModalAvatar>
                        <Avatar
                            src={`${backendURL}/${chats[histId]?.avatar?.url || ''}`}
                            alt={chats[histId]?.title || 'chat'}
                            sx={{ width: 75, height: 75}}
                        />
                        {isOwner && <CDropZoneAvatarForChat component={"dropAvatarPopupComponent"}/>}
                    </ChatInfoModalAvatar>
                    <div>
                        <ChatInfoTitle>{chats[histId]?.title}</ChatInfoTitle>
                        <ChatMembersAmount>{amount} {amount === 1 ? 'member' : 'members'}</ChatMembersAmount>
                    </div>
                    
                </ChatInfoModalMain>
                
                <ChatInfoDrawerMediaList chatMedia={chats[histId]?.chatMedia}/>

                <Divider/>

                <MemberListHeader>
                    <div style={{display: 'flex', justifyContent: 'left'}}>
                        <img src={MembersIcon} style={{height: "20px", marginRight: "30px"}}/>
                        <MemberAmount>{amount} {amount === 1 ? 'member' : 'members'}</MemberAmount>
                    </div>

                    {isOwner && <img src={AddUserIcon} onClick={() => openModal('searchUserModal')} style={{height: "20px", cursor: "pointer"}} />}
                </MemberListHeader>
                <MemberList members={chats[histId]?.members}/>

                <Divider style={{marginTop: '10px'}}/>

                <LeaveChatButton onClick={()=> leaveChat(null, null, null, histId)}>
                    <img src={Exit} alt="exit" style={{margin: ' 0 20px', height: '24px'}}/>
                    Leave chat
                </LeaveChatButton>
            </div>
        </Drawer>
    )
}

export default connect(state => ({
    chats: state?.chats || [], 
    userId: state?.auth?.payload?.sub?.id
}), {updateChat: actionUpsertChat, openModal: actionOpenModal, leaveChat: actionUpsertUser})(ChatInfoDrawer);