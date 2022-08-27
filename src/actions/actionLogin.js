import { actionPromise } from "./actionsPromise";
import { gql } from "../helpers/gql";
import { history, socket } from '../App';
import { actionClearChats } from "./actionsForChats";

const actionAuthLogin = (token) => ({type: 'AUTH_LOGIN', token});

export const actionAuthLogout = () => {
  history.push('/')
  return ({type: 'AUTH_LOGOUT'})
}

export const actionLogout = () => 
  (dispatch) => {
    dispatch(actionAuthLogout());
    dispatch(actionClearChats());
  }

export const actionFullLogin = (log, pass) => 
async (dispatch) => {
	let token = await dispatch(
	  actionPromise('login', gql(`query login($login: String, $password: String) {
	  login(login: $login, password: $password)
	  }`, {login: log, password: pass}))
  )
  if(token){
	  socket.emit('jwt', token)
	  dispatch(actionAuthLogin(token))
	  history.push("/");
  }
  return token
}

export const actionCheckPassword = (log, pass) => 
async (dispatch) => {
  let token = await dispatch(
	  actionPromise('checkedPassword', gql(`query login($login: String, $password: String) {
	  login(login: $login, password: $password)
	  }`, {login: log, password: pass}))
  );
}

export const actionFullRegister = (log, pass, nick) => 
    async dispatch => {
        let user = await dispatch(
            actionPromise('register', gql( `mutation register($user: UserInput) {
                UserUpsert(user: $user) {
                   _id
                   login
                 }
               }`, {
                 user: {
                    login: log,
                    password: pass,
                    nick: nick
                 }
               }))
        )
        if(user){
            dispatch(actionFullLogin(log, pass));
        }

        return user
    }