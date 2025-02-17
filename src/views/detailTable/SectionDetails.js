import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const SectionDetails = () => {
  // Navigation and Parameter Constants
  const navigate = useNavigate();
  const { id } = useParams();
  //Const Variables
  const [sectionForms, setSectionForms] = useState({
    section_title: '',
    creation_date: moment(),
  });
  const { loggedInuser } = useContext(AppContext);

  //Expense Functions/Methods
  const handleSectionForms = (e) => {
    setSectionForms({ ...sectionForms, [e.target.name]: e.target.value });
  };
  // Api // insertSection
  const insertSection = () => {
    if (sectionForms.section_title !== '') {
      sectionForms.created_date = creationdatetime;
      sectionForms.created_by = loggedInuser.first_name;
      api
        .post('/section/insertSection', sectionForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          console.log(insertedDataId);
          message('Section inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/SectionEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  useEffect(() => {}, [id]);
  return (
    <div>
      {/* Section Details */}
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6" xs="12">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Title<span className="required"> *</span>
                    </Label>
                    <Input
                      type="text"
                      name="section_title"
                      onChange={(e) => {
                        handleSectionForms(e);
                      }}
                    ></Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertSection();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate(-1);
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default SectionDetails;
