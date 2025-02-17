import React, {  useState } from 'react';
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


const CreateFinance = ({ financeModal, setFinanceModal, }) => {
  CreateFinance.propTypes = {
    financeModal: PropTypes.bool,
    setFinanceModal: PropTypes.func,
    };

  const [createOrder, setCreateOrder] = useState();
  const handleInserts = (e) => {
    setCreateOrder({ ...createOrder, [e.target.name]: e.target.value });
  };

 
  //Insert order for finance module
  const insertOrder = () => {
    api
      .post('/finance/insertOrder', createOrder)
      .then((res) => {
        message('Invoice inserted successfully.', 'success');
        setCreateOrder(res.data.data);
      })
      .catch(() => {
        message('Network connection error.');
      });
  };

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
                                value={createOrder && createOrder.company_name}
                                name="company_name"
                              />
                            </FormGroup>
                          </Col>
                  <Col md="4">
                            <FormGroup>
                              <Label>Order Date</Label>
                              <Input
                                type="date"
                                onChange={handleInserts}
                                value={createOrder && createOrder.order_date}
                                name="order_date"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Project Type</Label>
                              <Input
                                type="text"
                                onChange={handleInserts}
                                value={createOrder && createOrder.project_type}
                                name="project_type"
                              />
                            </FormGroup>
                          </Col>
                </Row>

                <Row>
              
                  <Col md="4">
                    <FormGroup>
                      <Label>Amount</Label>
                      <Input type="text" name="project_location" />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                            <FormGroup>
                              <Label>Status</Label>
                              <Input
                                type="text"
                                onChange={handleInserts}
                                value={createOrder && createOrder.order_status}
                                name="order_status"
                              />
                            </FormGroup>
                          </Col>
                </Row>
                 <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      type="button"
                      color='primary'
                      className="btn shadow-none mr-2"
                      onClick={() => {
                        setFinanceModal(false);
                        insertOrder();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button className='shadow-none'
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
