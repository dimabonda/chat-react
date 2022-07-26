import { connect } from "react-redux"
import  Message  from "../Message/Message"
import { DropContainer, MessageGroup, MessagesAreaWrapper, ScrollBottom, SimpleBarWrapper } from "./MessagesArea.style"
import 'simplebar/dist/simplebar.min.css';
import { memo, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { addUploadDate } from "../../helpers/addUploadDate";
import { convert } from "../Time/Time";
import  MessagesDate  from "../MessageDate/MessagesDate";
import { Avatar } from "@mui/material";
import { backendURL } from "../../helpers/gql";
import ScrollBtn from './icons8-scrollBottom.png';
import { actionGetMessageForChat } from "../../actions/actionsMessages";
import { actionOpenModal } from "../../actions/actionsForModal";
import { actionSetDropMedia } from "../../actions/actionsForChats";

const MessagesArea = ({currUser, chats, chatId, getMessages, openModal, onLoad}) => {
	const [isVisible, setIsVisible] = useState(false);
	const messagesByChat = Object.values(chats[chatId]?.messages || []);
	const mess = messagesByChat.reduce((p,c)=>{
	  if( p[p.length-1][p[p.length-1].length - 1 ]?.createdAt - c.createdAt > 600000 
			||   (p[p.length-1][p[p.length-1].length - 1 ]?.createdAt ? convert(p[p.length-1][p[p.length-1].length - 1 ]?.createdAt).getDateMonthName() !== convert(c.createdAt).getDateMonthName() : false )
			|| (p[p.length-1][p[p.length-1].length - 1 ]?.owner ? p[p.length-1][p[p.length-1].length - 1 ]?.owner?._id !== c?.owner?._id : false)  ){
		p.push([]);
	  }
	  
	  p[p.length-1].push(c);
	  return p;
	}, [[]]);
	const OFFSET = 600;
	
	const ref = useRef();
	
	let timer
	function infinityScroll () {
		clearTimeout(timer);
		timer = setTimeout(async() => {
			const scrollElem = ref.current?.contentWrapperEl;
			if(scrollElem.scrollHeight - (scrollElem.clientHeight - scrollElem.scrollTop)  < OFFSET){
				let data = await getMessages(chatId);
				console.log(data)
				if (data?.length < 20) ref.current?.contentWrapperEl.removeEventListener("scroll", infinityScroll);
			}
		},30)
	}
	function scrollBottom (){
		const scrollElem = ref.current?.contentWrapperEl;
		if(Math.abs(scrollElem.scrollTop) > OFFSET){
			setIsVisible(true)
		} else {setIsVisible(false)}
	}

	useEffect(() => {
		ref.current?.contentWrapperEl.addEventListener("scroll", infinityScroll);
		ref.current?.contentWrapperEl.addEventListener("scroll", scrollBottom);
		return () => {
			ref.current.contentWrapperEl.scrollTop = 0;
			ref?.current?.contentWrapperEl?.removeEventListener("scroll", infinityScroll);
			ref?.current?.contentWrapperEl?.removeEventListener("scroll", scrollBottom);
		};
	  }, [chatId]);

	  const {
		getRootProps,
		getInputProps,
		isFocused,
		isDragAccept,
		isDragReject, 
		acceptedFiles
	  } = useDropzone({
		  noClick: true,
		  multiple: true
	  });

	  useEffect(()=>{
        acceptedFiles[0] && openModal('messageMediaModal');
        let files = addUploadDate(acceptedFiles)
        acceptedFiles[0] && onLoad(chatId, files)
    }, [acceptedFiles])

	return (
			<DropContainer {...getRootProps({ isDragAccept, isFocused})}>
				<div className="drop">drop files here</div>
        		<input {...getInputProps()} />
				<MessagesAreaWrapper >
					<ScrollBottom isVisible={isVisible}><img style={{width: '50px', height: '50px'}} onClick={() => ref.current.contentWrapperEl.scrollTop = 0} src={ScrollBtn}/></ScrollBottom>
					<SimpleBarWrapper  ref={ref}> 
					<div style={{height: '20px', fontSize: '6px', opacity: '0'}}>1</div>
					{mess[0].length > 0 && mess.map((item, i, arr) => 
						<div key={i}>
							<MessagesDate visible={
								convert(item[item.length-1]?.createdAt).getDateMonthName() !== convert(arr[i + 1]?.[0]?.createdAt).getDateMonthName() ? true : false
							} timestamp={item[item.length-1]?.createdAt}/> 
							<MessageGroup>
								<div style={{display: 'flex', flexDirection: 'column-reverse', position: "relative"}}>
									<Avatar
										alt={item[0]?.nick || item[0]?.login ||  'avatar'}
										src={`${backendURL}/${item[0]?.owner?.avatar?.url || ''}`}
										sx={{ width: 45, height: 45, mr: '20px', position: 'sticky', bottom: 0, marginBottom: '5px'}}
									/>
								</div>
								<div style={{display: 'flex', flexDirection: 'column-reverse'}}>
									{item.map((mes, i, arr) => <Message key={mes._id} lastElem={i == 0 ? false : true} currUser={currUser} chatId={chatId} mes={mes}/> )}
								</div>
							</MessageGroup>
						</div>
						)}
					</SimpleBarWrapper>
				</MessagesAreaWrapper>
      		</DropContainer>
	)
}

export default connect(state=>({chats: state.chats || {}, currUser: state.auth?.payload?.sub?.id}), {getMessages : actionGetMessageForChat, openModal: actionOpenModal, onLoad: actionSetDropMedia})(memo(MessagesArea))