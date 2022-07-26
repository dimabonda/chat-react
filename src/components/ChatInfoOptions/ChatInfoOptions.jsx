import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import AddUserIcon from "../ChatInfoModal/add-user.png";
import { connect } from "react-redux";
import Exit from "./icons8_exit.png";
import Basket from "./icons8_basket.svg";
import { actionUpsertUser } from "../../actions/actionsForUser";
import { actionUpdateChat } from "../../actions/actionsForChats";
import { actionOpenModal } from "../../actions/actionsForModal";

const ChatInfoOptions = ({setIsOpenSearch, setOpen, leaveChat, chatId, isOwner, deleteChat}) => {
    const ImgStyle = {
      height: "20px", 
      marginRight: "20px"
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return(
        <div>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
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

            {isOwner && <div>
                <MenuItem onClick={() => {handleClose(); setOpen('chatEditorModal') }} disableRipple>
                    <EditIcon sx={{mr: "20px"}}/>
                    Edit
                </MenuItem>
                <MenuItem onClick={() => {handleClose(); setIsOpenSearch(true)}} disableRipple>
                    <img src={AddUserIcon} style={ImgStyle}/>
                    Add members
                </MenuItem>
                <MenuItem onClick={() => {handleClose(); deleteChat({_id: chatId, members: []})}} disableRipple>
                    <img src={Basket} style={ImgStyle}/>
                    Delete chat
                </MenuItem>
                <Divider sx={{margin: "0px"}}/>
            </div>}
                <MenuItem onClick={() => {handleClose(); leaveChat(null, null, null, chatId)}} disableRipple>
                    <img src={Exit} alt="exit" style={ImgStyle}/>
                    Leave chat
                </MenuItem>
            </Menu>
        </div>
    )
}

export default connect(null, {setOpen: actionOpenModal, leaveChat: actionUpsertUser, deleteChat: actionUpdateChat})(ChatInfoOptions);