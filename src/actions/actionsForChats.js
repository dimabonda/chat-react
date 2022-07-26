import { actionPromise } from "./actionsPromise";
import { gql } from "../helpers/gql";
import { actionSetChatAvatar } from "./actionsMedia";
import { history } from "../App";

export const actionAddChats = (data) => ({type: 'CHATS', data})
export const actionAddChat = (chat) => ({type: 'CHATS', data: [chat]})

export const actionSetDropMedia = (id, data) => ({type: 'SETMEDIA', data, id});

export const actionDeleteDropMedia = (id) => ({type: 'CLEARMEDIA', id});

export const actionDeleteOneMediaFile = (id, mediaKey) => ({type: 'DELETEMEDIA', id, mediaKey});

export const actionChangeFile = (id, data, mediaKey) => ({type: 'CHANGE', id, data, mediaKey}); 

export const actionSetInputMessageValue = (id, data, name) => ({type: 'SETINPUTMESSAGE', id, data, name});

export const actionAddDraftMessage = (id, data) => ({type: 'ADDMESSAGEDRAFT', id, data});

export const actionClearChats = () => ({type: 'CLEARCHATS'})

export const actionSetMessageEditor = (id, data) => ({type: 'MESEDITOR', id, data})

export const actionLeftChat = (data) => {
	const [,route, histId] = history.location.pathname.split('/');
	if(histId  === data._id){
		history.push('/')
	}
	return ({type: 'LEFTCHAT', data})
}

export const actionGetAllChats = (userId) => (
    actionPromise('getAllChats', gql(`query getAll($q: String){
       ChatFind (query: $q){
             _id
             title
             avatar {
                _id
                url
             }
             
             members {
                _id
                login
                avatar {
                   _id
                   url
                }
             }
             lastModified
       }         
    }`, { 
          q: JSON.stringify([ { 'members._id': userId } ])
          }
    ))
 )

export const actionUpdateChat = (chat) => 
   actionPromise('newChat', gql(`mutation createChat($chat: ChatInput) {
      ChatUpsert(chat: $chat) {
        _id
        title
        members {
          login
          _id
        }
      }
    }`, {chat: chat}))

export const actionUpsertChat = (id, title, members, avatar) => 
   async (dispatch, getState) => {
      const chat = Object.fromEntries(Object.entries({_id: id, title, members}).filter(([_, v]) => v != null));
      
      const data = await dispatch(actionUpdateChat(chat));
      console.log(data)
      if(data?._id && avatar){
         dispatch(actionSetChatAvatar(avatar, data));
      }
   }

export const actionGetOneChat = (_id) => 
async dispatch => {
   let chat = await dispatch(
      actionPromise('oneChat', gql(`query findChatById($chatId: String) {
         ChatFindOne(query: $chatId) {
            _id
            title
            members{
               _id
               nick
               avatar{
                  url
               }
            }
            owner{
               _id
            }
            avatar{
            _id
            url
            }
            lastModified
            lastMessage {
            text
            media{
               _id
               url
            }
            createdAt
            owner{
               nick
               _id
            }
            } 
         }
         }`, {chatId: JSON.stringify([{_id}])}))
   )
   if(chat){
      dispatch(actionAddChat(chat))
   }
}

// export const actionUpdateChat = (id, title, members) => 
//    async (dispatch, getState) => {
//       //remove all null
//       let chat = Object.fromEntries(Object.entries({_id: id, title: title, members: members}).filter(([_, v]) => v != null));
//       let newChat = await dispatch(actionUpsertChat(chat));
//       console.log(newChat);
//    }



