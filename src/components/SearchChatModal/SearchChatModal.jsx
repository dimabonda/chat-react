import { Button, Divider } from "@mui/material"
import { SearchChatHeader, 
        SearchChatInput, 
        SearchChatInputWrapper, 
        SearchChatListWrapper, 
        SearchChatWrap } from "./SearchChatModal.style";
import SearchIcon from "../SearchUserInput/search_icon.svg";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SearchChatListItem } from "../SearchChatListItem/SearchChatListItem";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { actionAddDraftMessage } from "../../actions/actionsForChats";

const SearchChatModal = ({handleClose, chats, forwardedMessage, addForwardedMessageToChat}) => {

    const [value, setValue] = useState('');
    const [chatsArr, setChatsArr] = useState([]);
    useEffect(() => {
        setChatsArr(Object.values(chats).filter((chat) => chat?.title?.toLowerCase().includes(value)));
    }, [value]);

    return (
        <SearchChatWrap>
            <SearchChatHeader>Choose chat</SearchChatHeader>
            <SearchChatInputWrapper>
                <img src={SearchIcon}/>
                <SearchChatInput placeholder='Search' value={value} onChange={(e) => setValue(e.target.value)}/>
            </SearchChatInputWrapper>
            <Divider sx={{mb: '8px'}}/>
            <SearchChatListWrapper>
                <SimpleBar style={{ maxHeight: '100%'}}>
                    {chatsArr.map((chat) => <SearchChatListItem key={chat?._id} handleClose={handleClose} chat={chat} addForwardedMessageToChat={addForwardedMessageToChat} forwardedMessage={forwardedMessage}/>)}
                </SimpleBar>
            </SearchChatListWrapper>
            <Divider/>
            <div style={{display: "flex",
    				padding: "10px 15px",
    				justifyContent: "right",
    				alignItems: "center"}}>
                <Button variant="text" onClick={handleClose} >Cancel</Button>
            </div>   
        </SearchChatWrap>
    )
}

export default connect(state => ({chats: state?.chats || {}, forwardedMessage: state?.modal?.draft?.forwardedMessage}), {addForwardedMessageToChat: actionAddDraftMessage})(SearchChatModal)