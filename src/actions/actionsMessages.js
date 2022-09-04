import { actionPromise } from "./actionsPromise";
import { gql } from "../helpers/gql";
import { actionAddAllMediaChat, actionUploadFiles } from "./actionsMedia";
import { addUploadDate } from "../helpers/addUploadDate";
import { actionAddDraftMessage, actionGetOneChat, actionSetDropMedia, actionSetInputMessageValue, actionSetMessageEditor } from "./actionsForChats";
import { actionGetAllMediaFromChat } from "./actionsMedia";
import { actionIsOpen, actionOpenModal } from "./actionsForModal";

const actionAddMessages = (data, id) => ({type: 'MESSAGES', data, id});
const actionAddMessage = (data, id) => ({type: 'MSG', data, id});
const actionAddEditedMessage = (data, id) => ({type: 'EDITED_MSG', data, id});
const actionAddNewMessage = (data, id) => ({type: 'NEW_MESSAGE', data, id});
// const actionAddLoadingMessage = (data, id) => ({type: 'LOADED_MSG', data, id})
const actionRemoveLoadingMessage = (data, id) => ({type: 'REMOVE_LOADED_MSG', data, id});

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

const actionUpdateOneMessage = (msg) => 
	async (dispatch, getState) => {
		
		
		let message = await dispatch(actionGetOneMessage(msg._id));
		
		// if(message?.owner._id === currentUser){
		// 	if(messages[0])
		// }

		// if(data?.createdAt > lastLoadedMessage){             //check message (first or not)
			

			// if(data?.owner._id === currentUser){

			// } else {
			// 	dispatch(actionAddNewMessage(data, msg?.chat?._id))
			// }
		// }
		// если юзер ты то поменять или не ты 
		// элс найти нужное сообщение 
		// и подменяем 
		// dispatch(actionAddMessage(message, message.chat._id));
		return message
	}

export const actionUpsertMSG = (message) => 
	actionPromise('sendMSG', gql(`mutation MessageUpsert($message: MessageInput) {
		MessageUpsert(message: $message) {
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
	}`, {
		message 
	}))

export const actionSendMessage = (messageId, chatId, text, media, replyTo, forwarded) => 
	async (dispatch, getState) => {
		const state = getState();
		let newMedia = null
		if(media){
			let checkedMedia = media.filter(item => !item?._id && item)
			let uploadedFiles =  checkedMedia.length !== 0 ? await  dispatch(actionUploadFiles(checkedMedia)) : null;
			newMedia = uploadedFiles ? [...uploadedFiles, ...media.filter(item => item._id && item)].map(({_id}) => ({_id})) : null;
		}
		
		const mes = Object.fromEntries(Object.entries({
			_id: messageId, chat: (chatId ? {_id: chatId} : chatId), text: text, media: newMedia, replyTo: (replyTo ? {_id: replyTo} : replyTo), forwarded: (forwarded ? {_id: forwarded} : forwarded) 
		}).filter(([_, v]) => v != null));
		
		
		if(!mes?._id){
			const {chats, ...owner} = state?.promise?.aboutMe?.payload;
			dispatch(actionAddNewMessage({...mes, status: 'loading', owner: {...owner}}, chatId))
		}
		
		let message = await dispatch(actionUpsertMSG(mes))

		if(!mes?._id && message){
			dispatch(actionRemoveLoadingMessage(message, chatId))
			// dispatch(actionAddNewMessage(message, chatId))
			dispatch(actionGetOneChat(chatId));
		}else if(mes?._id){
			dispatch(actionAddEditedMessage(message, chatId))
		}

		if (messageId && media){
			message && dispatch(actionSetInputMessageValue(chatId, "", 'messageEditor'));
			message && dispatch(actionIsOpen(false));
		} else if(messageId && !media){
			message && dispatch(actionSetMessageEditor(chatId, null))
		} else if(!messageId && media){
			message?.replyTo?._id && dispatch(actionAddDraftMessage(chatId, null));
			message && dispatch(actionSetInputMessageValue(chatId, "", 'mainInputValue'));
			message && dispatch(actionIsOpen(false));
		} else if(!messageId && !media){
			(message?.replyTo?._id || message?.forwarded?._id) && dispatch(actionAddDraftMessage(chatId, null));
			message && !message?.forwarded?._id && dispatch(actionSetInputMessageValue(chatId, "", 'mainInputValue')) && dispatch(actionSetInputMessageValue(chatId, "", 'draftValue'));
		}
		return message
	}

export const actionGetMessageFromSocket = (msg) => 
	async (dispatch, getState) => {
		const currentUser = getState()?.auth?.payload?.sub?.id;
		const messages = getState()?.chats[msg?.chat?._id]?.messages || [[]];
		let message = await dispatch(actionGetOneMessage(msg._id));
		if(message?.owner?._id !== currentUser){
			const arrayWithLastLoadedMessage = messages.find(array => array.find(obj => !obj.status))
			const lastLoadedMessage = arrayWithLastLoadedMessage.find(obj => !obj.status);
			lastLoadedMessage?.createAt < message?.createAt ? dispatch(actionAddNewMessage(message, message?.chat?._id)) : dispatch(actionAddEditedMessage(message, message?.chat?._id))
			dispatch(actionGetOneChat(msg.chat._id));
		}

		
		
		////////check all replies and forwardWith (if message has them to send changes)
		console.log(message)
		const {replies, forwardWith} = message;
		const state = getState();
		// const [,route, histId] = history.location.pathname.split('/');
		if(replies){
			replies.forEach(async ({_id, chat}) => {
					let mes = await dispatch(actionGetOneMessage(_id))
					dispatch(actionAddEditedMessage(mes, chat?._id))
			})
		}
		if(forwardWith){
			forwardWith.forEach(async ({_id, chat}) => {
					let mes = await dispatch(actionGetOneMessage(_id))
					dispatch(actionAddMessage(mes, chat._id));
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