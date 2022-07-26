import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { connect } from "react-redux";
import { actionUpsertUser } from "../../../actions/actionsForUser";
import { UserEditorSubModalsTitle, UserEditorSubModalsWrap, UserEditorSubModalsFooter } from "./UserEditorSubModals.style"

const UserNickEditor = ({nick, handleClose, updateUser}) => {

    const [value, setValue] = useState(nick);

    return(
        <UserEditorSubModalsWrap>
            <UserEditorSubModalsTitle>Edit your nick</UserEditorSubModalsTitle>
            <TextField
                autoFocus
                sx={{width: '100%', mt: '20px'}}
                id="standard-basic" 
                label="Nick" 
                variant="standard"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <UserEditorSubModalsFooter>
                <Button variant="text" onClick={handleClose}>Cancel</Button>
                <Button variant="text" disabled={value ? false : true} onClick={() => {updateUser(null, value, null, null); handleClose()}}>Save</Button>
            </UserEditorSubModalsFooter>
        </UserEditorSubModalsWrap>
    )
}

export default connect(state => ({nick: state?.promise?.aboutMe?.payload?.nick || ''}), {updateUser: actionUpsertUser})(UserNickEditor);