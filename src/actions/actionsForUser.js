import { gql } from "../helpers/gql";
import { actionAboutMe } from "./actionAboutMe";
import { actionLeftChat, actionUpdateChat } from "./actionsForChats";
import { actionPromise } from "./actionsPromise";

export const actionFindUser = (value) => 
    actionPromise('usersList', gql(`query findUser($q: String) {
        UserFind(query: $q) {
          login
          _id
        nick
          avatar {
            _id
            url
          }
        }
      }`,{
          q: JSON.stringify([
              {
                $or : [{nick: `/${value}/`}]
              },
              {
                sort : [{login: 1}]
              }
          ])
      } ))

export const actionUpdateUser = (user) => 
    actionPromise('updateUser', gql(`mutation leaveChatByUser($user: UserInput) {
        UserUpsert(user: $user) {
          login
          chats {
            title
          }
        }
      }`, {user: user}));

export const actionUpsertUser = (login, nick, password, chatId) => 
    async (dispatch, getState) => {
        const state = getState();
        const currUserId = state.auth?.payload?.sub?.id;
        //remove chat from chats array
        const chats = chatId ? Object.values(state.chats).filter(chat => chat._id !== chatId).map(chat => {
                    let {_id} = chat;
                    //return only id
                    return {"_id": _id}
                }) 
            : null;
        const user = Object.fromEntries(Object.entries({_id: currUserId, login, nick, password, chats}).filter(([_, v]) => v != null));
        const res = await dispatch(actionUpdateUser(user));
            (res && chatId) ? 
                //actionUpdateChat doesn't work, but it helps to everyone members from the chat to get callback from socket,
                // because userUpsert doesn't work from socket
                (dispatch(actionLeftChat(state.chats[chatId])) &&  dispatch(actionUpdateChat({_id: chatId, title: state.chats[chatId].title}))) : 
                dispatch(actionAboutMe());
    }