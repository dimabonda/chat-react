import { List } from "@mui/material"
import { useEffect, useState } from "react"
import { history } from "../../App"
import ChatListItem from '../ChatListItem/ChatListItem';
import { ChatListWrapper } from "./ChatList.style"
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export const ChatList = ({chats, clearInput}) => {
	const [, route, histId] = history.location.pathname.split('/');
	const [stateId, setStateId] = useState();
	
	useEffect(() => {
		setStateId(histId)
	},[histId])

	return (
		<ChatListWrapper>
			<SimpleBar  style={{ maxHeight: '100%'}}>
				<List sx={{p: '0'}}>
					{chats.map((item) => <ChatListItem clearInput={clearInput} key={item._id} isActive={stateId === item._id} chat={item} handleSetId={setStateId} />)}
				</List>
			</SimpleBar>
		</ChatListWrapper>
	)
}