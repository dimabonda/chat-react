import { Avatar, Divider, Drawer, List } from '@mui/material';
import { connect } from 'react-redux';
import { backendURL } from '../../helpers/gql';
import React from 'react';
import { actionLogout } from '../../actions/actionLogin';
import { ListItemWrap, StyledSpan, UserMenuHeader, UserMenuTitle } from './UserMenu.style';
import ChatIcon from "./icons8-chat.png";
import Exit from "../ChatInfoOptions/icons8_exit.png";
import EditIcon from '@mui/icons-material/Edit';
import { actionOpenModal } from '../../actions/actionsForModal';

const UserMenu = ({open, setOpen, closeUserMenu, userInfo: {nick, avatar}, logout }) => {
	
	return (
		<Drawer 
			anchor='left'
			open={open}
			onClose={closeUserMenu}
		>
			<div style={{width: "300px"}}> 
				<UserMenuHeader>
					<Avatar
						src={`${backendURL}/${avatar?.url || ''}`}
						alt={nick}
						sx={{width: 60, height: 60}}
					/>
					<UserMenuTitle>
						{nick}
					</UserMenuTitle>
				</UserMenuHeader>
				<Divider/>
				<List>
					<ListItemWrap onClick={() => {setOpen('chatCreatorModal'); closeUserMenu()}}>
						<img src={ChatIcon} alt="chatIcon" style={{height: "22px"}}/> <StyledSpan>New chat</StyledSpan>
					</ListItemWrap>
					<ListItemWrap onClick={() => {setOpen('userEditorModal'); closeUserMenu()}}>
						<EditIcon/> <StyledSpan>Edit profile</StyledSpan>
					</ListItemWrap>
					<ListItemWrap onClick={() => logout()}>
						<img src={Exit} alt="chatIcon" style={{height: "22px"}}/> <StyledSpan>Log out</StyledSpan>
					</ListItemWrap>
				</List>
			</div> 
		</Drawer>
	)
}

export default connect(state => ({userInfo: state.promise?.aboutMe?.payload || {}}), {setOpen : actionOpenModal, logout: actionLogout})(UserMenu)