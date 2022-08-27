import { actionPromise } from "./actionsPromise";
import { gql } from "../helpers/gql";
import { actionAddAllMediaChat, actionUploadFiles } from "./actionsMedia";
import { addUploadDate } from "../helpers/addUploadDate";
import { actionGetOneChat, actionSetDropMedia, actionSetMessageEditor } from "./actionsForChats";
import { actionGetAllMediaFromChat } from "./actionsMedia";
import { actionOpenModal } from "./actionsForModal";

export const actionAddMessages = (data, id) => ({type: 'MESSAGES', data, id});
const actionAddMessage = (data, id) => ({type: 'MSG', data, id});

export const actionGetAllMessage = (_id) => 
	actionPromise('allMessages', gql(`query findAllMes($chatId: String) {
		MessageFind(query: $chatId) {
		  media {
			url
			_id
			type
			originalFileName
		  }
		}
	  }`, {chatId: JSON.stringify([{"chat._id": _id}, {limit: [200]}])}))


const actionGetOneMessage = (_id) => 
	actionPromise('oneMessage', gql(`query getOneMes($mesId: String){
		MessageFindOne(query: $mesId){
			_id
			text
			createdAt
			chat{
				_id
			}
			media {
				url
				_id
				type
				originalFileName
			}
			replyTo{
				_id
				text 
				createdAt
				media {
					url
					_id
					type
				}
				owner {
					nick
				}
			}
			replies{
				_id text 
				chat{
					_id
				}
			}
			forwarded{
				_id
				text
				createdAt
				owner {
					nick
				  }
				  media {
					originalFileName
					url
					_id
					type
				  }
			}
			forwardWith{
				_id
				text
				chat{
					_id
				}
			}
			owner {
				_id
				nick
				avatar {
				  url
				}
			}
		}
	}`, {mesId: JSON.stringify([{_id}])}))

export const actionUpsertMSG = (message) => 
	actionPromise('sendMSG', gql(`mutation MessageUpsert($message: MessageInput) {
		MessageUpsert(message: $message) {
		  _id
		  createdAt
		  text
		  media {
			url
			_id
			type
		  }
		  replyTo{
			  _id
		  }
		  forwarded{
			  _id
		  }
		  owner {
			nick
			avatar {
			  url
			}
		  }
		  chat{
			_id
		  }
		}
	  }`, {
		  message 
	  }))

export const actionSendMessage = (messageId, chatId, text, media, replyTo, forwarded) => 
	async (dispatch, getState) => {
		// media.map((item) => item?.name || (item.name = 'record'))
		let newMedia = null
		if(media){
			let checkedMedia = media.filter(item => !item?._id && item)
			let uploadedFiles =  checkedMedia.length !== 0 ? await  dispatch(actionUploadFiles(checkedMedia)) : null;
			newMedia = uploadedFiles ? [...uploadedFiles, ...media.filter(item => item._id && item)].map(({_id}) => ({_id})) : null;
		}
		
		const mes = Object.fromEntries(Object.entries({
			_id: messageId, chat: (chatId ? {_id: chatId} : chatId), text: text, media: newMedia, replyTo: (replyTo ? {_id: replyTo} : replyTo), forwarded: (forwarded ? {_id: forwarded} : forwarded) 
		}).filter(([_, v]) => v != null));
			let message = await dispatch(actionUpsertMSG(mes))
			return message
	}

export const actionGetMessageFromSocket = (msg) => 
	async (dispatch, getState) => {
		let message = await dispatch(actionGetOneMessage(msg._id));
		dispatch(actionAddMessage(message, message.chat._id));
		dispatch(actionGetOneChat(msg.chat._id));
		////////check all replies and forwardWith (if message has them to send changes)
		const {replies, forwardWith} = message;
		const state = getState();
		// const [,route, histId] = history.location.pathname.split('/');
		if(replies){
			replies.forEach(async ({_id, chat}) => {
				if(state.chats[chat._id].messages?.hasOwnProperty(_id)){
					let mes = await dispatch(actionGetOneMessage(_id))
					dispatch(actionAddMessage(mes, chat._id));
				}
			})
		}
		if(forwardWith){
			forwardWith.forEach(async ({_id, chat}) => {
				if(state.chats[chat._id].messages?.hasOwnProperty(_id)){
					let mes = await dispatch(actionGetOneMessage(_id))
					dispatch(actionAddMessage(mes, chat._id));
				}
			})
		}
		const {media} = msg;
		if(media){
			dispatch(actionAddAllMediaChat(msg.chat._id, media))
		}
	}

export const actionEditMessage = (chatId, message) => 
	(dispatch, getState) => {
		dispatch(actionSetMessageEditor(chatId, {message: message, value: message.text}))
		if (message.media){
			let files = addUploadDate([...message.media])
			console.log(files)
			dispatch(actionSetDropMedia(chatId, files))
			dispatch(actionOpenModal('messageEditorMediaModal'))
		}
	}

	export const actionGetMessageForChat = (_id, isFirst) => 
	async (dispatch,getState) => {
		const state = getState();
		if (isFirst && state.chats[_id]?.messages) return
		if (state.promise.messages?.status === 'PENDING') return
		// let messLen = Object.values(state.chats[_id]?.messages || {}).length;
		let messLen = state.chats[_id]?.messages ? state.chats[_id]?.messages.reduce((currentCount, array) => currentCount + array.length, 0) : 0;
		console.log('skip', messLen)
		let messages = await dispatch(
			actionPromise('messages', gql(`query FindMessChat($chat: String) {
				MessageFind(query: $chat) {
				  _id
				  text
				  createdAt
				  chat{
					  _id
				  }
				  media {
					url
					_id
					type
					text
					originalFileName
				  }
				  replyTo{
					_id
					text 
					media {
						url
						_id
						type
					  }
					owner {
						nick
					  }
					}
					
					replies{
						_id text 
					}
					forwarded{
						_id
						text
						createdAt
						owner {
							nick
						  }
						  media {
							originalFileName 
							url
							_id
							type
						  }
					}
					forwardWith{
						_id
						text
					}
				  owner {
					_id
					nick
					avatar {
					  url
					}
				  }
				}
			  }`, {chat: JSON.stringify(
				  	[{"chat._id": _id}, 
						{
                    		sort: [{_id: -1}], limit: [20], skip: [messLen]
						}
					]
				)}
			))
		)
		
		if(messages){
			dispatch(actionAddMessages([...messages], _id));
			// dispatch(actionGetAllMediaFromChat(_id))
		}
		return messages
	}