import { connect } from "react-redux"
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { ChatListItemTitle } from "../ChatListItem/ChatListItem.style"
import { ChatMembersAmount, ChatPageHeaderWrap } from "./ChatPageHeader.style"
import  ChatInfoDrawer  from "../ChatInfoDrawer/ChatInfoDrawer";
import { memo, useState } from "react";
import IconButton from '@mui/material/IconButton';
import { actionOpenModal } from "../../actions/actionsForModal";

const ChatPageHeader = ({ chats, chatId, openModal}) => {
    const [isOpen, setOpen] = useState(false);
    const amount = chats[chatId]?.members?.length;

    return (
        <ChatPageHeaderWrap>
            <div style={{cursor: "pointer"}} onClick={() => openModal("chatInfoModal")}>
                <ChatListItemTitle>{chats[chatId]?.title}</ChatListItemTitle>
                <ChatMembersAmount>{amount} {amount === 1 ? 'member' : 'members'}</ChatMembersAmount>
            </div>
            <div>
                <IconButton sx={{ ...(isOpen && { display: 'none' }) }} onClick={() => setOpen(true)}>
                    <TableChartOutlinedIcon />
                </IconButton>
                <ChatInfoDrawer open={isOpen} closeChatMenu={() => setOpen(false)}/>
            </div>
        </ChatPageHeaderWrap>
    )
}

export default connect(state => ({chats : state?.chats || []}), {openModal: actionOpenModal})(memo(ChatPageHeader));