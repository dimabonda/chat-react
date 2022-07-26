import { Menu, MenuItem } from '@mui/material';
import ReplyIcon from "./icons8-reply.png";
import ForwardIcon from "./icons8-forward.png";
import { ImgIcon } from './MessageOptions.style';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { connect } from 'react-redux';
import { actionEditMessage } from '../../actions/actionsMessages';
import { memo } from 'react';
import { actionModalDraft, actionOpenModal } from '../../actions/actionsForModal';
import { actionAddDraftMessage } from '../../actions/actionsForChats';

const MessageOptions = ({userId, addDraftMessageEditor, handleClose, addMessageId, open, anchorEl, chatId, message, addDraftMessage, openModal}) => {
    const isOwner = userId === message.owner?._id;
    return(
        
        <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }} 
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem onClick={() => {handleClose(); addDraftMessage(chatId, {reply: message})}} disableRipple>
                    <ImgIcon src={ReplyIcon} />
                    Reply
                </MenuItem>
                {isOwner && <MenuItem onClick={() => {handleClose(); addDraftMessageEditor(chatId, message)}} disableRipple>
                    <EditIcon style={{height: '18px', width: '18px', marginRight: '18px'}}/>
                    Edit
                </MenuItem>}

                <MenuItem onClick={() => {addMessageId(message, 'forwardedMessage'); openModal('searchChatModal'); handleClose()}} disableRipple> 
                    <ImgIcon src={ForwardIcon} />
                    Forward
                </MenuItem>

                <MenuItem onClick={() => {handleClose()}} disableRipple>
                    <DeleteOutlineIcon style={{height: '18px', width: '18px', marginRight: '18px'}}/>
                    Delete
                </MenuItem>
            </Menu>
    )
}

export default connect(state => ({userId: state?.auth?.payload?.sub?.id}), {addDraftMessage: actionAddDraftMessage, addDraftMessageEditor: actionEditMessage, openModal: actionOpenModal, addMessageId: actionModalDraft})(memo(MessageOptions))