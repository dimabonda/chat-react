import { MessageDraftContainer, MessageDraftInfo, MessageDraftText, MessageDraftWrapper, MessageOwnerDraftName } from "./MessageDraft.style";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

 export const MessageEditor = ({chatId, message, deleteMessageEditor}) => {

    return (
        <MessageDraftWrapper>
            <EditRoundedIcon color="primary"/>
            <MessageDraftContainer >
                <MessageDraftInfo>
                    <MessageOwnerDraftName>
                        {message?.owner?.nick || ''}
                    </MessageOwnerDraftName>
                    <MessageDraftText>
                        {message?.text.replace(/ /g, "\u00a0") || ''}
                    </MessageDraftText>
                </MessageDraftInfo>
            </MessageDraftContainer>
            <CloseRoundedIcon style={{cursor: 'pointer'}} color="primary" onClick={() => {deleteMessageEditor(chatId, null)}}/>
        </MessageDraftWrapper>
    )
}