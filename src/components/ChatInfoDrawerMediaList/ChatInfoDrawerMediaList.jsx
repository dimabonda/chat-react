import { connect } from "react-redux"
import { ChatInfoDrawerMediaItem, ChatInfoDrawerMediaListWrapper } from "./ChatInfoDrawerMediaList.style"
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import HeadsetRoundedIcon from '@mui/icons-material/HeadsetRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import { Divider } from "../ChatInfoModal/ChatInfoModal.style";

export const ChatInfoDrawerMediaList = ({chatMedia}) => {

    const media = Object.values(chatMedia || {})
    const audioFiles = media?.filter((item) => item?.type?.includes('audio') && !item?.originalFileName?.includes('record'));
	const photos = media?.filter(({type}) => type?.includes('image'));
	const videos = media?.filter(({type}) => type?.includes('video'));
	const files = media?.filter(({type}) => type?.includes('application'));
    return media.length !== 0  && (
        <ChatInfoDrawerMediaListWrapper>
            <Divider/>
            {photos.length > 0 && <ChatInfoDrawerMediaItem>
                <InsertPhotoOutlinedIcon sx={{mr: '25px'}}/>{photos.length} {photos.length === 1 ? 'photo' : 'photos'}
            </ChatInfoDrawerMediaItem>}

            {videos.length > 0 && <ChatInfoDrawerMediaItem>
                <VideocamRoundedIcon sx={{mr: '25px'}}/>{videos.length} {videos.length === 1 ? 'video' : 'videos'}
            </ChatInfoDrawerMediaItem>}

            {files.length > 0 && <ChatInfoDrawerMediaItem>
                <InsertDriveFileRoundedIcon sx={{mr: '25px'}}/>{files.length} {files.length === 1 ? 'file' : 'files'}
            </ChatInfoDrawerMediaItem>}

            {audioFiles.length > 0 && <ChatInfoDrawerMediaItem>
                <HeadsetRoundedIcon sx={{mr: '25px'}}/>{audioFiles.length} {audioFiles.length === 1 ? 'audio file' : 'audio files'}
            </ChatInfoDrawerMediaItem>}
            
        </ChatInfoDrawerMediaListWrapper>
    )
}

