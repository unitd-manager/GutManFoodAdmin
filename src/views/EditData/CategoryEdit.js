import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import { Button, Col, Form, FormGroup, Row } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import api from '../../constants/api';
import CategoryButton from '../../components/CategoryTable/CategoryButton';
import CategoryDetailComp from '../../components/CategoryTable/CategoryDetailComp';
import creationdatetime from '../../constants/creationdatetime';
import ComponentCard from '../../components/ComponentCard';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AppContext from '../../context/AppContext';

const CategoryEdit = () => {
  //All state variables
  const [categoryDetails, setCategoryDetails] = useState();
  const [section, setSection] = useState();
  const [valuelist, setValuelist] = useState();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  //Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };
  const { loggedInuser } = useContext(AppContext);

  // Button Save Apply Back List
  const applyChanges = () => {};
  const saveChanges = () => {
    if (categoryDetails.category_title !== '') {
      navigate('/Category');
    }
  };
  const backToList = () => {
    navigate('/Category');
  };

  //Api call for getting section dropdown
  const getSection = () => {
    api
      .get('/category/getSectionTitle')
      .then((res) => {
        setSection(res.data.data);
      })
      .catch(() => {
        message('Section not found', 'info');
      });
  };

  //Api call for getting valuelist dropdown
  const getValuelist = () => {
    api
      .get('/category/get-ValueList')
      .then((res) => {
        setValuelist(res.data.data);
      })
      .catch(() => {
        message('valuelist not found', 'info');
      });
  };

  const handleInputs = (e) => {
    setCategoryDetails({ ...categoryDetails, [e.target.name]: e.target.value });
  };

  // Get Category By Id
  const CategoryById = () => {
    api
      .post('/category/getCategoryById', { category_id: id })
      .then((res) => {
        setCategoryDetails(res.data.data[0]);
      })
      .catch(() => {
        message('category Data Not Found', 'info');
      });
  };

  //Category Edit function
  const editCategoryData = () => {
    categoryDetails.modification_date = creationdatetime;
    categoryDetails.modified_by = loggedInuser.first_name;
    if (categoryDetails.category_title !== '') {
      api
        .post('/category/editCategory', categoryDetails)
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

  //Delete Category Function
  const deleteCategoryData = () => {
    api
      .post('/category/deleteCategory', { category_id: id })
      .then(() => {
        message('Record deteled successfully', 'success');
      })
      .catch(() => {
        message('Unable to delete record.', 'error');
      });
  };

  useEffect(() => {
    CategoryById();
    getSection();
    getValuelist();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>

      {/* Button */}
      <CategoryButton
        editCategoryData={editCategoryData}
        navigate={navigate}
        applyChanges={applyChanges}
        saveChanges={saveChanges}
        deleteCategoryData={deleteCategoryData}
        backToList={backToList}
        id={id}
      ></CategoryButton>

      {/* More details*/}
      <CategoryDetailComp
        categoryDetails={categoryDetails}
        handleInputs={handleInputs}
        section={section}
        valuelist={valuelist}
      ></CategoryDetailComp>

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
              roomName="Category"
              altTagData="Category Data"
              desc="Category Data"
              modelType={attachmentData.modelType}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
            />
            <ViewFileComponentV2 moduleId={id} roomName="Category" />
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};
export default CategoryEdit;
