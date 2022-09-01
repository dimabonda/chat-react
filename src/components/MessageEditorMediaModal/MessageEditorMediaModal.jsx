import { DropMediaList, MediaBox, MediaModalHeader } from "../MessageMediaModal/MessageMediaModal.style"
import { MessageEditorMediaFooter, MessageEditorMediaModalWrapper } from "./MessageEditorMediaModal.style"
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { MemoizedDropMediaItem } from "../DropMediaItem/DropMediaItem";
import { Button, TextField } from "@mui/material";
import { actionSendMessage } from "../../actions/actionsMessages";
import { useEffect } from "react";
import { connect } from "react-redux";
import { actionDeleteDropMedia, actionSetInputMessageValue, actionSetMessageEditor } from "../../actions/actionsForChats";

const MessageEditorMediaModal = ({chats, handleClose, deleteMessageEditor, open, chatId, sendMessage, setInputValue, deleteMedia}) => {
    const media = chats[chatId].draft?.media || [];
    const inputValue = chats[chatId].draft?.messageEditor?.value || '';
    const messageId = chats[chatId].draft?.messageEditor?.message?._id;

    useEffect(() => {
        open || deleteMedia(chatId);
        open || deleteMessageEditor(chatId, null);
    }, [open])

    return (
        <MessageEditorMediaModalWrapper>
            <MediaModalHeader>Edit message</MediaModalHeader>
            <MediaBox>
                <SimpleBar style={{ maxHeight: '400px'}}>
                    <DropMediaList>
                        {media.map((item) => <MemoizedDropMediaItem key={item.uploadDate} chatId={chatId} mediaItem={item}/>)}
                    </DropMediaList>
                </SimpleBar>
            </MediaBox>
            <TextField
                maxRows={7}
                multiline
                sx={{width: "100%", mt: "30px"}}
                variant="standard" 
                label="Caption"
                onChange = {(e) => setInputValue(chatId, e.target.value, 'messageEditor')}
                onKeyPress = {(e) => {
                    if (e.key === 'Enter'){
                        e.preventDefault();
                        sendMessage(messageId, chatId, inputValue.replace(/^\s+|\s+$/g, ''), media, null, null)
                    }
                }}
                value={inputValue}
            />
            <MessageEditorMediaFooter>
                    <Button variant="text" onClick={handleClose}>Cancel</Button>
                    <Button 
                        variant="text" 
                        onClick={() => sendMessage(messageId, chatId, inputValue.replace(/^\s+|\s+$/g, ''), media, null, null)}
                    >Send</Button>
                </MessageEditorMediaFooter>
        </MessageEditorMediaModalWrapper>
    )
} 

export default connect(state => ({
    chats: state.chats
}),
{
    deleteMedia: actionDeleteDropMedia, 
    deleteMessageEditor: actionSetMessageEditor,
    sendMessage: actionSendMessage,
    setInputValue: actionSetInputMessageValue
})(MessageEditorMediaModal);