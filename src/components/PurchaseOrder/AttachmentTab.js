import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import AttachmentModalV2 from '../Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../ProjectModal/ViewFileComponentV2';

function AttachmentTab({
  dataForPicture,
  dataForAttachment,
  setAttachmentModal,
  id,
  update,
  setUpdate,
  attachmentModal,
  pictureData,
  attachmentData,
}) {
  AttachmentTab.propTypes = {
    dataForPicture: PropTypes.any,
    dataForAttachment: PropTypes.any,
    setAttachmentModal: PropTypes.func,
    id: PropTypes.any,
    attachmentModal: PropTypes.bool,
    pictureData: PropTypes.any,
    update: PropTypes.any,
    setUpdate: PropTypes.any,
    attachmentData: PropTypes.any,
  };
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [pictureAttachmentModal, setPictureAttachmentModal] = useState(false);
  return (
    <div>
      <Row>
        <Col md="6">
          <Form>
            <FormGroup>
              <ComponentCard title="Picture">
                <Row>
                  <Col xs="12" md="3" className="mb-3">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        setRoomName('Picture');
                        setFileTypes(['JPG', 'PNG', 'GIF']);
                        dataForPicture();
                        setAttachmentModal(true);
                      }}
                    >
                      <Icon.Image className="rounded-circle" width="20" />
                    </Button>
                  </Col>
                </Row>
                <AttachmentModalV2
                  moduleId={id}
                  attachmentModal={pictureAttachmentModal}
                  setAttachmentModal={setPictureAttachmentModal}
                  roomName={roomName}
                  fileTypes={fileTypes}
                  altTagData="PurchaseOrder Data"
                  desc="PurchaseOrder Data"
                  recordType="Picture"
                  mediaType={pictureData.modelType}
                  update={update}
                  setUpdate={setUpdate}
                />
                <ViewFileComponentV2
                  moduleId={id}
                  roomName="Picture"
                  recordType="Picture"
                  update={update}
                  setUpdate={setUpdate}
                />
              </ComponentCard>
            </FormGroup>
          </Form>
        </Col>
        <Col md="6">
          <Form>
            <FormGroup>
              <ComponentCard title="Attachments">
                <Row>
                  <Col xs="12" md="3" className="mb-3">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        setRoomName('PurchaseOrder');
                        setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                        dataForAttachment();
                        setAttachmentModal(true);
                      }}
                    >
                      <Icon.File className="rounded-circle" width="20" />
                    </Button>
                  </Col>
                </Row>
                <AttachmentModalV2
                  moduleId={id}
                  attachmentModal={attachmentModal}
                  setAttachmentModal={setAttachmentModal}
                  roomName={roomName}
                  fileTypes={fileTypes}
                  altTagData="PurchaseOrderRelated Data"
                  desc="PurchaseOrderRelated Data"
                  recordType="RelatedPicture"
                  mediaType={attachmentData.modelType}
                  update={update}
                  setUpdate={setUpdate}
                />
                <ViewFileComponentV2
                  moduleId={id}
                  roomName="PurchaseOrder"
                  recordType="RelatedPicture"
                  update={update}
                  setUpdate={setUpdate}
                />
              </ComponentCard>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AttachmentTab;
