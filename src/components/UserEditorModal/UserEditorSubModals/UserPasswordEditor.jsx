import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { actionCheckPassword } from "../../../actions/actionLogin";
import { actionUpsertUser } from "../../../actions/actionsForUser";
import { UserEditorSubModalsTitle, UserEditorSubModalsWrap, UserEditorSubModalsFooter } from "./UserEditorSubModals.style"

const UserPasswordEditor = ({login, disabled, handleClose, updateUser, checkPassword}) => {

    const [currPassword, setCurrPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    const [errorP, setErrorP] = useState('')
    useEffect(() => {
        checkPassword(login, currPassword);
        
    }, [currPassword])

    useEffect(() => {
        if(errorP === false) {
            handleClose()
            updateUser(null, null, newPassword, null)
        }
    }, [errorP]);

    function validatePassword(p){
        
        let errorsP = [];

        if (p.length < 4 || p.length > 12) {
            errorsP.push("Your password must be at least 4 and no more than 12 characters"); 
        }
        if (!/[a-z]/.test(p)) {
            errorsP.push("Your password must contain at least one letter.");
        }
        if (!/[0-9]/.test(p))  {
            errorsP.push("Your password must contain at least one digit."); 
        }
        if (errorsP.length > 0) {
            setErrorP(errorsP.join('/'))
        } else {
            setErrorP(false)
        }
    }

    return(
        <UserEditorSubModalsWrap>
            <UserEditorSubModalsTitle>Edit your password</UserEditorSubModalsTitle>
            <TextField
                autoFocus
                sx={{width: '100%', mt: '20px'}}
                id="standard-basic" 
                label="Password" 
                variant="standard"
                value={currPassword}
                onChange={(e) => setCurrPassword(e.target.value)}
            />
            <TextField
                autoFocus
                error={!!errorP}
                helperText={errorP}
                sx={{width: '100%', mt: '20px'}}
                id="standard-basic" 
                label="New Password" 
                variant="standard"
                disabled={!disabled}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <UserEditorSubModalsFooter>
                <Button variant="text" onClick={handleClose}>Cancel</Button>
                <Button variant="text" disabled={newPassword ? false : true} onClick={() => {validatePassword(newPassword); }}>Save</Button>
            </UserEditorSubModalsFooter>
        </UserEditorSubModalsWrap>
    )
}

export default connect(state => 
    ({login: state?.promise?.aboutMe?.payload?.login || '', disabled: state?.promise?.checkedPassword?.payload || null}),
    {updateUser: actionUpsertUser, checkPassword: actionCheckPassword})(UserPasswordEditor);