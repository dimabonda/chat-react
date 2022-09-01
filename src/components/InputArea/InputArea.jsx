import { connect } from "react-redux"
import { actionSendMessage} from "../../actions/actionsMessages"
import { InputAreaWrapper, MainInputArea, TextArea, TextAreaWrapper} from "./InputArea.style";
import MessageDropZone from "../DropZone/MessageDropZone/MessageDropZone";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import InputAreaMessageEditor from "./InputAreaMessageEditor";
import MessageReplyForwarded from "../MessageDraft/MessageReplyForwarded";
import  RecordViewAudio, { MemoRecordViewAudio } from "../Recorder/RecorderAudio";
import { MemoRecordViewVideo } from "../Recorder/RecorderVideo";
import { actionAddDraftMessage, actionSetInputMessageValue } from "../../actions/actionsForChats";

const InputArea = ({sendMessage, deleteDraftMessage, chatId, chat, setInputValue, modal: {content, isOpen}}) => {
    const message = chat?.draft?.mainInputValue?.message;
    const inputValue = chat?.draft?.mainInputValue?.value || '';
    const  replyMessageId =  message && message.hasOwnProperty('reply') ? message.reply?._id : null;
    const forwardedMessageId = message && message.hasOwnProperty('forwarded') ? message.forwarded?._id : null;

	return (
        <MainInputArea>
            {(chat?.draft?.messageEditor && !chat?.draft?.messageEditor?.message?.media) ? 
            <InputAreaMessageEditor messageEditor={chat?.draft?.messageEditor} chatId={chatId}/> 
            :
            <InputAreaWrapper>
                <MessageReplyForwarded message={message} chatId={chatId}/>

                <TextAreaWrapper>
                    <MessageDropZone chatId={chatId}/>
                    <TextArea
                        value={content === 'messageMediaModal' && isOpen ? '' : inputValue}         
                        onChange={e=>{setInputValue(chatId, e.target.value, 'mainInputValue')}}
                        maxRows={8}
                        disabled={forwardedMessageId ? true : false}
                        placeholder="Write a message..." 
                        onKeyPress={(e) => {
                                if(e.key === 'Enter'){
                                    e.preventDefault();
                                    sendMessage(null, chatId, forwardedMessageId ? 'forwarded message' : inputValue?.replace(/^\s+|\s+$/g, ''), null, replyMessageId, forwardedMessageId);
                                }
                            }
                        }
                    />
                    {inputValue || forwardedMessageId ? 
                    <SendRoundedIcon
                        style={{margin: '0 16px', cursor: "pointer"}}
                        color="primary"
                        onClick={() => sendMessage(null, chatId, forwardedMessageId ? 'forwarded message' : inputValue?.replace(/^\s+|\s+$/g, ''), null, replyMessageId, forwardedMessageId)}
                    /> : <div></div>}
                </TextAreaWrapper>
            </InputAreaWrapper>}
            <MemoRecordViewAudio sendMessage={sendMessage} chatId={chatId}/>
        </MainInputArea> 
    )
}

export default connect(state => ({modal: state?.modal}), {
    sendMessage: actionSendMessage,
    setInputValue: actionSetInputMessageValue,
    deleteDraftMessage: actionAddDraftMessage
})(InputArea);