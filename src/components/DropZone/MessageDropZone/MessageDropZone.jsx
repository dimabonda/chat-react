import {useDropzone} from 'react-dropzone';
import {useEffect} from 'react';
import DropIcon from './icons8-dropIcon.png';
import { connect } from 'react-redux';
import { addUploadDate } from '../../../helpers/addUploadDate';
import { actionOpenModal } from '../../../actions/actionsForModal';
import { actionSetDropMedia } from '../../../actions/actionsForChats';

function MessageDropZone({onLoad, openModal, url, chatId }) {

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
      noDrag: true, 
      multiple: true,
    });
    useEffect(()=>{
        acceptedFiles[0] && openModal('messageMediaModal');
        let files = addUploadDate(acceptedFiles)
        acceptedFiles[0] && onLoad(chatId, files)
    }, [acceptedFiles])

    return (
      <section className="container" >
          <div style={{height: '24px'}}
           {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <img style={{
                cursor: 'pointer',
                height: '24px'
            }} src={DropIcon}/>
          </div>
      </section>
    );
  }

export default connect(null , {openModal: actionOpenModal, onLoad: actionSetDropMedia})(MessageDropZone)