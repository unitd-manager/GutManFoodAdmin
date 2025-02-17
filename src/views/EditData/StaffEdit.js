import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import message from '../../components/Message';
import api from '../../constants/api';
import KeyStaffDetails from '../../components/StaffTable/KeyStaffDetails';
import KeyStaffAddress from '../../components/StaffTable/KeyStaffAddress';
import StaffButton from '../../components/StaffTable/StaffButton';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const StaffEdit = () => {
  // All state variables
  const [staffeditdetails, setStaffEditDetails] = useState('');
  const [stafftypedetails, setStaffTypetDetails] = useState();
  const [staffteamdetails, setStaffTeamDetails] = useState();
  const [userdetails, setUserDetails] = useState();
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [allCountries, setallCountries] = useState([]);
  const [pictureData, setDataForPicture] = useState({
    modelType: '',
  });
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);

  //All Functions/Methods

  //Setting Data in Staff Details
  const handleInputs = (e) => {
    setStaffEditDetails({ ...staffeditdetails, [e.target.name]: e.target.value });
  };
  
  //Setting Picture Data
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture',
    });
  };

  // Route Change
  const applyChanges = () => {};
  const saveChanges = () => {
    if (!staffeditdetails.email) {
      message('Email is required', 'warning');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(staffeditdetails.email)) {
      message('Enter valid email', 'warning');
    } else if (staffeditdetails.email !== '' && staffeditdetails.first_name !== '') {
      navigate('/Staff');
    }
    window.location.reload();
  };
  const backToList = () => {
    navigate('/Staff');
  };

  //Api call for getting Staff Data By ID
  const editStaffById = () => {
    api
      .post('/staff/getStaffById', { staff_id: id })
      .then((res) => {
        const resObj = res.data.data;
        if (!resObj.status) {
          resObj.status = 'Current';
        }
        if (!resObj.user_group_id) {
          resObj.user_group_id = '1';
        }
        setStaffEditDetails(resObj);
      })
      .catch(() => {
        message('Staff Data Not Found', 'info');
      });
  };

  //Api call for Editing Staff Details

  const editStaffData = () => {
    staffeditdetails.modification_date = creationdatetime;
    staffeditdetails.modified_by = loggedInuser.first_name;
    if (!staffeditdetails.email) {
      message('Email is required', 'warning');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(staffeditdetails.email)) {
      message('Enter valid email', 'warning');
    } else if (staffeditdetails.email !== '' && staffeditdetails.first_name !== '') {
      api.post('/staff/editStaff', staffeditdetails)
        .then(() => {
          message('Record editted successfully', 'success');
          editStaffById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  //Api call for getting Staff Type From Valuelist
  const getStaffType = () => {
    api
      .get('/staff/getStaffTypeFromValueList')
      .then((res) => {
        setStaffTypetDetails(res.data.data);
      })
      .catch(() => {
        message('Staff Data Not Found', 'info');
      });
  };

  //Api call for getting Staff Team From Valuelist
  const getStaffTeam = () => {
    api
      .get('/staff/getStaffTeamFromValueList')
      .then((res) => {
        setStaffTeamDetails(res.data.data);
      })
      .catch(() => {
        message('Staff Data Not Found', 'info');
      });
  };

  //Api call for getting User Group Data
  const getUserGroup = () => {
    api
      .get('/staff/getUserGroup')
      .then((res) => {
        setUserDetails(res.data.data);
      })
      .catch(() => {
        message('Staff Data Not Found', 'info');
      });
  };

  //Api call for Deleting Staff Data
  const deleteStaffData = () => {
    api
      .post('/staff/deleteStaff', { staff_id: id })
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //Api for getting all countries
  const getAllCountries = () => {
    api
      .get('/staff/getCountry')
      .then((res) => {
        setallCountries(res.data.data);
      })
      .catch(() => {
        message('Country Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getStaffType();
    getStaffTeam();
    getUserGroup();
    editStaffById();
    getAllCountries();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer />

      {/* Staff Edit Buttons */}
      <StaffButton
        navigate={navigate}
        saveChanges={saveChanges}
        applyChanges={applyChanges}
        backToList={backToList}
        editStaffData={editStaffData}
        deleteStaffData={deleteStaffData}
        id={id}
      ></StaffButton>

      {/* KeyStaffDetails */}
      <KeyStaffDetails
        stafftypedetails={stafftypedetails}
        staffeditdetails={staffeditdetails}
        handleInputs={handleInputs}
        userdetails={userdetails}
        staffteamdetails={staffteamdetails}
      ></KeyStaffDetails>

      {/* KeyStaffAddress */}
      <KeyStaffAddress
        staffeditdetails={staffeditdetails}
        handleInputs={handleInputs}
        allCountries={allCountries}
      ></KeyStaffAddress>

      {/* Picture Attachment */}
      <Form>
        <FormGroup>
          <ComponentCard title="Picture">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('StaffPic');
                    setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF']);
                    dataForPicture();
                    setAttachmentModal(true);
                  }}
                >
                  <Icon.Image className="rounded-circle" width="20" />
                </Button>
              </Col>
            </Row>
            <AttachmentModalV2
              moduleId={id}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
              roomName={RoomName}
              fileTypes={fileTypes}
              altTagData="Staff Data"
              desc="Staff Data"
              recordType="Picture"
              mediaType={pictureData.modelType}
            />
            <ViewFileComponentV2 moduleId={id} roomName="StaffPic" recordType="Picture" />
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default StaffEdit;
