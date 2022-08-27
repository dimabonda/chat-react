import { connect } from "react-redux"
import  Message  from "../Message/Message"
import { DropContainer, MessagesAreaWrapper, ScrollBottom, SimpleBarWrapper } from "./MessagesArea.style"
import 'simplebar/dist/simplebar.min.css';
import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
import shortid from 'shortid';
import { MessageGroup } from "../MessageGroup/MessageGroup";

import InfiniteScroll from 'react-infinite-scroll-component';

const MessagesArea = ({currUser, chats, chatId, getMessages, openModal, onLoad}) => {
	const [isVisible, setIsVisible] = useState(true);
	
	const mess = chats[chatId]?.messages || [[]];
	// const mess = messages.reduce((p,c)=>{
	// 	console.log(p)
	// 	const lastArray = p[p.length - 1];
	// 	const lastMessageOfLastArray = p[p.length-1][p[p.length-1].length - 1 ];
	//   if( lastMessageOfLastArray?.createdAt - c.createdAt > 600000 
	// 		|| (lastMessageOfLastArray?.createdAt ? convert(lastMessageOfLastArray?.createdAt).getDateMonthName() !== convert(c.createdAt).getDateMonthName() : false )
	// 		|| (lastMessageOfLastArray?.owner ? lastMessageOfLastArray?.owner?._id !== c?.owner?._id : false)  ){
	// 	p.push([]);
	//   }
	  
	//   lastArray.push(c);
	//   return p;
	// }, [[]]);

	///.contentWrapperEl
	// function scrollBottom (){
	// 	const scrollElem = refElem.current.contentWrapperEl;
	// 	if(Math.abs(scrollElem.scrollTop) > OFFSET){
	// 		setIsVisible(true)
	// 	} else {setIsVisible(false)}
	// }

	const OFFSET = 600;
	
	const refElem = useRef();

	// const infinityScroll = async() => {
	// 	const scrollElem = refElem.current;
		
	// 	const scrollOffset = scrollElem.scrollHeight - (scrollElem.clientHeight - scrollElem.scrollTop); 
	// 	console.log(scrollOffset)
	// 	if(scrollOffset < OFFSET ){
	// 		console.log('from if' , scrollOffset)
	// 		let messages = await getMessages(chatId);
	// 	}
	// }

	useEffect(() => {
		// const scrollElem = refElem.current;
		// const scrollOffset = scrollElem.scrollHeight - (scrollElem.clientHeight - scrollElem.scrollTop);
	// 	console.log(scrollOffset)
	// 	if(scrollOffset < OFFSET){
		refElem.current?.scrollTo(0, 0)
		// 	console.log('from effect' , chatId)
		getMessages(chatId, true)
			
	// 	}
		// scrollElem?.addEventListener("scroll", infinityScroll);
	// 	scrollElem?.addEventListener("scroll", scrollBottom);
		// return () => {
		// 	console.log('remove')
		// 	// refElem?.current?.removeEventListener("scroll", infinityScroll);
		// 	// refElem?.current?.contentWrapperEl.removeEventListener("scroll", scrollBottom);
		// };
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
				<MessagesAreaWrapper id="scrollableDiv" ref={refElem}>
					<InfiniteScroll
						next={() => getMessages(chatId)}
						// pageStart={0}
						scrollableTarget="scrollableDiv"
						dataLength={mess.reduce((currentCount, array) => currentCount + array.length, 0)}
						// dataLength={mess.length}
						style={{ display: 'flex', flexDirection: 'column-reverse', overflow: 'none'}}
						inverse={true} //
						scrollThreshold="600px"
    					hasMore={true}
					>
					<div style={{height: '20px', fontSize: '6px', opacity: '0'}}>1</div>
					{mess[0]?.length > 0 && mess.map((item, i, arr) => <MessageGroup key={i} messages={item} chatId={chatId} currUser={currUser}/>
						// <div key={i}>
						 	//  {/* <MessagesDate visible={
						 	// 	convert(item[item.length-1]?.createdAt).getDateMonthName() !== convert(arr[i + 1]?.[0]?.createdAt).getDateMonthName() ? true : false
						 	// } timestamp={item[item.length-1]?.createdAt}/>   */}
							
						//   </div>
						 )} 
					</InfiniteScroll>
					{/* <ScrollBottom isVisible={isVisible}><img style={{width: '50px', height: '50px'}} onClick={() => refElem.current.contentWrapperEl.scrollTop = 0} src={ScrollBtn}/></ScrollBottom> */}
					{/* <SimpleBarWrapper >  */}
						{/* {messagesByChat.map((mes, i) => <Message key={mes._id} lastElem={i == 0 ? false : true} currUser={currUser} chatId={chatId} mes={mes}/>)} */}
					
					{/* </SimpleBarWrapper>  */}
				</MessagesAreaWrapper>
      		</DropContainer>
	)
}

export default connect(state=>({chats: state.chats || {}, currUser: state.auth?.payload?.sub?.id}), {getMessages : actionGetMessageForChat, openModal: actionOpenModal, onLoad: actionSetDropMedia})(memo(MessagesArea))