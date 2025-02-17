import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import DeleteButton from '../../components/DeleteButton';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import BlogDetail from '../../components/BlogTable/BlogDetail';
import AppContext from '../../context/AppContext';

const BlogEdit = () => {
  //All state variable
  const [blog, setblog] = useState();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const { loggedInuser } = useContext(AppContext);

  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Blog');
  };
  //blog data in blog
  const handleInputs = (e) => {
    setblog({ ...blog, [e.target.name]: e.target.value });
  };
  //  blog data in Description Modal blog
  const handleDataEditor = (e, type) => {
    setblog({
      ...blog,
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
  //getting data from blog by Id
  const getBlogById = () => {
    api
      .post('/blog/getBlogsByblogId', { blog_id: id })
      .then((res) => {
        setblog(res.data.data[0]);
        convertHtmlToDraft(res.data.data[0].description);
      })
      .catch(() => {
        message('blog Data Not Found', 'info');
      });
  };
  // Gettind data from category
  const editCategory = () => {
    api
      .get('/category/getBlogCategory')
      .then((res) => {
        console.log(res.data.data);
        setCategory(res.data.data);
      })
      .catch(() => {});
  };
  //Update blog
  const editBlogs = () => {
    blog.modified_by = loggedInuser.first_name;
    blog.modification_date = creationdatetime;
    api
      .post('/blog/editBlog', blog)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };

  useEffect(() => {
    getBlogById();
    editCategory();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          {/* Blog Buttons */}
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editBlogs();
                    setTimeout(() => {
                      navigate('/Blog');
                    }, 1100);
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editBlogs();
                    applyChanges();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  className="btn btn-dark shadow-none"
                  onClick={(e) => {
                    if (window.confirm('Are you sure you want to cancel? ')) {
                      navigate('/blog');
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <DeleteButton id={id} columnname="blog_id" tablename="blog"></DeleteButton>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="dark"
                  onClick={() => {
                    backToList();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form>
      <Form>
        <FormGroup>
          <ComponentCard title="Blog Details" creationModificationDate={blog}>
            {' '}
            <ToastContainer></ToastContainer>
            <div>
              <BreadCrumbs />
         {/* blog Details */}
              <BlogDetail blog={blog} handleInputs={handleInputs} category={category}></BlogDetail>
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
              <Form>
                <FormGroup>
                  {/* Attachments */}
                  <ComponentCard title="Attachments">
                    <Row>
                      <Col xs="12" md="3" className="mb-3">
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            setRoomName('Blog');
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
                      roomName={roomName}
                      fileTypes={fileTypes}
                      altTagData="BlogRelated Data"
                      recordType="RelatedPicture"
                      desc="BlogRelated Data"
                      modelType={attachmentData.modelType}
                      attachmentModal={attachmentModal}
                      setAttachmentModal={setAttachmentModal}
                    />
                    <ViewFileComponentV2
                      moduleId={id}
                      roomName="Blog"
                      recordType="RelatedPicture"
                    />
                  </ComponentCard>
                </FormGroup>
              </Form>
            </div>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default BlogEdit;
