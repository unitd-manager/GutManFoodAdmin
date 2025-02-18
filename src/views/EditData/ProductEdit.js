import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button,TabContent,TabPane } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-feather';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import Tab from '../../components/project/Tab';
import creationdatetime from '../../constants/creationdatetime';
//import ProductEditButtons from '../../components/Product/ProductEditButtons';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import AppContext from '../../context/AppContext';
import ApiButton from '../../components/ApiButton';

const ProductUpdate = () => {
  // All state variables

  const [productDetails, setProductDetails] = useState();
  const [categoryLinked, setCategoryLinked] = useState([]);
  const [description, setDescription] = useState('');
  const [pictureroomname, setPictureRoomName] = useState('');
  const [attachmentroomname, setAttachmentRoomName] = useState('');
  const [picturefiletypes, setPictureFileTypes] = useState('');
  const [attachmentfiletypes, setAttachmentFileTypes] = useState('');
  const [picturemodal, setPictureModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [pictureData, setDataForPicture] = useState({
    modelType: '',
  });
  const [pictureupdate, setPictureUpdate] = useState(false);
  const [attachmentupdate, setAttachmentUpdate] = useState(false);
  const [unitdetails, setUnitDetails] = useState();
  // const [updatepic, setUpdatePic] = useState(false);
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  console.log('productDetails', productDetails)

  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/Product');
  };
  //get staff details
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
  //Description Modal
  const convertHtmlToDraft = (existingQuoteformal) => {
    const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);
    }
  };
  // Get Product data By product id
  const getProductById = () => {
    api
      .post('/product/getProduct', { product_id: id })
      .then((res) => {
        const resObj = res.data.data[0];
        if (!resObj.product_type) {
          resObj.product_type = 'Purchasing and Selling';
        }
        setProductDetails(resObj);
        convertHtmlToDraft(res.data.data[0].description);
      })
      .catch(() => {});
  };
  //Edit Product
  const editProductData = () => {
    if (productDetails.title !== '') {
      productDetails.modification_date = creationdatetime;
      productDetails.modified_by = loggedInuser.first_name;
      api
        .post('/product/edit-Product', productDetails)
        .then(() => {
          getProductById();
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
      .catch(() => {});
  };

  //Api call for getting Unit From Valuelist
  const getUnit = () => {
    api
      .get('/product/getUnitFromValueList')
      .then((res) => {
        setUnitDetails(res.data.data);
      })
      .catch(() => {
        message('Staff Data Not Found', 'info');
      });
  };

  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  //Pictures
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture',
    });
  };
  //useEffect
  useEffect(() => {
    getCategory();
    getProductById();
    getUnit();
  }, [id]);
  const [activeTab, setActiveTab] = useState('1');
  // Start for tab refresh navigation #Renuka 1-06-23
  const tabs = [
    { id: '1', name: 'Description' },
    { id: '2', name: 'Attachments' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <BreadCrumbs heading={productDetails && productDetails.title} />
      <Form>
        <FormGroup>
          {/* <ProductEditButtons id={id} editProductData={editProductData} navigate={navigate} /> */}
          <ApiButton
            editData={editProductData}
            navigate={navigate}
            applyChanges={editProductData}
            backToList={backToList}
            module="Product"
          ></ApiButton>
          {/* Content Details Form */}
          <ComponentCard title="Product Details" creationModificationDate={productDetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Item code </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.item_code}
                    name="item_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>
                    {' '}
                    Product Name <span className="required"> *</span>{' '}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label>Category</Label>
                  <Input
                    type="select"
                    name="category_id"
                    value={productDetails && productDetails.category_id}
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                    {categoryLinked &&
                      categoryLinked.map((ele) => {
                        return (
                          <option key={ele.category_id} value={ele.category_id}>
                            {ele.category_title}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Type</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={productDetails && productDetails.product_type}
                    name="product_type"
                  >
                    <option> Please Select </option>
                    <option defaultValue="Purchasing and Selling">Purchasing and Selling</option>
                    <option value="Materials">Materials</option>
                    <option value="Tools">Tools</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Quantity in Stock </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.qty_in_stock}
                    name="qty_in_stock"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> List Price </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.price}
                    name="price"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Unit </Label>
                  <Input
                    type="select"
                    name="unit"
                    onChange={handleInputs}
                    value={productDetails && productDetails.unit}
                  >
                    <option defaultValue="selected">Please Select</option>
                    {unitdetails &&
                      unitdetails.map((ele) => {
                        return (
                          <option key={ele.value} value={ele.value}>
                            {ele.value}
                          </option>
                        );
                      })}
                  </Input>
                  {/* <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.unit}
                    name="unit"
                  /> */}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Short Description </Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={productDetails && productDetails.description_short}
                    name="description_short"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Label>Published</Label>
                <FormGroup>
                  <Label>Yes</Label>
                  &nbsp;
                  <Input
                    name="published"
                    value="1"
                    type="radio"
                    defaultChecked={productDetails && productDetails.published === 1 && true}
                    onChange={handleInputs}
                  />
                  &nbsp; &nbsp;
                  <Label>No</Label>
                  &nbsp;
                  <Input
                    name="published"
                    value="0"
                    type="radio"
                    defaultChecked={productDetails && productDetails.published === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
          {/* Product Details Form */}
          <ComponentCard title="More Details">
            <Tab toggle={toggle} tabs={tabs} />
            <TabContent className="p-4" activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
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
              </TabPane>
              <TabPane tabId="2">
                {/* Picture and Attachments Form */}

                <Form>
                  <FormGroup>
                    <ComponentCard title="Picture">
                      <Row>
                        <Col xs="12" md="3" className="mb-3">
                          <Button
                            className="shadow-none"
                            color="primary"
                            onClick={() => {
                              setPictureRoomName('ProductPic');
                              setPictureFileTypes(['JPG', 'JPEG', 'PNG', 'GIF']);
                              dataForPicture();
                              setPictureModal(true);
                            }}
                          >
                            <Icon.File className="rounded-circle" width="20" />
                          </Button>
                        </Col>
                      </Row>
                      <AttachmentModalV2
                        moduleId={id}
                        attachmentModal={picturemodal}
                        setAttachmentModal={setPictureModal}
                        roomName={pictureroomname}
                        fileTypes={picturefiletypes}
                        altTagData="Product Data"
                        desc="Product Data"
                        recordType="Picture"
                        mediaType={pictureData.modelType}
                        update={pictureupdate}
                        setUpdate={setPictureUpdate}
                      />
                      <ViewFileComponentV2
                        moduleId={id}
                        roomName="ProductPic"
                        recordType="Picture"
                        update={pictureupdate}
                        setUpdate={setPictureUpdate}
                      />
                    </ComponentCard>
                  </FormGroup>
                </Form>

                <Form>
                  <FormGroup>
                    <ComponentCard title="Attachments">
                      <Row>
                        <Col xs="12" md="3" className="mb-3">
                          <Button
                            className="shadow-none"
                            color="primary"
                            onClick={() => {
                              setAttachmentRoomName('Product');
                              setAttachmentFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
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
                        roomName={attachmentroomname}
                        fileTypes={attachmentfiletypes}
                        altTagData="ProductRelated Data"
                        desc="ProductRelated Data"
                        recordType="RelatedPicture"
                        mediaType={attachmentData.modelType}
                        update={attachmentupdate}
                        setUpdate={setAttachmentUpdate}
                      />
                      <ViewFileComponentV2
                        moduleId={id}
                        roomName="Product"
                        recordType="RelatedPicture"
                        update={attachmentupdate}
                        setUpdate={setAttachmentUpdate}
                      />
                    </ComponentCard>
                  </FormGroup>
                </Form>
              </TabPane>
            </TabContent>
          </ComponentCard>
        </FormGroup>
      </Form>

      <br />
    </>
  );
};
export default ProductUpdate;
