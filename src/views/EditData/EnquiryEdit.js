import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import DeleteButton from '../../components/DeleteButton';
import AppContext from '../../context/AppContext';

const EnquiryEdit = () => {
  //All state variable
  const [enquiryDetails, setEnquiryDetails] = useState();
  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);

  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Enquiry');
  };
  //setting data in enquiryDetails
  const handleInputs = (e) => {
    setEnquiryDetails({ ...enquiryDetails, [e.target.name]: e.target.value });
  };
  //getting data from setting by Id
  const getEnquiryById = () => {
    api
      .post('/enquiry/getEnquiryById', { enquiry_id: id })
      .then((res) => {
        setEnquiryDetails(res.data.data[0]);
      })
      .catch(() => {
        message('setting Data Not Found', 'info');
      });
  };
  //Update Setting
  const editEnquiryData = () => {
     if (enquiryDetails.first_name !== '') {
      enquiryDetails.modification_date = creationdatetime;
    enquiryDetails.modified_by = loggedInuser.first_name;
      api
        .post('/enquiry/editEnquiry', enquiryDetails)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'error');
    }
  };
  useEffect(() => {
    getEnquiryById();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          {/* Enquiry Button */}
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editEnquiryData();
                    setTimeout(() => {
                      navigate('/Enquiry');
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
                    editEnquiryData();
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
                      navigate('/Enquiry');
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <DeleteButton id={id} columnname="enquiry_id" tablename="enquiry"></DeleteButton>
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
      {/* Enquiry Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="Enquiry Details" creationModificationDate={enquiryDetails}>
            {' '}
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={enquiryDetails && enquiryDetails.first_name}
                    name="first_name"
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={enquiryDetails && enquiryDetails.comments}
                    name="comments"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Phone</Label>
                  <Input
                    type="numbers"
                    onChange={handleInputs}
                    value={enquiryDetails && enquiryDetails.phone}
                    name="phone"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                          <FormGroup>
                            <Label>Status</Label>
                            <Input
                              type="select"
                              name="status"
                              onChange={handleInputs}
                              value={enquiryDetails && enquiryDetails.status}
                            >
                              {' '}
                              <option value="" selected="selected">
                                Please Select
                              </option>
                              <option value="Pending">Pending</option>
                              <option value="InProgress">InProgress</option>
                              <option value="Completed">Completed</option>
                              <option value="OnHold">OnHold</option>
                            </Input>
                          </FormGroup>
                        </Col>

              <Col md="4">
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="text"
                    value={enquiryDetails && enquiryDetails.email}
                    name="email"
                    onChange={handleInputs}
                  ></Input>
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
                    defaultChecked={enquiryDetails && enquiryDetails.published === 1 && true}
                    onChange={handleInputs}
                  />
                  <Label>No</Label>
                  <Input
                    name="published"
                    value="0"
                    type="radio"
                    defaultChecked={enquiryDetails && enquiryDetails.published === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default EnquiryEdit;
