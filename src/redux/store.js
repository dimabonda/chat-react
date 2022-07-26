import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { chatReducer } from './reducers/chatReducer';
import { modalReducer } from './reducers/modalReducer';
import { promiseReducer } from './reducers/promiseReducer';

export const store = createStore(combineReducers({
    promise: promiseReducer, auth: authReducer, chats: chatReducer, modal: modalReducer
}), applyMiddleware(thunk))