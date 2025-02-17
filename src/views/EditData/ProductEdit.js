import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Button, TabContent, NavItem, NavLink, Nav, TabPane } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import ProductEditButtons from '../../components/Product/ProductEditButtons';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ProductDetail from '../../components/ProductTable/ProductDetail';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const ProductUpdate = () => {
  // All state variables
  const [productDetails, setProductDetails] = useState();
  const [categoryLinked, setCategoryLinked] = useState([]);
  const [productDescription, setProductDescription] = useState('');
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [activeTab, setActiveTab] = useState('1');
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);

  //Setting data in productDetails
  const handleInputs = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  //setting data in Description Modal productDetails
  const handleDataEditor = (e, type) => {
    setProductDetails({
      ...productDetails,
      [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  //Description Modal
  const convertHtmlToDraft = (existingQuoteformal) => {
    const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setProductDescription(editorState);
    }
  };

  // Get Product data By product id
  const getProductById = () => {
    api
      .post('/product/getProduct', { product_id: id })
      .then((res) => {
        setProductDetails(res.data.data[0]);
        convertHtmlToDraft(res.data.data[0].product_description);
      })
      .catch(() => {
        message('Product Data Not Found', 'info');
      });
  };
  //Edit Product
  const editProductData = () => {
    if (productDetails.title !== '') {
      productDetails.modification_date = creationdatetime;
      productDetails.modified_by = loggedInuser.first_name;
      api
        .post('/product/edit-Product', productDetails)
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

  // getting data from Category
  const getCategory = () => {
    api
      .get('/product/getCategory')
      .then((res) => {
        setCategoryLinked(res.data.data);
      })
      .catch(() => {
        message('Unable to get categories', 'error');
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
    getCategory();
    getProductById();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={productDetails && productDetails.title} />
      <Form>
        <FormGroup>
        <TabContent className="p-4" activeTab={activeTab}>
          <ProductEditButtons id={id} editProductData={editProductData} navigate={navigate} />
          {/* Product Details Form */}
          <ProductDetail
            productDetails={productDetails}
            handleInputs={handleInputs}
            categoryLinked={categoryLinked}
          ></ProductDetail>
          {/* Product Details Form */}
          <Row>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active' : ''}
                onClick={() => {
                  toggle('1');
                }}
              >
                Product Description
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                className={activeTab === '2' ? 'active' : ''}
                onClick={() => {
                  toggle('2');
                }}
              >
               Product Color
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '3' ? 'active' : ''}
                onClick={() => {
                  toggle('3');
                }}
              >
                Product Size
              </NavLink>
            </NavItem> */}
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
          </Nav>
        </Row>
        {/* Delivery address Form */}
        <TabPane tabId="1">
        <ComponentCard title="Product Description">
                <Editor
                  editorState={productDescription}
                  wrapperClassName="demo-wrapper mb-0"
                  editorClassName="demo-editor border mb-4 edi-height"
                  onEditorStateChange={(e) => {
                    handleDataEditor(e, 'product_description');
                    setProductDescription(e);
                  }}
                />
              </ComponentCard>
        </TabPane>

        {/* Customer Details Form */}
        {/* <TabPane tabId="2">
          <ComponentCard title="Product Color">
          <ProductColor
           projectId={id}
          ></ProductColor>
          </ComponentCard>
        </TabPane>
        <TabPane tabId="3">
          <ComponentCard title="Product Size">
          <ProductSize
            projectId={id}
          ></ProductSize>
          </ComponentCard>
        </TabPane> */}
        <TabPane tabId="2">
        <ComponentCard title="Attachments">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('Product');
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
              altTagData="ProductRelated Data"
              desc="ProductRelated Data"
              recordType="RelatedPicture"
              mediaType={attachmentData.modelType}
            />
            <ViewFileComponentV2 moduleId={id} roomName="Product" recordType="RelatedPicture" />
          </ComponentCard>
        </TabPane>
      </TabContent>
      </FormGroup>
      </Form>
    
    </>
  );
};
export default ProductUpdate;
