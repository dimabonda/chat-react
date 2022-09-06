import ReplyIcon from '@mui/icons-material/Reply';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import { connect } from "react-redux";
import { MessageDraftContainer, MessageDraftInfo, MessageDraftText, MessageDraftWrapper, MessageOwnerDraftName } from './MessageDraft.style';
import { checkTypeFileForReply } from '../ReplyMessageMediaIcon/ReplyMessageMediaIcon';
import { actionAddDraftMessage } from '../../actions/actionsForChats';

const MessageReplyForwarded = ({message, chatId, deleteDraftMessage}) => {
    // const message = chat?.draft?.mainInputValue?.message || null;
    const typeMessage = message && Object.keys(message)
    return (message) ? 
        <MessageDraftWrapper>
            {message.hasOwnProperty('reply') ? <ReplyIcon color="primary"/> : <ForwardRoundedIcon color="primary"/>}
            <MessageDraftContainer>
                {message?.[typeMessage]?.media && checkTypeFileForReply(message?.[typeMessage]?.media?.[0]?.type, false, message?.[typeMessage]?.media?.[0]?.url)}
                <MessageDraftInfo>
                    <MessageOwnerDraftName>
                        {message?.[typeMessage]?.owner?.nick || ''}
                    </MessageOwnerDraftName>
                    <MessageDraftText>
                        {message?.[typeMessage]?.text?.replace(/ /g, "\u00a0") || ''}
                    </MessageDraftText>
                </MessageDraftInfo>
            </MessageDraftContainer>
            <CloseRoundedIcon style={{cursor: 'pointer'}} color="primary" onClick={() => {deleteDraftMessage(chatId, null)}}/>
        </MessageDraftWrapper>
    : <div></div>
}

export default connect(null, {deleteDraftMessage: actionAddDraftMessage})(MessageReplyForwarded);