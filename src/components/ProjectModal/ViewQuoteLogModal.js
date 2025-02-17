import React, { useState,useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';
import QuoteLogViewLineItems from './QuoteLogViewLineItems';

const ViewQuoteLogModal = ({ viewQuotationsModal, setViewQuotationsModal ,id}) => {
  ViewQuoteLogModal.propTypes = {
    viewQuotationsModal: PropTypes.bool,
    setViewQuotationsModal: PropTypes.func,
    id:PropTypes.func,
  };

  const [quoteLogViewLineItem, setQuoteLogViewLineItem] = useState(false);
  const [quotation, setQuotation] = useState(false);
  const getquotations = () => {
    api
      .post('/projecttabquote/getTabQuoteById', { project_id: id })
      .then((res) => {
        setQuotation(res.data.data);
      })
      .catch(() => {
        message(' quote Data not found', 'info');
      });
  };

  useEffect(() => {
    getquotations();
  }, [id]);
  return (
    <>
      <Modal size="xl" isOpen={viewQuotationsModal}>
        <ModalHeader>
          <div>Quote History</div>
          <Button
            color="secondary"
            onClick={() => {
              setViewQuotationsModal(false);
            }}
          >
            {' '}
            X{' '}
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
                  Quotations
                </CardTitle>
                <CardBody>
                  <Form>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>Revision</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>Quote Code</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>Quote Date</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>Quote Status</Label>
                        </FormGroup>
                      </Col>
                      <Col md="1">
                        <FormGroup>
                          <Label>Discount</Label>
                        </FormGroup>
                      </Col>
                      <Col md="1">
                        <FormGroup>
                          <Label>Amount</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>Action</Label>{' '}
                        </FormGroup>
                      </Col>
                    </Row>
                   
                      
                      {quotation &&
          quotation.map((element) => {
            return (
              <Row>
                <Col>
                  <FormGroup>
                    <Label>{element.revision}</Label>{' '}
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                  <Label>{element.quote_code}</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                  <Label>{element.quote_date ? moment(element.quote_date).format('YYYY-MM-DD') : ''}</Label>
                  </FormGroup>
                </Col>
                 <Col>
                  <FormGroup>
                    <Label>{element.quote_status}</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>{element.discount}</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>{element.total_amount}</Label>
                  </FormGroup>
                </Col>
                      <Col>
                        <FormGroup>
                          <Label>
                            <Link to="" color="primary">
                              <span
                                onClick={() => {
                                  setQuoteLogViewLineItem(true);
                                }}
                              >
                                <u>View Line Items</u>
                              </span>
                            </Link>
                          </Label>
                          <QuoteLogViewLineItems
                            quoteLogViewLineItem={quoteLogViewLineItem}
                            setQuoteLogViewLineItem={setQuoteLogViewLineItem}
                            id={id}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Row>
                            <Col md="4">
                              <Label>
                                <Link to="">
                                  <span>
                                    <Icon.Printer />
                                  </span>
                                </Link>
                              </Label>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>
                    
                    );
                  })}
                  
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        {/* <ModalFooter>
                <Button color="secondary" onClick={()=>{setViewQuotationsModal(false)}}>
                Cancel
                </Button>
            </ModalFooter> */}
      </Modal>
    </>
  );
};

export default ViewQuoteLogModal;
