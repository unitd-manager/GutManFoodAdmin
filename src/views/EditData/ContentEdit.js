import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import creationdatetime from '../../constants/creationdatetime';
import message from '../../components/Message';
import api from '../../constants/api';
import ContentMoreDetails from '../../components/Content/ContentMoreDetails';
import AppContext from '../../context/AppContext';

const ContentUpdate = () => {
  // All state variables
  const [lineItem] = useState(null);
  const [contentDetails, setContentDetails] = useState();
  const [sectionLinked, setSectionLinked] = useState();
  const [categoryLinked, setCategoryLinked] = useState();
  const [subcategoryLinked, setSubCategoryLinked] = useState();
  const [description, setDescription] = useState('');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [valuelist, setValuelist] = useState();
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const { loggedInuser } = useContext(AppContext);

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  //Setting data in contentDetails
  const handleInputs = (e) => {
    setContentDetails({ ...contentDetails, [e.target.name]: e.target.value });
  };
  //setting data in Description Modal contentDetails
  const handleDataEditor = (e, type) => {
    setContentDetails({
      ...contentDetails,
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
  // Get content data By content id
  const getContentById = () => {
    api
      .post('/content/getContentById', { content_id: id })
      .then((res) => {
        setContentDetails(res.data.data);
        convertHtmlToDraft(res.data.data.description);
      })
      .catch(() => {
        message('Content Data Not Found', 'info');
      });
  };
  //Edit Content
  const editContentData = () => {
    console.log(contentDetails);
    if (
      contentDetails.content_title !== '' &&
      contentDetails.sub_category_id !== '' &&
      contentDetails.published !== ''
    ) {
      contentDetails.modification_date = creationdatetime;
      contentDetails.modified_by = loggedInuser.first_name;
      api
        .post('/content/editContent', contentDetails)
        .then(() => {
          message('Record edited successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  // getting data from Section
  const getsection = () => {
    api.get('/content/getSection', sectionLinked).then((res) => {
      setSectionLinked(res.data.data);
    });
  };
  // getting data from Category
  const getCategory = () => {
    api.get('/content/getCategory', categoryLinked).then((res) => {
      setCategoryLinked(res.data.data);
    });
  };
  // getting data from SubCategory
  const getSubCategory = () => {
    api.get('/content/getSubCategory', subcategoryLinked).then((res) => {
      setSubCategoryLinked(res.data.data);
    });
  };
// get data from valuelist
  const getValuelist = () => {
    api
      .get('/content/getValueList')
      .then((res) => {
        setValuelist(res.data.data);
      })
      .catch(() => {
        message('valuelist not found', 'info');
      });
  };

  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };

  useEffect(() => {
    getsection();
    getCategory();
    getSubCategory();
    getContentById();
    getValuelist();
    console.log(lineItem);
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={contentDetails && contentDetails.title} />
      <Form>
        <FormGroup>
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  color="primary"
                  onClick={() => {
                    editContentData();
                    setTimeout(() => {
                      navigate('/Content');
                    }, 1100);
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  color="primary"
                  onClick={() => {
                    editContentData();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  color="dark"
                  onClick={() => {
                    navigate('/Content');
                    console.log('back to list');
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
          {/* Content Details Form */}
          <ContentMoreDetails
            contentDetails={contentDetails}
            handleInputs={handleInputs}
            valuelist={valuelist}
            subcategoryLinked={subcategoryLinked}
            getCategory={getCategory}
            sectionLinked={sectionLinked}
            categoryLinked={categoryLinked}
          ></ContentMoreDetails>

          <ComponentCard title="Content details">
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label> Show Title</Label>
                  <br></br>
                  <Label> Yes </Label>
                  <Input
                    name="show_title"
                    value="1"
                    type="radio"
                    defaultChecked={contentDetails && contentDetails.show_title === 1 && true}
                    onChange={handleInputs}
                  />
                  <Label> No </Label>
                  <Input
                    name="show_title"
                    value="0"
                    type="radio"
                    defaultChecked={contentDetails && contentDetails.show_title === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Published</Label>
                  <br></br>
                  <Label>Yes</Label>
                  <Input
                    name="published"
                    value="1"
                    type="radio"
                    defaultChecked={contentDetails && contentDetails.published === 1 && true}
                    onChange={handleInputs}
                  />
                  <Label>No</Label>
                  <Input
                    name="published"
                    value="0"
                    type="radio"
                    defaultChecked={contentDetails && contentDetails.published === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Content Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={moment(contentDetails && contentDetails.content_date).format(
                      'YYYY-MM-DD',
                    )}
                    name="content_date"
                  />
                </FormGroup>
              </Col>
              {/* Description form */}
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
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      {/* Picture and Attachments Form */}
      <Form>
        <FormGroup>
          <ComponentCard title="Attachments">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  color="primary"
                  onClick={() => {
                    dataForAttachment();
                    setAttachmentModal(true);
                  }}
                >
                  Add
                </Button>
              </Col>
            </Row>
            <AttachmentModalV2
              moduleId={id}
              roomName="Content"
              altTagData="Content Data"
              desc="Content Data"
              modelType={attachmentData.modelType}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
            />
            <ViewFileComponentV2 moduleId={id} roomName="Content" />
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};
export default ContentUpdate;
