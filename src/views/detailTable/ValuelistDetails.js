import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const ValueListDetails = () => {
  // All state variables
  const [valuelistname, setValueListName] = useState();
  const [valuelistdetails, setValueListDetails] = useState({ key_text: '', value: '',     creation_date: moment(),
  });

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  //All Functions/Methods

  //Setting Data in ValueList Details
  const handleInputs = (e) => {
    setValueListDetails({ ...valuelistdetails, [e.target.name]: e.target.value });
  };

  //Api call for getting Valuelist dropdown
  const getValueListName = () => {
    api
      .get('/valuelist/getValueListDropdown')
      .then((res) => {
        setValueListName(res.data.data);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  const { loggedInuser } = useContext(AppContext);

  //Api call for Insert Valuelist Details
  const insertValueListData = () => {
    if (valuelistdetails.key_text !== '' && valuelistdetails.value !== '') {
      valuelistdetails.created_by = loggedInuser.first_name;
      valuelistdetails.creation_date = creationdatetime;
      api
        .post('/valuelist/insertValueList', valuelistdetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Valuelist inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/ValueListEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  useEffect(() => {
    getValueListName();
  }, [id]);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Value List Name <span className="required"> *</span>
                    </Label>
                    <Input
                      type="select"
                      onChange={handleInputs}
                      value={valuelistdetails && valuelistdetails.key_text}
                      name="key_text"
                    >
                      <option defaultValue="selected">Please Select</option>
                      {valuelistname &&
                        valuelistname.map((ele) => {
                          return (
                            <option key={ele.name} value={ele.name}>
                              {ele.name}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Value<span className="required"> *</span>
                    </Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={valuelistdetails && valuelistdetails.value}
                      name="value"
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      type="button"
                      className="btn mr-2 shadow-none"
                      onClick={() => {
                        insertValueListData();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      type="submit"
                      className="btn btn-dark shadow-none"
                      onClick={(e) => {
                        if (window.confirm('Are you sure you want to cancel? ')) {
                          navigate('/Valuelist');
                        } else {
                          e.preventDefault();
                        }
                      }}
                    >
                      Cancel
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

export default ValueListDetails;
