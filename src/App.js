import { Provider,connect } from 'react-redux';
import './App.scss';
import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { actionGetMessageFromSocket } from './actions/actionsMessages';
import { actionGetOneChat, actionLeftChat } from './actions/actionsForChats';
import { store } from './redux/store';
import Routes from './components/Routes/Routes';
export const history = createBrowserHistory();
export const socket = window.io("ws://young-headland-40995.herokuapp.com")

console.log(store.getState())
store.subscribe(() => console.log(store.getState()));

if (localStorage.authToken) socket.emit('jwt', localStorage.authToken)
socket.on('jwt_ok',   data => console.log(data))
socket.on('jwt_fail', error => console.log(error))
socket.on('msg', msg => {console.log('from socket msg', msg); store.dispatch(actionGetMessageFromSocket(msg))})
socket.on('chat', chat => {console.log('from socket chat', chat); if (localStorage.authToken) {socket.emit('jwt', localStorage.authToken)}; store.dispatch(actionGetOneChat(chat._id))})
socket.on('chat_left', chat => {console.log('from socket chat_left', chat); store.dispatch(actionLeftChat(chat)) });
socket.on("connect", () => {
	console.log(socket.id)
})



function App() {
  return (
	<Router history={history}>
		<Provider store={store}>
			<div className="App">
				<Routes />
			</div>
		</Provider>
 	</Router>
  );
}

export default App;

