import { useReactMediaRecorder } from "react-media-recorder";
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { memo, useEffect, useState } from "react";

const RecordViewAudio = ({chatId, sendMessage}) => {
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl,  } =
    useReactMediaRecorder({ audio: true, 
      onStart: () => console.log('start'), 
      onStop: (_,media) => { sendMessage(null, chatId, null, [media] , null, null); clearBlobUrl()} 
    });
  return (
    <div style={{paddingRight: '20px', cursor: 'pointer'}}>
      	<SettingsVoiceIcon
       				color={status === "recording" ? "primary" : "disabled"}
					onMouseDown={startRecording} 
					onMouseUp={stopRecording}/>
    </div>
  );
};


export const MemoRecordViewAudio = memo(RecordViewAudio)