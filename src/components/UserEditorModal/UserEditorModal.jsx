import { BadgeComponent, Child, ModalChildContent, UserEditorAvatar, UserEditorHeader, UserEditorList, UserEditorListItem, UserEditorMain, UserEditorModalWrapper, UserEditorName, UserEditorTitle } from "./UserEditorModal.style";
import CloseIcon from "../ChatInfoModal/icons8-close.svg";
import { Avatar, Badge, IconButton, Modal } from "@mui/material";
import { connect } from "react-redux";
import { backendURL } from "../../helpers/gql";
import PasswordIcon from "./icons8_password.png";
import LoginIcon from "./icons8_userlogin.png";
import NickIcon from "./icons8_usernick.png";
import { Divider } from "../ChatInfoModal/ChatInfoModal.style";
import DropZoneAvatar from "../DropZone/DropZoneAvatar";
import { actionSetUserAvatar } from "../../actions/actionsMedia";
import { useState } from "react";
import UserNickEditor from "./UserEditorSubModals/UserNickEditor";
import UserLoginEditor from "./UserEditorSubModals/UserLoginEditor";
import UserPasswordEditor from "./UserEditorSubModals/UserPasswordEditor";

const CDropZoneAvatarForUser = connect(null, {onLoad: actionSetUserAvatar})(DropZoneAvatar)

const UserEditorModal = ({user, handleClose}) => {

    const [isOpen, setOpen] = useState(false);
    const [subModalContent, setSubModalContent] = useState();
    const handleCloseChildModal = () => setOpen(false);

    const modalMap = {
        userNickEditor: <UserNickEditor handleClose={handleCloseChildModal}/>, 
        userLoginEditor: <UserLoginEditor handleClose={handleCloseChildModal}/>, 
        userPasswordEditor: <UserPasswordEditor handleClose={handleCloseChildModal} />
    }

    return(
        <UserEditorModalWrapper>
            
            <UserEditorHeader>
                <UserEditorTitle>User Info</UserEditorTitle>
                <IconButton onClick={handleClose}>
                    <img style={{cursor: 'pointer'}} src={CloseIcon}/>
                </IconButton>
            </UserEditorHeader>

            <UserEditorMain>
                <UserEditorAvatar>
                    <Badge
                        sx={{margin: "0 20px"}}
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        // invisible={!invisible}
                        badgeContent={
                            <CDropZoneAvatarForUser component={"dropAvatarBadge"}/>
                        }
                    >
                            <Avatar
                                alt={user?.nick}
                                src={`${backendURL}/${user?.avatar?.url || ''}`}
                                sx={{ width: 100, height: 100}}        
                            />
                    </Badge>
                </UserEditorAvatar>
                <UserEditorName>{user?.nick || ''}</UserEditorName>
            </UserEditorMain>

            <Divider/>

            <UserEditorList>
                <UserEditorListItem onClick={() => {setOpen(true); setSubModalContent('userNickEditor')} }>
                    <img src={NickIcon}/>Nick
                </UserEditorListItem>
                <UserEditorListItem onClick={() => {setOpen(true); setSubModalContent('userLoginEditor')} }>
                    <img src={LoginIcon}/>Login
                </UserEditorListItem>
                <UserEditorListItem onClick={() => {setOpen(true); setSubModalContent('userPasswordEditor')} }>
                    <img src={PasswordIcon}/>Password
                </UserEditorListItem>
            </UserEditorList>

            <Modal
                open={isOpen}
                onClose={handleCloseChildModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <ModalChildContent>
                    {modalMap[subModalContent]}
                </ModalChildContent>
            </Modal>

        </UserEditorModalWrapper>
    )
}

export default connect(state => ({user: state?.promise?.aboutMe?.payload }))(UserEditorModal);