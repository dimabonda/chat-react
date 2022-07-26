import { connect } from "react-redux"
import { actionSendMessage} from "../../actions/actionsMessages"
import { InputAreaWrapper, TextArea} from "./InputArea.style";
import MessageDropZone from "../DropZone/MessageDropZone/MessageDropZone";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import InputAreaMessageEditor from "./InputAreaMessageEditor";
import MessageReplyForwarded from "../MessageDraft/MessageReplyForwarded";
import  RecordViewAudio, { MemoRecordViewAudio } from "../Recorder/RecorderAudio";
import { MemoRecordViewVideo } from "../Recorder/RecorderVideo";
import { actionAddDraftMessage, actionSetInputMessageValue } from "../../actions/actionsForChats";

const InputArea = ({sendMessage, deleteDraftMessage, chatId, chats, setInputValue, modal: {content, isOpen}}) => {
    const message = chats[chatId]?.draft?.mainInputValue?.message;
    const inputValue = chats[chatId]?.draft?.mainInputValue?.value || '';
    const  replyMessageId =  message && message.hasOwnProperty('reply') ? message.reply?._id : null;
    const forwardedMessageId = message && message.hasOwnProperty('forwarded') ? message.forwarded?._id : null;

	return (
        <div style={{display: 'flex', borderTop: '1px solid #e9e9e9', alignItems: 'center'}}>
            {(chats[chatId]?.draft?.messageEditor && !chats[chatId]?.draft?.messageEditor?.message?.media) ? 
            <InputAreaMessageEditor chatId={chatId}/> 
            :
            <InputAreaWrapper>
                <MessageReplyForwarded chat={chats[chatId]}></MessageReplyForwarded>
                <div style={{display: 'flex', alignItems: 'center', padding: '10px 0'}}>
                    <MessageDropZone chatId={chatId}/>
                    <TextArea
                        value={content === 'messageMediaModal' && isOpen ? '' : inputValue}         
                        onChange={e=>{setInputValue(chatId, e.target.value, 'mainInputValue')}}
                        maxRows={8}
                        disabled={forwardedMessageId ? true : false}
                        placeholder="Write a message..." 
                    />
                    {inputValue || forwardedMessageId ? 
                    <SendRoundedIcon
                        style={{margin: '0 16px', cursor: "pointer"}}
                        color="primary"
                        onClick={
                            async() => {
                                let val = await sendMessage(null, chatId, forwardedMessageId ? 'forwarded message' : inputValue?.replace(/^\s+|\s+$/g, ''), null, replyMessageId, forwardedMessageId);
                                (val?.replyTo?._id || val?.forwarded?._id) && deleteDraftMessage(chatId, null)
                                val && !val?.forwarded?._id && setInputValue(chatId, "", 'mainInputValue') && setInputValue(chatId, "", 'draftValue')
                            }
                        }
                    /> : <div></div>}
                </div>
            </InputAreaWrapper>}
            <MemoRecordViewAudio sendMessage={sendMessage} chatId={chatId}/>
        </div> 
    )
}

export default connect(state => ({chats: state.chats, modal: state?.modal}), {
    sendMessage: actionSendMessage,
    setInputValue: actionSetInputMessageValue,
    deleteDraftMessage: actionAddDraftMessage
})(InputArea);