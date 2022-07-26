import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {ChatList} from "../ChatList/ChatList";
import UserMenu from "../Drawer/UserMenu";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AsideWrap, SearchAppBarWrapper, SearchInput } from "./Aside.style";

export const Aside = ({chats}) => {
	const [isOpen, setOpen] = useState(false);
	const [filteredChats, setFilteredChats] = useState([]);
	const [value, setValue] = useState('');
	useEffect(() => {
		setFilteredChats(Object.values(chats).filter((chat) => chat?.title?.toLowerCase().includes(value)));
	}, [value, chats]);
	
	return (
		<AsideWrap>
			<SearchAppBarWrapper>
				<IconButton
					onClick={() => setOpen(true)}
					size="medium"
					edge="start"
					aria-label="open drawer"
					sx={{ m: '0 7px' }}
					>
					<MenuIcon style={{color: '#b4b4b4'}}/>
					</IconButton>
				<SearchInput placeholder='Search' value={value} onChange={e => setValue(e.target.value)}></SearchInput>
			</SearchAppBarWrapper>
			<ChatList chats={filteredChats} clearInput={() => setValue('')}/>
			<UserMenu open={isOpen} closeUserMenu={() => setOpen(false)}/>
		</AsideWrap>
	)
}

export default connect(state => ({chats: state?.chats || {} }))(Aside);