import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Button, Modal, CardTitle ,TabContent,
  TabPane,
  NavItem,
  NavLink,
  Nav, } from 'reactstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../ComponentCard';
import ComponentCardV2 from '../ComponentCardV2';
import message from '../Message';
import api from '../../constants/api';
import JobInformationKeyDetails from '../JobInformationModal.js/JobInformationKeyDetails';
import JobProbationModal from '../JobInformationModal.js/JobProbationModal';
import JobWorkingHoursModal from '../JobInformationModal.js/JobWorkingHoursModal';
import JobSalaryModal from '../JobInformationModal.js/JobSalaryModal';
import JobInformationSalaryModal from '../JobInformationModal.js/JobInformationSalaryModal';
import JobTermination from '../JobInformationModal.js/JobRTerminationModal';
import JobLeave from '../JobInformationModal.js/JobLeaveModal';
import JobBankModal from '../JobInformationModal.js/JobBankModal ';

const JobInformation = ({ JobInformationEditModal, setJobInformationEditModal }) => {
  JobInformation.propTypes = {
    JobInformationEditModal: PropTypes.bool,
    setJobInformationEditModal: PropTypes.func,
  };
  //all state vriables
  const [activeTab, setActiveTab] = useState('1');
  const [jobModal, setJobModal] = useState();
  const { id } = useParams();
  const [overTimeRateModal, setOverTimeRateModal] = useState('');
  const [allBankModal, setAllBankModal] = useState();
  // Get jobinformation By Id
  const editJobByIds = () => {
    api
      .post('/jobinformation/EditjobinformationById', { job_information_id: id })
      .then((res) => {
        setJobModal(res.data.data[0]);
      })
      .catch(() => {
        message('JobInformation Data Not Found', 'info');
      });
  };
  const handleInputs = (e) => {
    setJobModal({ ...jobModal, [e.target.name]: e.target.value });
  };
  //Calculation for gst
  const handleInputsRadio = (radioVal, overtimeRate, basicPay) => {
    /* eslint-disable */
    if (basicPay == '') {
      basicPay = 0;
    }

    if (overtimeRate == '') {
      overtimeRate = 0;
    }
    if (radioVal === '1') {
      setOverTimeRateModal(
        (parseFloat(basicPay) / 30) * parseFloat(1 / 8) * parseFloat(overtimeRate),
      );
    } else {
      setOverTimeRateModal(0);
    }
  };
  //Logic for edit data in db
  const editJobInformationData = () => {
    if (
      jobModal.working_days ,
      jobModal.basic_pay ,
      jobModal.join_date ,
      jobModal.govt_donation 
    ) {
      jobModal.overtime_pay_rate = overTimeRateModal;
      api
        .post('/jobinformation/edit-jobinformation', jobModal)
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
  const BankDetails = () => {
    api
      .get('/bank/getBank')
      .then((res) => {
        setAllBankModal(res.data.data);
      })
      .catch(() => {
        message('JobInformation Data Not Found', 'info');
      });
  };
   //  toggle
   const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const insertJobInformationData = () => {
    Swal.fire({
      title: `Are you sure? ${id}`,
      text: 'Do you wish to duplicate the job information',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/jobinformation/edit-jobinformation', { job_information_id: id }).then((res) => {
          console.log(res);
          Swal.fire('Your Job Information duplicated successfully', 'success');
          editJobInformationData();
        });
      }
    });
  };
  useEffect(() => {
    editJobByIds();
    BankDetails();
  }, [id]);
  return (
    <>
      <Modal size="lg" isOpen={JobInformationEditModal}>
        <CardTitle>Step 1 (Job Information)</CardTitle>
        <BreadCrumbs />
        <CardTitle>
          <Label>Employee Name:</Label>
          {jobModal && jobModal.first_name}
        </CardTitle>
        <CardTitle>
          <Label>Fin no:</Label>
          {jobModal && jobModal.fin_no}
        </CardTitle>
        <Form>
          <FormGroup>
            <ComponentCardV2>
     <Row>
       <Col>
         <Button className='shadow-none'
           color="primary"
           onClick={() => {
             editJobInformationData();
             applyChanges();
           }}
         >
           Save
         </Button>
       </Col>
       <Col>
         <Button className='shadow-none'
           color="primary"
           onClick={() => {
             editJobInformationData();
             applyChanges();
           }}>
           Apply
         </Button>
       </Col>
       <Col>
         <Button className='shadow-none'
           color="secondary"
           onClick={()=>{ setJobInformationEditModal(false) }}>
           Back to List
         </Button>
       </Col>
       <Col>
         <Button className='shadow-none' onClick={() => insertJobInformationData(id)} color="dark">
           Duplicate
         </Button>
       </Col>
     </Row>
   </ComponentCardV2>
            <ComponentCard title="Details of Employment (KET)">
              <ToastContainer></ToastContainer>
              <JobInformationKeyDetails
                handleInputs={handleInputs}
                jobModal={jobModal}
              ></JobInformationKeyDetails>
            </ComponentCard>
            <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Working hours 
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Leave and Medical 
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
             Probation Details (KET)
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '4' ? 'active' : ''}
              onClick={() => {
                toggle('4');
              }}
            >
             Salary Information
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '5' ? 'active' : ''}
              onClick={() => {
                toggle('5');
              }}
            >
              CPF Information
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '6' ? 'active' : ''}
              onClick={() => {
                toggle('6');
              }}
            >
       Bank Information          
         </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '7' ? 'active' : ''}
              onClick={() => {
                toggle('7');
              }}
            >
            Termination Information
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
        <TabPane tabId="1">
            <ComponentCard title="Working hours & Rest Days (KET)">
              <JobWorkingHoursModal
                handleInputs={handleInputs}
                jobModal={jobModal}
              ></JobWorkingHoursModal>
            </ComponentCard>
            </TabPane>
            <TabPane tabId="2">
            <JobLeave
                handleInputs={handleInputs}
                jobModal={jobModal}
              ></JobLeave>
              </TabPane>
              <TabPane tabId="3">
            <ComponentCard title="Probation Details (KET)">
              <JobProbationModal
                handleInputs={handleInputs}
                jobModal={jobModal}
              ></JobProbationModal>
            </ComponentCard>
            </TabPane>
            <TabPane tabId="4">
            <ComponentCard title="Salary Information">
              <JobInformationSalaryModal
                handleInputs={handleInputs}
                handleInputsRadio={handleInputsRadio}
                jobModal={jobModal}
              ></JobInformationSalaryModal>
            </ComponentCard>
            </TabPane>
            <TabPane tabId="5">
            <ComponentCard title="CPF Information">
              <JobSalaryModal
                handleInputs={handleInputs}
                jobModal={jobModal}
              ></JobSalaryModal>
              </ComponentCard>
              </TabPane>
              <TabPane tabId="6">
               <JobBankModal
                handleInputs={handleInputs}
                jobModal={jobModal}
                allBankModal={allBankModal}
              ></JobBankModal>
              </TabPane>
              <TabPane tabId="7">
              <JobTermination
                handleInputs={handleInputs}
                jobModal={jobModal}
              ></JobTermination>
              </TabPane>
          </TabContent>
          </FormGroup>
        </Form>
      </Modal>
    </>
  );
};
export default JobInformation;
