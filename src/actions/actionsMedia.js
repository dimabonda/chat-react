import { history } from "../App";
import { gql } from "../helpers/gql";
import { uploadFile } from "../helpers/uploadFile";
import { actionAboutMe } from "./actionAboutMe";
import { actionUpdateChat } from "./actionsForChats";
import { actionGetAllMessage } from "./actionsMessages";
import { actionPromise } from "./actionsPromise";

const actionAddMedia = (typeId, mediaId, type) => 
actionPromise('newMedia', gql(`mutation setMedia($media: MediaInput) {
  MediaUpsert(media: $media) {
    _id
    
  }
}`, {media: {_id: mediaId, [type]: {_id: typeId}}}))


export const actionUploadFile = (file) => 
actionPromise('file', uploadFile(file))

export const actionUploadFiles = (files) => 
actionPromise('files', Promise.all(files.map(file => uploadFile(file))))          

export const actionSetUserAvatar =  (file) => 
  async (dispatch, getState) => {
    let userId = getState().auth.payload.sub.id;
      let media =  await dispatch(actionUploadFile(file));
      console.log(media)
      if (media._id){
         let dataId = await dispatch(actionAddMedia(userId, media._id, "userAvatar"))
         if (dataId){
             dispatch(actionAboutMe())
         }
      }
  }

export const actionSetChatAvatar = (file, data) => 
  async (dispatch, getState) => {
    const [,route, chatId] = history.location.pathname.split('/');
    const chat = data ? data : getState().chats[chatId];
    console.log(chat)
    const media = await dispatch(actionUploadFile(file));
    if(media._id){
      const dataId = await dispatch(actionAddMedia(chat?._id, media._id, "chatAvatars"))
      if (dataId){
        //it helps to everyone to get changed chat with avatar from socket (something to change for example title)
        dispatch(actionUpdateChat({_id: chat?._id, title: chat?.title}));
      }
      return dataId
    }
  }

export const actionAddAllMediaChat = (id, data) => ({type: 'ALLMEDIACHAT', id, data})

export const actionGetAllMediaFromChat = (id) => 
	async(dispatch, getState) => {
		const messages = await dispatch(actionGetAllMessage(id));
		if(messages.length !== 0) {
    		const media = messages.reduce((a, b) => b.media ? [...a, ...b.media] : a,[] )
			dispatch(actionAddAllMediaChat(id, media));
		}
	}
	