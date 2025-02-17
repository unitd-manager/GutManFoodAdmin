import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';
import QuoteviewEditItem from './QuoteviewEditItem';
//import WorkOrderEditModal from './WorkOrderEditModal';

const QuotationViewLineItem = ({ id, quotationViewLineItem, setQuotationViewLineItem ,quoteId}) => {
  QuotationViewLineItem.propTypes = {
    quotationViewLineItem: PropTypes.bool,
    setQuotationViewLineItem: PropTypes.func,
    id: PropTypes.any,
    quoteId:PropTypes.any,
  };

  const [quotation, setQuotationViewLineItems] = useState();
    const [quoteData, setQuoteData] = useState(false);
  const [quoteLine, setQuoteLine] = useState();
  const QuotationViewLine = () => {
    api
      .get('/projecttabquote/getTabQuoteLineItems', {
        project_id: id,
         quote_id: quoteId,
      })
      .then((res) => {
        setQuotationViewLineItems(res.data.data);
        console.log('SubConWorkOrderPortal', res.data.data);
      })
      .catch(() => {
        message(' LineItem Data not found', 'info');
      });
  };
  const QuotationDeleteItem = () => {
    api
      .post('/projecttabquote/deleteQuoteItems', {
        quote_items_id: id,
        
      })
      .then(() => {
        message('Record deteled successfully', 'success');
      })
      .catch(() => {
        message(' delete Line Data not found', 'info');
      });
  };
  //console.log('subconwork', subCon);
  useEffect(() => {
    QuotationViewLine();
  }, []);

  return (
    <>
      <Modal size="xl" isOpen={quotationViewLineItem}>
        <ModalHeader>
          View Line Items
          <Button
            color="secondary"
            onClick={() => {
              setQuotationViewLineItem(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <table className="lineitem border border-secondary rounded">
            <thead>
              <tr>
                <th scope="col">Title </th>
                <th scope="col">Description </th>
                <th scope="col">Qty</th>
                <th scope="col">UOM</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Amount</th>
                <th scope="col">Updated By</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {quotation &&
                quotation.map((e) => {
                  return (
                    <tr>
                      <td>{e.title}</td>
                      <td>{e.description}</td>
                      <td>{e.quantity}</td>
                      <td>{e.unit}</td>
                      <td>{e.unit_price}</td>
                      <td>{e.amount} </td>
                      <td></td>
                      
                      <td>
                        <Row>
                          <Col md="3">
                            <Label>
                              <Link to="">
                                <span
                                  onClick={() => {
                                    setQuoteLine(e);
                                    setQuoteData(true);
                                  }}
                                >
                                  <Icon.Edit />
                                </span>
                              </Link>
                            </Label>
                          </Col>
                          <Col md="3">
                            <Label>
                              <Link to="">
                                <span
                                  onClick={() => {
                                    // setQuoteLine(e);
                                   
                                    QuotationDeleteItem();
                                  }}
                                >
                                  <Icon.Delete />
                                </span>{' '}
                              </Link>
                            </Label>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {quoteData && (
            <QuoteviewEditItem
              quoteLine={quoteLine}
              quoteData={quoteData}
              setQuoteData={setQuoteData}
            ></QuoteviewEditItem>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setQuotationViewLineItem(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default QuotationViewLineItem;
