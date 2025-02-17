import React, { useState } from 'react';
import { Row, Col, Button, NavLink, TabPane, Nav, NavItem,TabContent } from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import ComponentCard from '../ComponentCard';
import AttachmentModalV2 from '../tender/AttachmentModalV2';
import ViewFileComponentV2 from '../ProjectModal/ViewFileComponentV2';

export default function ContentDetailsComp({
  activeTab,
  id,
  dataForAttachment,
  dataForPicture,
  toggle,
  pictureData,
  attachmentData,
  setAttachmentModal,
  attachmentModal,
  description,
  setDescription,
  handleDataEditor,
}) {
  ContentDetailsComp.propTypes = {
    activeTab: PropTypes.any,// 1
    dataForAttachment: PropTypes.func,// fun
    dataForPicture: PropTypes.func, //fun
    toggle: PropTypes.any,//tab => { if (activeTab !== tab) setActiveTab(tab); }
    pictureData: PropTypes.object,//obj
    attachmentData: PropTypes.object,//obj
    setAttachmentModal: PropTypes.func,
    attachmentModal: PropTypes.bool, //false
    description: PropTypes.any, //obj
    id: PropTypes.any,
    handleDataEditor: PropTypes.func, // not show
    setDescription: PropTypes.func, //undefined
  };

  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  return (
    <div>
      <ComponentCard>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Description
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Picture
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Attachments
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
        {/* Description form */}
        <TabPane tabId="1">
          <ComponentCard title="Description">
            <Editor
              editorState={description}
              wrapperClassName="demo-wrapper mb-0"
              editorClassName="demo-editor border mb-4 edi-height"
              onEditorStateChange={(e) => {
                handleDataEditor(e, 'description');
                setDescription(e);
              }}
            />
          </ComponentCard>
        </TabPane>

        {/* attachments */}
        <TabPane tabId="2">
          <ComponentCard title="Picture">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('ContentPic');
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
              roomName={RoomName}
              fileTypes={fileTypes}
              altTagData="Content Data"
              desc="Content Data"
              recordType="Picture"
              mediaType={pictureData.modelType}
            />
            <ViewFileComponentV2 moduleId={id} roomName="ContentPic" recordType="Picture" />
          </ComponentCard>
        </TabPane>
        {/* ADD NODE */}
        <TabPane tabId="3">
          <ComponentCard title="Attachments">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('ContentAttachment');
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
              roomName={RoomName}
              fileTypes={fileTypes}
              altTagData="ContentRelated Data"
              desc="ContentRelated Data"
              recordType="RelatedPicture"
              mediaType={attachmentData.modelType}
            />
            <ViewFileComponentV2
              moduleId={id}
              roomName="ContentAttachment"
              recordType="RelatedPicture"
            />
          </ComponentCard>
        </TabPane>
        </TabContent>
      </ComponentCard>
    </div>
  );
}
