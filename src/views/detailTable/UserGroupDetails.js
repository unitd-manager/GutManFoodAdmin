import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const UserGroupDetails = () => {
  const [userGroupDetails, setUserGroupDetails] = useState({
    title: '',
    creation_date: moment(),

  });
  const [section, setSection] = useState([]);
  const { loggedInuser } = useContext(AppContext);

  const navigate = useNavigate();
  //setting data in ProductDetails
  const handleInputs = (e) => {
    setUserGroupDetails({ ...userGroupDetails, [e.target.name]: e.target.value });
  };

  // get section
  const getSection = () => {
    api.get('/usergroup/getSectionsforusergroup').then((res) => {
      setSection(res.data.data);
    });
  };

  //Insert Product Data
  const createUserGroup = () => {
    userGroupDetails.creation_date = creationdatetime;
    userGroupDetails.created_by = loggedInuser.first_name;
    api
      .post('/usergroup/insertUserGroup', userGroupDetails)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        section.forEach((elem) => {
          elem.user_group_id = insertedDataId;
          api
            .post('/usergroup/insertRoomUserGroup', elem)
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        });
        message('UserGroup created successfully.', 'success');
        setTimeout(() => {
          navigate(`/UserGroupEdit/${insertedDataId}`);
        }, 500);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    getSection();
  }, []);
  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Title</Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={userGroupDetails && userGroupDetails.title}
                      name="title"
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        createUserGroup();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/UserGroup');
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

export default UserGroupDetails;
