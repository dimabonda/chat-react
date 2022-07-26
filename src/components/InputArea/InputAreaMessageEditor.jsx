import { connect } from "react-redux"
import { actionSendMessage } from "../../actions/actionsMessages";
import { InputAreaWrapper, TextArea} from "./InputArea.style";
import MessageDropZone from "../DropZone/MessageDropZone/MessageDropZone";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {MessageEditor} from "../MessageDraft/MessageEditor";
import { actionSetInputMessageValue, actionSetMessageEditor } from "../../actions/actionsForChats";

const InputAreaMessageEditor = ({chats, chatId, deleteMessageEditor, sendMessage, setInputValue}) => {
    
    const inputValue = chats[chatId]?.draft?.messageEditor?.value || '';
    const messageId = chats[chatId]?.draft?.messageEditor?.message._id;
    const message = chats[chatId]?.draft?.messageEditor?.message;

    return (
        <InputAreaWrapper>
            <MessageEditor deleteMessageEditor={deleteMessageEditor} chatId={chatId} message={message}/>
            <div style={{display: 'flex', alignItems: 'center', padding: '10px 0'}}>
                <MessageDropZone chatId={chatId}/>
                <TextArea
                    value={inputValue}         
                    onChange={e=>{setInputValue(chatId, e.target.value, 'messageEditor')}}
                    maxRows={8}
                    placeholder="Write a message..." 
                />
                {inputValue ? 
                <SendRoundedIcon
                    style={{margin: '0 16px', cursor: "pointer"}}
                    color="primary"
                    // src={Plane} 
                    onClick={
                        async() => {
                            let val = await sendMessage(messageId, null, inputValue.replace(/^\s+|\s+$/g, ''), null, null);
                            val && deleteMessageEditor(chatId, null);
                        }
                    }
                /> : <div></div>}
            </div>
        </InputAreaWrapper>
       )
}

export default connect(state => ({chats: state.chats}), {
    sendMessage: actionSendMessage,
    setInputValue: actionSetInputMessageValue,
    deleteMessageEditor: actionSetMessageEditor
    
})(InputAreaMessageEditor);