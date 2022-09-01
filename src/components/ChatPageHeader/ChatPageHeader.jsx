import { connect } from "react-redux"
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { ChatListItemTitle } from "../ChatListItem/ChatListItem.style"
import { ChatMembersAmount, ChatPageHeaderWrap } from "./ChatPageHeader.style"
import  ChatInfoDrawer  from "../ChatInfoDrawer/ChatInfoDrawer";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import { actionOpenModal } from "../../actions/actionsForModal";

const ChatPageHeader = ({membersAmount, chatTitle, openModal}) => {

    const [isOpen, setOpen] = useState(false);
    
    return (
        <ChatPageHeaderWrap>
            <div style={{cursor: "pointer"}} onClick={() => openModal("chatInfoModal")}>
                <ChatListItemTitle>{chatTitle}</ChatListItemTitle>
                <ChatMembersAmount>{membersAmount} {membersAmount === 1 ? 'member' : 'members'}</ChatMembersAmount>
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

export default connect(null, {openModal: actionOpenModal})(ChatPageHeader);