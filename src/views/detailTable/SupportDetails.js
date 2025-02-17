import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';

const SupportDetails = () => {
  const currentDate = moment().format('YYYY-MM-DD');

  //All state variables
  const [supportDetails, setSupportDetails] = useState({
    support_id: '',
    title: '',
    date: currentDate,
    value: 'new',
    record_type: 'Change Request',
    creation_date: moment(),
  });

  const [section, setSection] = useState();

  //Navigation and parameters
  const navigate = useNavigate();

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
  //support data in supportDetails
  const handleInputs = (e) => {
    const valueArray = e.target.value.split(',');
    /*eslint-disable */
    supportDetails.title = valueArray[0];
    supportDetails.section_id = parseInt(valueArray[1]);
    setSupportDetails(supportDetails);
  };
  //Insert support
  const insertSupportData = () => {
    if (supportDetails.section_id) {
      api
        .post('/support/insertSupport', supportDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Support inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/SupportEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please select module.', 'error');
    }
  };
  useEffect(() => {
    getModuleName();
  }, []);

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="6" xs="12">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Module Name <span className="required"> *</span>
                    </Label>
                    <Input type="select" onChange={handleInputs} name="section_id">
                      <option defaultValue="selected">Please Select</option>
                      {section &&
                        section.map((ele) => {
                          return (
                            <option
                              key={ele.section_id}
                              value={`${ele.section_title},${ele.section_id}`}
                            >
                              {ele.section_title}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="mt-3 d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        insertSupportData();
                        setTimeout(() => {
                          navigate('/SupportEdit');
                        }, 800);
                      }}
                    >
                      Save & Continue
                    </Button>

                    <Button
                      type="submit"
                      className="btn btn-dark shadow-none"
                      onClick={(e) => {
                        if (window.confirm('Are you sure you want to cancel? ')) {
                          navigate('/Support');
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

export default SupportDetails;
