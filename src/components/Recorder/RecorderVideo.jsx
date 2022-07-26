import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import { useReactMediaRecorder } from "react-media-recorder";
import { memo, useEffect, useState } from "react";

const RecordViewVideo = ({chatId, sendMessage}) => {
    const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl,  } =
      useReactMediaRecorder({ video: true, 
        blobPropertyBag: {type: 'video/mp4'},
        onStart: () => console.log('start'), 
        onStop: (_,media) => { sendMessage(null, chatId, null, [media] , null, null); clearBlobUrl()} 
        
      });
    return (
      <div style={{paddingRight: '20px'}}>
            <VideocamRoundedIcon 
                        color={status === "recording" ? "primary" : "disabled"}
                        onMouseDown={startRecording} 
                        onMouseUp={stopRecording}/> 
      </div>
    );
  };
  
  
  export const MemoRecordViewVideo = memo(RecordViewVideo)