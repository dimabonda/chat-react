import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { actionGetMessageForChat, actionSentOrUpdateMSG } from "../../actions/actionsMessages";
import ChatPageHeader from "../ChatPageHeader/ChatPageHeader";
import InputArea from "../InputArea/InputArea";
import { ChatPageMain, ChatPageWrapper } from "./ChatPageData.style";
import MessagesArea from "../MessagesArea/MessagesArea";

const ChatPageData = ({match: {params: {_id}}, getData, chats}) => {
	
	const chat = chats[_id];

	return (
		<ChatPageWrapper>
			<ChatPageHeader membersAmount={chat?.members?.length} chatTitle={chat?.title}/>
			<ChatPageMain>
				<MessagesArea chatId={_id} messages={chat?.messages}/>
				<InputArea chat={chat} chatId={_id}/>
			</ChatPageMain>
		</ChatPageWrapper>
	)
}

export default connect(state => ({chats: state?.chats || {}}), {getData: actionGetMessageForChat})(ChatPageData);