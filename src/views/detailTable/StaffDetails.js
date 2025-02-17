import React, { useContext } from 'react';
import { Row, Col, FormGroup, Label, Button, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const StaffDetails = () => {
  // All state variables

  const [staffdetails, setStaffDetails] = React.useState({ email: '', first_name: '', creation_date: moment(), });

  // Navigation and Parameter Constants

  const navigate = useNavigate();

  //All Functions/Methods

  //Setting Data in Staff Details
  const handleInputs = (e) => {
    setStaffDetails({ ...staffdetails, [e.target.name]: e.target.value });
  };
  const { loggedInuser } = useContext(AppContext);

  //Api call for Insert Staff Data
  const insertStaffData = () => {
    staffdetails.creation_date = creationdatetime;
    staffdetails.created_by = loggedInuser.first_name;

    if (!staffdetails.email) {
      message('Email is required', 'warning');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(staffdetails.email)) {
      message('Invalid email address', 'warning');
    } else if (staffdetails.email !== '' && staffdetails.first_name !== '') {
      api
        .post('/staff/insertStaff', staffdetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Staff Details inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/StaffEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('please fill all fields.', 'warning');
    }
  };

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          <ComponentCard title="key Details">
            <FormGroup>
              <Row>
                <Col md="12">
                  <Label>
                    Name<span className="required"> *</span>
                  </Label>
                  <Input type="text" onChange={handleInputs} name="first_name" />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md="12">
                  <Label>
                    Email<span className="required"> *</span>
                  </Label>
                  <Input
                    type="email"
                    onChange={handleInputs}
                    value={staffdetails && staffdetails.email}
                    name="email"
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
                      insertStaffData();
                    }}
                  >
                    Save & Continue
                  </Button>
                  <Button
                    type="submit"
                    className="btn btn-dark shadow-none"
                    onClick={(e) => {
                      if (window.confirm('Are you sure you want to cancel? ')) {
                        navigate('/Staff');
                      } else {
                        e.preventDefault();
                      }
                    }}
                  >
                    Go to List
                  </Button>
                </div>
              </Row>
            </FormGroup>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default StaffDetails;
