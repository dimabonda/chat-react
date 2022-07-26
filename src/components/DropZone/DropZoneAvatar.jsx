import {useDropzone} from 'react-dropzone';
import { useEffect} from 'react';
import { connect } from 'react-redux';
import { Avatar } from '@mui/material';
import { backendURL } from '../../helpers/gql';
import { actionSetUserAvatar } from '../../actions/actionsMedia';
import Camera from './icons8_camera.png';
import { Drop } from '../ChatInfoModal/ChatInfoModal.style';
import { AvatarWrap, AvatarOverlay } from './DropZoneAvatar.style';
import { BadgeComponent } from '../UserEditorModal/UserEditorModal.style';
import Photo from "../UserEditorModal/icons8photo.png";

const DropAvatarComponent = ({url}) => {
  return(
    <AvatarWrap>
      <Avatar
        src={url}
        sx={{width: "75px", height: "75px"}}
      /> 
      <AvatarOverlay>
        <img src={Camera}/>
      </AvatarOverlay>
    </AvatarWrap>
  )
}

const DropAvatarPopupComponent = () => {
  return(
    <div style={{
      width: "100%",
      height: "30px",
      backgroundColor: "grey",
      opacity: "0.5",
      display: "flex",
      justifyContent: "center",
      alignItem: "center", 
      cursor: "pointer"
    }}>
      <img style={{height: "26px"}} src={Camera}/>
    </div>
  )
}

export default function DropZoneAvatar({onLoad, component, url }) {
    const dropMap = {
      dropAvatarComponent: <DropAvatarComponent url={url}/>,
      dropAvatarPopupComponent: <DropAvatarPopupComponent/>,
      dropAvatarBadge: <BadgeComponent><img src={Photo}/></BadgeComponent>
    }

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
      noDrag: true, 
      multiple: false,
      accept: 'image/*'
    });
    
    useEffect(()=>{
        acceptedFiles[0] && onLoad(acceptedFiles[0])
    }, [acceptedFiles])

    return (
      <section className="container" >
          <div 
           {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            {dropMap[component]}
          </div>
      </section>
    );
  }
  

  