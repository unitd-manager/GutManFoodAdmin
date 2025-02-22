import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Form,
} from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';

const CreateFinance = ({ financeModal, setFinanceModal, projectId,getOrdersById }) => {
  CreateFinance.propTypes = {
    financeModal: PropTypes.bool,
    setFinanceModal: PropTypes.func,
    projectId: PropTypes.any,
    getOrdersById:PropTypes.func,
  };

  const [projectDetails, setCreateOrder] = useState();

  const handleInserts = (e) => {
    setCreateOrder({ ...projectDetails, [e.target.name]: e.target.value });
  };

  const getCompanyById = () => {
    api
      .post('/project/getCompanyProjectById', { project_id: projectId })
      .then((res) => {
        setCreateOrder(res.data.data);
      })
      .catch(() => {
       // message('Costing Summary not found', 'info');
      });
  };
  //Insert order for finance module
  const insertOrder = () => {
    projectDetails.project_id = projectId;
    api
      .post('/finance/insertOrder', projectDetails)
      .then(() => {
      
        //setCreateOrder(res.data.data);
        message('Invoice inserted successfully.', 'success');
        //window.location.Reload();
        getOrdersById();
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  useEffect(() => {
    getCompanyById();
  }, []);
  return (
    <>
      <Modal size="lg" isOpen={financeModal}>
        <ModalHeader> Create Order </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Form>
              <FormGroup>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>Company name</Label>
                      <Input
                        type="text"
                        onChange={handleInserts}
                        value={projectDetails && projectDetails.cust_company_name}
                        name="cust_company_name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Address 1</Label>
                      <Input
                        type="text"
                        onChange={handleInserts}
                        value={projectDetails && projectDetails.cust_address1}
                        name="cust_address1"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Address 2</Label>
                      <Input
                        type="text"
                        onChange={handleInserts}
                        value={projectDetails && projectDetails.cust_address2}
                        name="cust_address2"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Country</Label>
                      <Input
                        type="text"
                        onChange={handleInserts}
                        value={projectDetails && projectDetails.cust_address_country}
                        name="cust_address_country"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Postal Code</Label>
                      <Input
                        type="text"
                        onChange={handleInserts}
                        value={projectDetails && projectDetails.cust_address_po_code}
                        name="cust_address_po_code"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Order Date</Label>
                      <Input
                        type="date"
                        onChange={handleInserts}
                        value={projectDetails && projectDetails.order_date}
                        name="order_date"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Project</Label>
                      <Input
                        type="select"
                        name="record_type"
                        onChange={handleInserts}
                        value={projectDetails && projectDetails.record_type}
                      >
                        <option value="">Select</option>
                        <option value="New">Project</option>
                        <option value="Quoted">Tenancy Project</option>
                        <option value="Awarded">Tenancy Work</option>
                        <option value="Awarded">Maintenance</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Status </Label>
                      <Input
                        type="select"
                        name="order_status"
                        defaultValue={projectDetails && projectDetails.status}
                        onChange={handleInserts}
                      >
                        <option value="">Please Select</option>
                        <option defaultValue="selected" value="WIP">
                          WIP
                        </option>
                        <option value="Billable">Billable</option>
                        <option value="Billed">Billed</option>
                        <option value="Complete">Complete</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Latest">Latest</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      type="button"
                      color="primary"
                      className="btn shadow-none mr-2"
                      onClick={() => {
                        setFinanceModal(false);
                        insertOrder();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      className="shadow-none"
                      color="secondary"
                      onClick={() => {
                        setFinanceModal(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </FormGroup>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CreateFinance;
