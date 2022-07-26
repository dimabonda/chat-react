import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { connect } from "react-redux";
import { actionUpsertUser } from "../../../actions/actionsForUser";
import { UserEditorSubModalsTitle, UserEditorSubModalsWrap, UserEditorSubModalsFooter } from "./UserEditorSubModals.style"

const UserLoginEditor = ({login, handleClose, updateUser}) => {

    const [value, setValue] = useState(login);

    return(
        <UserEditorSubModalsWrap>
            <UserEditorSubModalsTitle>Edit your login</UserEditorSubModalsTitle>
            <TextField
                autoFocus
                sx={{width: '100%', mt: '20px'}}
                id="standard-basic" 
                label="Login" 
                variant="standard"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <UserEditorSubModalsFooter>
                <Button variant="text" onClick={handleClose}>Cancel</Button>
                <Button variant="text" disabled={value ? false : true} onClick={() => {updateUser(value, null, null, null); handleClose()}}>Save</Button>
            </UserEditorSubModalsFooter>
        </UserEditorSubModalsWrap>
    )
}

export default connect(state => ({login: state?.promise?.aboutMe?.payload?.login || ''}), {updateUser: actionUpsertUser})(UserLoginEditor);