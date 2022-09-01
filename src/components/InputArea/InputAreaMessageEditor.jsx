import { connect } from "react-redux"
import { actionSendMessage } from "../../actions/actionsMessages";
import { InputAreaWrapper, TextArea} from "./InputArea.style";
import MessageDropZone from "../DropZone/MessageDropZone/MessageDropZone";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {MessageEditor} from "../MessageDraft/MessageEditor";
import { actionSetInputMessageValue, actionSetMessageEditor } from "../../actions/actionsForChats";

const InputAreaMessageEditor = ({messageEditor, chatId, deleteMessageEditor, sendMessage, setInputValue}) => {
    
    const message = messageEditor?.message;
    const inputValue = messageEditor?.value || '';
    const messageId = message?._id;

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
                    onKeyPress={(e) => {
                        if(e.key === 'Enter'){
                            e.preventDefault();
                            sendMessage(messageId, chatId, inputValue.replace(/^\s+|\s+$/g, ''), null, null)
                        }
                    }}
                />
                {inputValue ? 
                <SendRoundedIcon
                    style={{margin: '0 16px', cursor: "pointer"}}
                    color="primary"
                    // src={Plane} 
                    onClick={() => {sendMessage(messageId, chatId, inputValue.replace(/^\s+|\s+$/g, ''), null, null)}}
                /> : <div></div>}
            </div>
        </InputAreaWrapper>
       )
}

export default connect(null, {
    sendMessage: actionSendMessage,
    setInputValue: actionSetInputMessageValue,
    deleteMessageEditor: actionSetMessageEditor
    
})(InputAreaMessageEditor);