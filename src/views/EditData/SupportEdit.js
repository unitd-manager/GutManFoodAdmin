import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  TabContent,
  TabPane,
  NavItem,
  NavLink,
  Nav,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import * as Icon from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import SupportButton from '../../components/SupportTable/SupportButton';
import ComponentCard from '../../components/ComponentCard';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import message from '../../components/Message';
import api from '../../constants/api';
import AddNote from '../../components/Tender/AddNote';
import ViewNote from '../../components/Tender/ViewNote';
import creationdatetime from '../../constants/creationdatetime';
import SupportState from '../../components/SupportTable/SupportState';

const SupportEdit = () => {
  // All state variables
  const [activeTab, setActiveTab] = useState('1');
  const [supportDetails, setSupportDetails] = useState();
  const [supportName, setSupportName] = useState();
  const [section, setSection] = useState();
  const [staffname, setStaffName] = useState();
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });

  const [description, setDescription] = useState(() => EditorState.createEmpty());
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  //Setting Data in Support Details
  const handleInputs = (e) => {
    setSupportDetails({ ...supportDetails, [e.target.name]: e.target.value });
  };
  //setting data in Description Modal supportDetails
  const handleDataEditor = (e, type) => {
    setSupportDetails({
      ...supportDetails,
      [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };
  //Description Modal
  const convertHtmlToDraft = (existingQuoteformal) => {
    const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);
    }
  };

  // Route Change
  const applyChanges = () => {};
  const saveChanges = () => {
    if (supportDetails.name !== '') {
      navigate('/Support');
    }
  };
  const backToList = () => {
    navigate('/Support');
  };
  //  toggle
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  //Api call for getting Support By Id
  const getSupportById = () => {
    api
      .post('/support/getSupportById', { support_id: id })
      .then((res) => {
        setSupportDetails(res.data.data[0]);
        convertHtmlToDraft(res.data.data[0].description);
      })
      .catch(() => {});
  };
  // Api call for  getting Support Type
  const getSupportName = () => {
    api
      .get('/support/getSupportDropdown')
      .then((res) => {
        setSupportName(res.data.data);
      })
      .catch(() => {
        message('Support Data Not Found', 'info');
      });
  };

  // Api call for  getting Module  Name
  const getModuleName = () => {
    api
      .get('/support/getSection')
      .then((res) => {
        setSection(res.data.data);
      })
      .catch(() => {
        message('Support Data Not Found', 'info');
      });
  };

  // Api call for  getting Staff  Name
  const getStaffName = () => {
    api
      .get('/support/getStaffNameDropdown')
      .then((res) => {
        setStaffName(res.data.data);
      })
      .catch(() => {
        message('Support Data Not Found', 'info');
      });
  };

  //Api call for  Editting Support

  const editSupportData = () => {
    supportDetails.modification_date = creationdatetime;
    if (supportDetails.title) {
      api
        .post('/support/editSupport', supportDetails)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  useEffect(() => {
    getSupportName();
    getModuleName();
    getStaffName();
    getSupportById();
    //  sendMail();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>

      {/* Support Button Details */}

      <SupportButton
        saveChanges={saveChanges}
        applyChanges={applyChanges}
        backToList={backToList}
        editSupportData={editSupportData}
        navigate={navigate}
        // sendMail={sendMail}
      ></SupportButton>

      <Form>
        <FormGroup>
          <ComponentCard title="Support Details" creationModificationDate={supportDetails}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={moment(supportDetails && supportDetails.date).format('YYYY-MM-DD')}
                    name="date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={supportDetails && supportDetails.title}
                    name="title"
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Status</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={supportDetails && supportDetails.value}
                    name="value"
                  >
                    <option value="new" defaultValue="selected">
                      new
                    </option>
                    <option value="in progress">in progress</option>
                    <option value="hold">hold</option>
                    <option value="re-open">re-open</option>
                    <option value="cancelled">cancelled</option>
                    <option value="completed">completed</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Type</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={supportDetails && supportDetails.record_type}
                    name="record_type"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {supportName &&
                      supportName.map((ele) => {
                        if (ele.id === id) {
                          return (
                            <option defaultValue="selected" value={ele.value_name} key={ele.id}>
                              {ele.value_name}
                            </option>
                          );
                        }
                        return (
                          <option value={ele.value_name} key={ele.id}>
                            {ele.value_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Module Name</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={supportDetails && supportDetails.section_id}
                    name="section_id"
                  >
                    <option> Please Select </option>
                    {section &&
                      section.map((ele) => {
                        return (
                          <option value={ele.section_id} key={ele.section_id}>
                            {ele.section_title}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Staff Assigned</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    name="staff_id"
                    value={supportDetails && supportDetails.staff_id}
                  >
                    <option value="" defaultValue="selected">
                      Please Select
                    </option>

                    {staffname &&
                      staffname.map((ele) => {
                        return (
                          <option value={ele.staff_id} key={ele.staff_id}>
                            {ele.staff_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={moment(supportDetails && supportDetails.due_date).format('YYYY-MM-DD')}
                    name="due_date"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>

      <ComponentCard title="More Details">
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
              Attachments
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Add Note
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent className="p-4" activeTab={activeTab}>
          {/* Description form */}
          <TabPane tabId="1">
            <Editor
              editorState={description}
              wrapperClassName="demo-wrapper mb-0"
              editorClassName="demo-editor border mb-4 edi-height"
              onEditorStateChange={(e) => {
                handleDataEditor(e, 'description');
                setDescription(e);
              }}
            />
          </TabPane>

          {/* attachments */}
          <TabPane tabId="2">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('Booking');
                    setFileTypes(['JPG', 'PNG', 'GIF', 'PDF', 'CSV', 'XLS']);
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
              altTagData="BookingRelated Data"
              desc="BookingRelated Data"
              recordType="RelatedPicture"
              mediaType={attachmentData.modelType}
            />
            <ViewFileComponentV2 moduleId={id} roomName="Booking" recordType="RelatedPicture" />
          </TabPane>
          {/* ADD NODE */}
          <TabPane tabId="3">
            <AddNote recordId={id} roomName="SupportEdit" />

            <Row style={{ alignItems: 'flex-start' }}>
              <Col lg="6">
                <ViewNote recordId={id} roomName="SupportEdit" />
              </Col>
              <Col lg="6">
                <Card>
                  <CardBody className="p-4">
                    <CardTitle tag="h4">Support Statestics</CardTitle>
                    <SupportState supportDetails={supportDetails && supportDetails.alltickets} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default SupportEdit;
