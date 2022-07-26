import React, { memo, useEffect, useState } from "react";
import { backendURL } from "../../helpers/gql";
import DropMediaFilesOptions from "../DropMediaFilesOptions/DropMediaFilesOptions";
import { calculateFileSize } from "../../helpers/calculateFileSize";
import { DropImg, DropVideo, DropAudio, DropFile } from "./DropMediaFiles/DropMediaFiles";
import { DropMediaItemWrap } from "./DropMediaItem.style"

export const DropMediaItem = ({mediaItem, chatId}) => {
    
    const [url, setUrl] = useState('')
    const [name, setName] = useState('');
    const [size, setSize] = useState('')

    useEffect(() => {
        setUrl(mediaItem.url ? `${backendURL}/${mediaItem.url || ''}` : URL.createObjectURL(mediaItem))
        setName((mediaItem?.name?.length || mediaItem?.originalFileName?.length) > 22 ? 
                (mediaItem?.name || mediaItem?.originalFileName).slice(0,10)  + '...' + (mediaItem?.name || mediaItem?.originalFileName).slice(-10) : 
                (mediaItem?.name || mediaItem?.originalFileName))
        setSize(calculateFileSize(mediaItem?.size))
    },[])

    const checkType = (type) => {
        if(type.includes("image")){
            return <DropImg url={url} />
        } else if(type.includes("video")){
            return <DropVideo url={url}/> 
        } else if (type.includes("audio")){
            return <DropAudio url={url} name={name} size={size}/>
        } else {
            return <DropFile name={name} url={url} size={size}/>
        }
    }
    
    return(
        <DropMediaItemWrap>
            {checkType(mediaItem?.type)}
            <DropMediaFilesOptions chatId={chatId} mediaKey={mediaItem.uploadDate}/>
        </DropMediaItemWrap>
    )
}

export const MemoizedDropMediaItem = memo(DropMediaItem);