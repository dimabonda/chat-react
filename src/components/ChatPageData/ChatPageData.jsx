import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { actionGetMessageForChat, actionSentOrUpdateMSG } from "../../actions/actionsMessages";
import ChatPageHeader from "../ChatPageHeader/ChatPageHeader";
import InputArea from "../InputArea/InputArea";
import { ChatPageMain, ChatPageWrapper } from "./ChatPageData.style";
import MessagesArea from "../MessagesArea/MessagesArea";

const ChatPageData = ({match: {params: {_id}}, getData}) => {
	useEffect(() => {
		getData(_id, true);
	}, [_id])

	return (
		<ChatPageWrapper>
			<ChatPageHeader chatId={_id}/>
			<ChatPageMain>
				<MessagesArea chatId={_id}/>
				<InputArea chatId={_id}/>
			</ChatPageMain>
		</ChatPageWrapper>
	)
}

export default connect(null, {getData: actionGetMessageForChat})(ChatPageData);