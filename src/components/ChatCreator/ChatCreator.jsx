import { Button, TextField } from '@mui/material';
import { connect } from 'react-redux';
import DropZoneAvatar from '../DropZone/DropZoneAvatar';
import { SearchUserForChat } from '../SearchUserForChat/SearchUserForChat';
import { useEffect, useState } from 'react';
import {actionUpsertChat } from '../../actions/actionsForChats';

export const NewChatModal = ({url, handleClose, handleSetAvatar, inputValue, setChatNameValue, setShowNextModal}) => {

	useEffect(() =>{
		console.log(url)
	}, [url])
	return(
		<div className='MainChatModal'>
			<div>
				<DropZoneAvatar component={"dropAvatarComponent"} onLoad={handleSetAvatar} url={url}/>
				<TextField
					sx={{width: '100%'}}
					id="standard-basic" 
					label="Chat Name" 
					variant="standard" 
					color='primary'
					value={inputValue}
					onChange={(e) =>setChatNameValue(e.target.value)}
				/>
			</div>
			<div>
				<Button variant='text' onClick={handleClose}>Cancel</Button>
				<Button variant='text' disabled={inputValue ? false : true} onClick={()=> setShowNextModal(true)}>Next</Button>
			</div>
		</div>
	)
} 

const ChatCreatorModal = ({createChat, handleClose}) => {
   
    const [avatar, setAvatar] = useState('');
	const [chatNameValue, setChatNameValue] = useState('');
	const [showNextModal, setShowNextModal] = useState(false);
	const [users, setUsers] = useState();

	return (!showNextModal) ?  
		<NewChatModal
		handleSetAvatar={setAvatar}
		url={avatar && URL.createObjectURL(avatar)}
		handleClose={handleClose}
		inputValue={chatNameValue}
		setChatNameValue={setChatNameValue}
		setShowNextModal={setShowNextModal}
		/>
	 	:
		<>
			<SearchUserForChat getUsers={setUsers} />
			<div style={{display: "flex",
					padding: "10px 15px",
					justifyContent: "right",
					alignItems: "center"}}>
				<Button variant="text" onClick={handleClose} >Cancel</Button>
				<Button variant="text" onClick={() => {createChat(null, chatNameValue, users, avatar); handleClose()}}>Create</Button>
			</div>
		</>
}

export default connect(null, {createChat: actionUpsertChat})(ChatCreatorModal);

