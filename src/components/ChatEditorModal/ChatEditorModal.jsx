import { Button, TextField } from "@mui/material"
import { useState } from "react"
import { connect } from "react-redux"
import { actionUpsertChat } from "../../actions/actionsForChats"
import { history } from "../../App"
import { backendURL } from "../../helpers/gql"
import DropZoneAvatar from "../DropZone/DropZoneAvatar"
import { ChatEditorModalWrapper } from "./ChatEditorModal.style"

const ChatEditorModal = ({handleClose, chats, updateChat}) => {
    const [,route, histId] = history.location.pathname.split('/');
    const [chatNameValue, setChatNameValue] = useState(chats[histId].title);
    const [avatar, setAvatar] = useState();
    
    return (
        <ChatEditorModalWrapper>
            <div>
				<DropZoneAvatar component={"dropAvatarComponent"} onLoad={setAvatar} url={avatar ? URL.createObjectURL(avatar) : `${backendURL}/${chats[histId]?.avatar?.url || ''}`}/>
				<TextField
                    autoFocus
					sx={{width: '100%'}}
					id="standard-basic" 
					label="Chat Name" 
					variant="standard" 
					color='primary'
					value={chatNameValue}
					onChange={(e) =>setChatNameValue(e.target.value)}
				/>
			</div>
			<div>
				<Button variant='text' onClick={handleClose}>Cancel</Button>
				<Button variant='text' disabled={chatNameValue ? false : true} onClick={() => {updateChat(histId, chatNameValue, null, avatar);handleClose()}}>Save</Button>
			</div>
        </ChatEditorModalWrapper>
    )
}

export default connect(state => ({chats: state?.chats || []}), {updateChat: actionUpsertChat})(ChatEditorModal);