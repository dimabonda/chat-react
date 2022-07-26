import { Button } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { actionUpsertChat } from "../../actions/actionsForChats";
import { SearchUserForChat } from "../SearchUserForChat/SearchUserForChat";

const SearchUserModal = ({chatId, handleClose, updateChat, chats}) => {
    const [users, setUsers] = useState();
    const currMembers = chats[chatId]?.members?.map(item => {
        let {_id} = item; 
        return {_id}
    });

    return(
        <>
            <SearchUserForChat getUsers={setUsers} members={currMembers}/>
            <div style={{display: "flex",
                        padding: "10px 15px",
                        justifyContent: "right",
                        alignItems: "center"}}>
                <Button variant="text" onClick={handleClose} >Cancel</Button>
                <Button variant="text" onClick={() => {updateChat(chatId, null, users); handleClose()}}>Add</Button>
            </div> 
        </>
    )
}

export default connect(state => ({chats: state?.chats || []}), {updateChat: actionUpsertChat})(SearchUserModal)