import { actionPromise } from "./actionsPromise";
import { gql } from "../helpers/gql";
import { actionAddChats } from "./actionsForChats";

export const actionFindUser = (_id) => (
    actionPromise('aboutMe', gql(`query findUserOne($q: String) {
       UserFindOne (query: $q){
          _id
          createdAt
          login
          nick
          avatar {
             _id
             url
          }
          chats {
             _id
             title
             createdAt
             lastModified
             owner{
                _id
             }
             lastMessage {
                media{
                   _id
                   url
                }
                text 
                createdAt
                owner{
                  _id 
                  nick
                }
              }
             avatar{
                _id
                url
             }
             members{
                _id
                nick
                avatar{
                   url
                }
             }
          }
       }     
    }`, { 
          q: JSON.stringify([  {_id: _id}  ])
       }
    ))
 )

export const actionAboutMe = () => 
        async (dispatch, getState) => {
            const{auth} = getState();
            const id = auth?.payload?.sub?.id
            if(id){
                let user = await dispatch(actionFindUser(id))
                console.log(user)
                if (user){
                    dispatch(actionAddChats([...user.chats]));
                    
                }
            }
        } 