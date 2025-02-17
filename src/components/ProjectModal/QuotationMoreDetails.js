import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import moment from 'moment';

import * as Icon from 'react-feather';
import api from '../../constants/api';
import message from '../Message';
import ViewLineItemModal from './ViewLineItemModal';
import EditQuotation from './EditQuotation';
import QuotationViewLineItem from './QuotationViewLineItems';

export default function QuotationMoreDetails({ id }) {
  QuotationMoreDetails.propTypes = {
    id: PropTypes.any,
  };

  const [quotation, setQuotation] = useState();
  const [quoteData, setQuoteData] = useState();
  const [quotelineItem, setQuoteLineItem] = useState();
  const [editQuoteModal, setEditQuoteModal] = useState();
  const [quotationViewLineItem, setQuotationViewLineItem] = useState();
  //const [viewLineModal, setViewLineModal] = useState();

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
      <Form className="mt-4">
        <Row className="border-bottom mb-3">
          <Col>
            <FormGroup>
              <Label>Revision</Label>{' '}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Quote Date</Label>{' '}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Quote Code</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Quote Status</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Discount </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Amount </Label>
            </FormGroup>
          </Col>
          <Col></Col>

          <Col>
            <FormGroup>
              <Label>Action</Label>
            </FormGroup>
          </Col>
        </Row>

        {quotation &&
          quotation.map((element) => {
            return (
              <Row>
                <Col>
                  <FormGroup>
                    <Label>{element.revision}</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>{element.quote_date ? moment(element.quote_date).format('YYYY-MM-DD') : ''}</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                  <span>{element.quote_code}</span>
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
                      <Link to="">
                        <span
                          onClick={() => {
                            //setSubCon(element.quote_id);
                           // setViewLineModal(true);
                           setQuotationViewLineItem(true);
                          }}
                        >
                          <u> View Line Items</u>
                        </span>
                      </Link>
                    </Label>
                  </FormGroup>
                </Col>

                <Col>
                  <FormGroup>
                    <Row>
                      <Col md="2">
                        <Label>
                          <Link to="">
                            <span
                              onClick={() => {
                                // setWorkData(element);
                                setQuoteData(element);
                                setEditQuoteModal(true);
                              }}
                            >
                              <Icon.Edit />
                            </span>
                          </Link>
                        </Label>
                      </Col>
                      <Col md="2">
                        <Label>
                          <Link to="">
                            <span>
                              <Icon.Printer />
                            </span>
                          </Link>
                        </Label>
                      </Col>
                      <Col md="2">
                        <Label>
                          <Link to="">
                            {' '}
                            <span
                              onClick={() => {
                                // setSubCon(element.sub_con_work_order_id);
                                 setQuoteLineItem(true);
                              }}
                            >
                              <Icon.PlusCircle />
                            </span>{' '}
                          </Link>
                        </Label>
                      </Col>
                    </Row>
                  </FormGroup>

                  {/* <ViewQuoteLogModal
          viewQuotationsModal={viewQuotationsModal}
          setViewQuotationsModal={setViewQuotationsModal}
        /> */}
                 {quotelineItem && <ViewLineItemModal
                    
                    quotelineItem={quotelineItem}
                    setQuoteLineItem={setQuoteLineItem}

                    id={id}
                  />}
                  <EditQuotation
                    editQuoteModal={editQuoteModal}
                    setEditQuoteModal={setEditQuoteModal}
                   quoteData={quoteData}
                   
                  />
                  {quotationViewLineItem&& <QuotationViewLineItem quotationViewLineItem={quotationViewLineItem} setQuotationViewLineItem={setQuotationViewLineItem} projectId={id} />}
                </Col>
              </Row>
            );
          })}
      </Form>
    </>
  );
}
