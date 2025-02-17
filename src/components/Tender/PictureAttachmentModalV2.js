import React,{useState} from 'react'
import { FormGroup,Button,Modal,ModalHeader,ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'
import { FileUploader } from "react-drag-drop-files";
import api from '../../constants/api';
import message from '../Message';

const PictureAttachmentModalV2 = ({attachmentModal,setAttachmentModal,moduleId,roomName,altTagData, desc}) => {

    PictureAttachmentModalV2.propTypes = {
        attachmentModal: PropTypes.bool,
        setAttachmentModal: PropTypes.func,
        moduleId:PropTypes.string,
        roomName:PropTypes.string,
        altTagData:PropTypes.string,
        desc:PropTypes.string,
      }



        const fileTypes = ["JPG", "PNG", "GIF"];
        const [file, setFile] = useState([]);
        const [ handleValue, setHandleValue ] = useState()
       
        const handleChange = (fiels) => {
          
            const arrayOfObj = Object.entries(fiels).map((e) => ( e[1]  ));

            setFile(fiels);
            setHandleValue(arrayOfObj);
            console.log(fiels)
        };


        const uploadFile = () =>{
            
            if(file){

               // getFiles();
            
          
                const data = new FormData() 
                const arrayOfObj = Object.entries(file).map((e) => (  e[1] ));

                arrayOfObj.forEach((ele) => {
                    console.log(ele)
                    data.append(`files`, ele);
                  });
                //data.append('file', file)
                data.append('record_id', moduleId)
                data.append('room_name', roomName)
                data.append('alt_tag_data', altTagData)
                data.append('description', desc)

                api.post('/file/uploadFiles',data).then(()=>{

                    setAttachmentModal(false)
                    message('Files Uploaded Successfully','success')
                    
                    setTimeout(() => {
                        window.location.reload()
                    }, 400);
                }).catch(()=>{
                    setAttachmentModal(false)
                    message('Unable to upload File','error')
                    // setTimeout(() => {
                    //     window.location.reload()
                    // }, 400);
                })
            }else{
                message('No files selected','info')
            }
        }
        
  return (

    
    <div>
        
        <Modal isOpen={attachmentModal} >
            <ModalHeader>Upload Media</ModalHeader>
            <ModalBody>
                <FormGroup>
                  
                    <FileUploader
                        multiple
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                    />

                    {handleValue ? (
                        handleValue.map((e) => (
                        <div>
                            <span> Name: {e.name} </span>
                        </div>
                        ))
                    ) : (
                        <span>No file selected</span>
                    )}

                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" className='shadow-none' onClick={()=>{
                    uploadFile()
                }}>Upload</Button>
                <Button color="secondary" className='shadow-none' onClick={()=>{ setAttachmentModal(false) }}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </div>
  )
}

export default PictureAttachmentModalV2