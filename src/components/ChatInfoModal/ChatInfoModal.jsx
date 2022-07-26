import { Avatar, Button, IconButton } from "@mui/material";
import { connect } from "react-redux";
import { history } from "../../App";
import { backendURL } from "../../helpers/gql";
import { MemberList } from "../MemberList/MemberList";
import { ChatInfoModalHeader, ChatInfoModalWrapper, ChatInfoModalName, ChatInfoTitle, ChatInfoModalMain, Divider, MemberListHeader, MemberAmount, ChatInfoModalAvatar, Drop } from "./ChatInfoModal.style";
import CloseIcon from "./icons8-close.svg";
import MembersIcon from "./user.png";
import AddUserIcon from "./add-user.png";
import { useEffect, useState } from "react";
import { SearchUserForChat } from "../SearchUserForChat/SearchUserForChat";
import {actionUpsertChat } from "../../actions/actionsForChats";
import DropZoneAvatar from "../DropZone/DropZoneAvatar";
import { actionSetChatAvatar } from "../../actions/actionsMedia";
import  ChatInfoOptions  from "../ChatInfoOptions/ChatInfoOptions";
import { ChatMembersAmount } from "../ChatPageHeader/ChatPageHeader.style";

export const CDropZoneAvatarForChat = connect(null, {onLoad: actionSetChatAvatar})(DropZoneAvatar);

const ChatInfoModal = ({handleClose, chats, userId, updateChat}) => {
    const [,route, histId] = history.location.pathname.split('/');
    useEffect(() => {
        chats[histId] || handleClose()
    }, [chats[histId]])
    const [isOpenSearch, setIsOpenSearch] = useState();
    // old members + new 
    const [users, setUsers] = useState();
    const amount = chats[histId]?.members?.length;
    const isOwner = userId === chats[histId]?.owner?._id;
    //current memberd (old)
    const currMembers = chats[histId]?.members?.map(item => {
        let {_id} = item; 
        return {_id}
    });

    return(!isOpenSearch) ? 
        <ChatInfoModalWrapper>
            <ChatInfoModalHeader>
                <ChatInfoModalName>Chat Info</ChatInfoModalName>
                <div style={{paddingLeft: "150px"}}>
                    <ChatInfoOptions setIsOpenSearch={setIsOpenSearch} isOwner={isOwner} chatId={histId}/>
                </div>
                <IconButton onClick={handleClose}>
                    <img style={{cursor: 'pointer'}} src={CloseIcon}/>
                </IconButton>
            </ChatInfoModalHeader>
            <ChatInfoModalMain>
                <ChatInfoModalAvatar>
                    <Avatar
                        src={`${backendURL}/${chats[histId]?.avatar?.url || ''}`}
                        alt={chats[histId]?.title || "chat"}
                        sx={{ width: 75, height: 75}}
                    />
                    {isOwner && <CDropZoneAvatarForChat component={"dropAvatarPopupComponent"}/>}
                </ChatInfoModalAvatar>
                <div>
                    <ChatInfoTitle>{chats[histId]?.title}</ChatInfoTitle>
                    <ChatMembersAmount>{amount} {amount === 1 ? 'member' : 'members'}</ChatMembersAmount>
                </div>
            </ChatInfoModalMain>
            <Divider/>
            <MemberListHeader>
                <div style={{display: 'flex', justifyContent: 'left'}}>
                    <img src={MembersIcon} style={{height: "20px", marginRight: "30px"}}/>
                    <MemberAmount>{amount} {amount === 1 ? 'member' : 'members'}</MemberAmount>
                </div>
                {isOwner && <img src={AddUserIcon} style={{height: "20px", cursor: "pointer"}} onClick={() => setIsOpenSearch(true)}/>}
            </MemberListHeader>
            <MemberList members={chats[histId]?.members}/>
        </ChatInfoModalWrapper>
     : 
     <>
        <SearchUserForChat getUsers={setUsers} members={currMembers}/>
        <div style={{display: "flex",
    				padding: "10px 15px",
    				justifyContent: "right",
    				alignItems: "center"}}>
            <Button variant="text" onClick={handleClose} >Cancel</Button>
            <Button variant="text" onClick={() => {updateChat(histId, null, users); handleClose()}}>Add</Button>
        </div>    
     </>
}

export default connect(state => ({
    chats: state?.chats || [], 
    userId: state?.auth?.payload?.sub?.id
}), {updateChat: actionUpsertChat})(ChatInfoModal);