import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import { actionChangeFile, actionDeleteOneMediaFile } from "../../actions/actionsForChats";
import { addUploadDate } from "../../helpers/addUploadDate";
import { DropMediaFilesOptionsWrap } from "./DropMediaFilesOptions.style"
import ArrowsIcon from './icons8-arrows.png';
import Basket from './icons8_basket.svg';

const DropMediaFilesOptions = ({deleteFile, mediaKey, changeFile, chatId}) => {

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        noDrag: true, 
        multiple: false
    });

    useEffect(()=>{
        let files = addUploadDate(acceptedFiles)
        acceptedFiles[0] && changeFile(chatId, files, mediaKey)
    }, [acceptedFiles])

    return (
        <DropMediaFilesOptionsWrap>
                <div style={{height: '19px'}}
                {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                    <img src={ArrowsIcon}/>
                </div>
            <img src={Basket} onClick={() => deleteFile(chatId, mediaKey)}/>
        </DropMediaFilesOptionsWrap>
    )
}

export default connect(null, {deleteFile: actionDeleteOneMediaFile, changeFile: actionChangeFile})(DropMediaFilesOptions)