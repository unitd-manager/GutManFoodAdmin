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
    attachmentData: PropTypes.any,
  };
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  return (
    <div>
      <Row>
        <Col md="6">
          <Form>
            <FormGroup>
              <ComponentCard title="Picture">
                <Row>
                  <Col xs="12" md="6" className="mb-3">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        setRoomName('PurchaseorderPic');
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
                  attachmentModal={attachmentModal}
                  setAttachmentModal={setAttachmentModal}
                  roomName={roomName}
                  fileTypes={fileTypes}
                  altTagData="Product Data"
                  desc="Product Data"
                  recordType="Picture"
                  mediaType={pictureData.modelType}
                />
                <ViewFileComponentV2
                  moduleId={id}
                  roomName="PurchaseorderPic"
                  recordType="Picture"
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
                  <Col xs="12" md="6" className="mb-3">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        setRoomName('PurchaseorderAttachment');
                        setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
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
                  altTagData="ProductRelated Data"
                  desc="ProductRelated Data"
                  recordType="RelatedPicture"
                  mediaType={attachmentData.modelType}
                />
                <ViewFileComponentV2
                  moduleId={id}
                  roomName="PurchaseorderAttachment"
                  recordType="RelatedPicture"
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
