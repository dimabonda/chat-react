import { memo, useState } from "react";
import MessageOptions from "../MessageOptions/MessageOptions";
import { ReplyMessage } from "../ReplyMessage/ReplyMessage";
import { convert } from "../Time/Time";
import { ForwardedMessageHeader, MessageContainer, MessageFooter, MessageOwner, MessageText, MessageWrapper, TimeMessage } from "./Message.style";
import { MemoMessageMediaContainer } from "../MessageMediaContainer/MessageMediaContainer";
import CircularProgress from '@mui/material/CircularProgress';

const Message = ({mes, chatId, currUser, lastElem}) => {
	const isOwner = currUser === mes?.owner?._id ? true : false;
	const checkedMessage = mes.forwarded ? mes.forwarded : mes; //check message (it has forwarded message or not, if it has return forwarded mes)
	const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null)
    };
	
	return (
			<MessageWrapper >
					<MessageContainer isOwner={isOwner} onContextMenu={(e) => {e.preventDefault(); handleClick(e)}} lastElem={lastElem}>
						{mes.forwarded && <ForwardedMessageHeader owner={isOwner}>{`Forwarded from ${checkedMessage?.owner?.nick || ''}`}</ForwardedMessageHeader>}
						{checkedMessage?.replyTo && <ReplyMessage owner={isOwner} message={checkedMessage.replyTo}/>}
						{checkedMessage?.media && checkedMessage?.media?.length !==0 && <MemoMessageMediaContainer media={checkedMessage.media}/>}
						<MessageText>{checkedMessage?.text?.replace(/ /g, "\u00a0") || ''}</MessageText>
						<MessageFooter>
							<MessageOwner>{isOwner ? 'You' : mes.owner.nick || 'nick'}</MessageOwner>
							{mes?.status ? <CircularProgress size={16}/> : <TimeMessage owner={isOwner}>{convert(mes.createdAt).getTime()}</TimeMessage>}
							
						</MessageFooter>
					</MessageContainer>
					<MessageOptions message={checkedMessage} chatId={chatId} handleClose={handleClose} open={open} anchorEl={anchorEl}/>
			</MessageWrapper>
        )
}

export default memo(Message)