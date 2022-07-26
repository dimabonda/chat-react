import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';   
import Backdrop from '@mui/material/Backdrop';
import { connect } from "react-redux";
import ChatInfoModal from "../ChatInfoModal/ChatInfoModal";
import ChatEditorModal  from "../ChatEditorModal/ChatEditorModal";
import UserEditorModal  from "../UserEditorModal/UserEditorModal";
import MessageMediaModal from "../MessageMediaModal/MessageMediaModal";
import { history } from "../../App";
import  SearchChatModal  from "../SearchChatModal/SearchChatModal";
import MessageEditorMediaModal from "../MessageEditorMediaModal/MessageEditorMediaModal";
import SearchUserModal from "../SearchUserModal/SearchUserModal";
import ChatCreatorModal from '../ChatCreator/ChatCreator';
import { actionIsOpen } from '../../actions/actionsForModal';

const ModalComponent = ({modal, setOpen}) => {
    const [,route, histId] = history.location.pathname.split('/');
    const open = modal?.isOpen || false;
    const handleClose = () => setOpen(false);
    
    const modalMap = {
        chatCreatorModal: <ChatCreatorModal handleClose={handleClose}/>,
        chatInfoModal: <ChatInfoModal handleClose={handleClose}/>, 
        chatEditorModal: <ChatEditorModal handleClose={handleClose}/>,
        userEditorModal: <UserEditorModal handleClose={handleClose}/>, 
        messageMediaModal: <MessageMediaModal chatId={histId} open={open} handleClose={handleClose}/>,
        searchChatModal: <SearchChatModal handleClose={handleClose}/>,
        messageEditorMediaModal: <MessageEditorMediaModal chatId={histId} open={open} handleClose={handleClose}/>,
        searchUserModal: <SearchUserModal chatId={histId} handleClose={handleClose}/>
    }

	return (
        <Modal 
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            disableAutoFocus
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
            >
                <Fade in={open}>
                    <Box className='ModalBox'>
                        {modalMap[modal.content]}
                    </Box>
                </Fade>
        </Modal>
	)
}

export const CModalComponent = connect(state => ({modal: state?.modal || {} }), {setOpen: actionIsOpen})(ModalComponent)