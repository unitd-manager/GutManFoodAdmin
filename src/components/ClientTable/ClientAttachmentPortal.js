import React, { useState } from 'react';
import {
  Row,
  Form,
  Col,
  FormGroup,
  Button, 
} from 'reactstrap';
import * as Icon from 'react-feather';
import AttachmentModalV2 from '../Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../ProjectModal/ViewFileComponentV2';

const ClientAttachmentPortal = ({ ClientId }) => {
    ClientAttachmentPortal.propTypes = {
    ClientId: ClientId.any
  };
  
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [update, setUpdate] = useState(false);
  // Attachment
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  return (
    <Form>
    <FormGroup>
        <Row>
          <Col xs="12" md="3" className="mb-3">
            <Button
              className="shadow-none"
              color="primary"
              onClick={() => {
                setRoomName('Clinet');
                setFileTypes(['JPG','JPEG', 'PNG', 'GIF', 'PDF']);
                dataForAttachment();
                setAttachmentModal(true);
              }}
            >
              <Icon.File className="rounded-circle" width="20" />
            </Button>
          </Col>
        </Row>
        <AttachmentModalV2
          moduleId={ClientId}
          attachmentModal={attachmentModal}
          setAttachmentModal={setAttachmentModal}
          roomName={RoomName}
          fileTypes={fileTypes}
          altTagData="ClientRelated Data"
          desc="ClientRelated Data"
          recordType="RelatedPicture"
          mediaType={attachmentData.modelType}
          update={update}
          setUpdate={setUpdate}
        />
        <ViewFileComponentV2 moduleId={ClientId} roomName="Clinet" recordType="RelatedPicture" update={update}
          setUpdate={setUpdate}/>
    </FormGroup>
  </Form>  
  );
}
export default ClientAttachmentPortal;