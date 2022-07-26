import { Button, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import {DropMediaItem, MemoizedDropMediaItem}  from "../DropMediaItem/DropMediaItem";
import { addUploadDate } from "../../helpers/addUploadDate";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { DropMediaList, MediaBox, MediaModalHeader, MessageMediaFooter, MessageMediaModalWrapper } from "./MessageMediaModal.style"
import { actionSendMessage } from "../../actions/actionsMessages";
import { actionAddDraftMessage, actionDeleteDropMedia, actionSetDropMedia, actionSetInputMessageValue } from "../../actions/actionsForChats";
 

const MessageMediaModal = ({chatId, handleClose, deleteMedia, deleteDraftMessage, chats, open, onload, sendMessage, setInputValue}) => {
    const media = chats[chatId].draft?.media || [];
    const inputValue = chats[chatId].draft?.mainInputValue?.value || '';
    const message = chats[chatId]?.draft?.mainInputValue?.message;
    const replyMessageId =  message && message.hasOwnProperty('reply') ? message.reply?._id : null;
    // const forwardedMessageId = message && message.hasOwnProperty('forwarded') ? message.forwarded?._id : null;
    //remove media array
    useEffect(() => {
        open || deleteMedia(chatId);
        
    }, [open])

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        noDrag: true, 
        multiple: true
    });

    useEffect(()=>{
        let files = addUploadDate(acceptedFiles)
        console.log(files)
        acceptedFiles[0] && onload(chatId, files)
    }, [acceptedFiles]);

    useEffect(() => {
        media.length == 0 && handleClose();
    }, [media])

    return(
        <MessageMediaModalWrapper>
            <MediaModalHeader>{media.length} {media.length === 1 ? "file" : "files"} selected</MediaModalHeader>
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
                onChange = {(e) => setInputValue(chatId, e.target.value, 'mainInputValue')}
                value={inputValue}
            />
            <MessageMediaFooter>
                <div 
                    {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <Button variant="text">Add</Button>
                </div>
                
                <div>
                    <Button variant="text" onClick={handleClose}>Cancel</Button>
                    <Button 
                        variant="text" 
                        onClick={
                            async () => {
                                let val = await sendMessage(null, chatId, inputValue.replace(/^\s+|\s+$/g, ''), media, replyMessageId, null);
                                val?.replyTo?._id  && deleteDraftMessage(chatId, null)
                                val && setInputValue(chatId, "", 'mainInputValue'); handleClose();
                            }
                        }
                    >Send</Button>
                </div>
            </MessageMediaFooter>
        </MessageMediaModalWrapper>
    )
}

export default connect(state => ({
        chats: state.chats
    }),
    {
        deleteMedia: actionDeleteDropMedia, 
        onload: actionSetDropMedia, 
        sendMessage: actionSendMessage,
        setInputValue: actionSetInputMessageValue,
        deleteDraftMessage: actionAddDraftMessage        
    })(MessageMediaModal);