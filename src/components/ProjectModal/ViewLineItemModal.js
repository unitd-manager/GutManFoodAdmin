import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as $ from 'jquery';
import random from 'random';
import api from '../../constants/api';
import message from '../Message';

const LineItemData = ({ quotelineItem, setQuoteLineItem, id, quote }) => {
  LineItemData.propTypes = {
    quotelineItem: PropTypes.bool,
    setQuoteLineItem: PropTypes.func,
    id: PropTypes.any,
    quote: PropTypes.any,
  };
  //All state Varible

  // const {id} = useParams()
  const [totalAmount, setTotalAmount] = useState(0);
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      title:'',
      quantity: '',
      unit_price: '',
      amount: '',
      description: '',
    },
  ]);
  //Insert Invoice Item
  const addLineItemApi = (obj) => {
    obj.project_id = id;
    obj.quote_id = quote;
    api
      .post('/projecttabquote/insertQuoteItems', obj)
      .then(() => {
        message('Line Item Added Successfully', 'sucess');
      })
      .catch(() => {
        message('Cannot Add Line Items', 'error');
      });
  };

 
  //Add new line item
  const AddNewLineItem = () => {
    setAddLineItem([
      ...addLineItem,
      {
        id: new Date().getTime().toString(),
        title:'',
        quantity: '',
        unit_price: '',
        amount: '',
        description: '',
      },
    ]);
  };

  //Invoice item values
  const getAllValues = () => {
    const result = [];
    $('.lineitem tbody tr').each(() => {
      const allValues = {};
      $(this)
        .find('input')
        .each(() => {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
        });
      result.push(allValues);
    });
    console.log(result);
    setTotalAmount(0);
    result.forEach((element) => {
      addLineItemApi(element);
    });
  };
  //Invoice Items Calculation
  const calculateTotal = () => {
    let totalValue = 0;
    const result = [];
    $('.lineitem tbody tr').each(() => {
      const allValues = {};
      $(this)
        .find('input')
        .each(() => {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
          allValues.amount = allValues.quantity * allValues.unit_price;
        });
      result.push(allValues);
    });
    result.forEach((e) => {
      if (e.amount) {
        totalValue += parseFloat(e.amount);
      }
    });
    setAddLineItem(result);
    setTotalAmount(totalValue);
  };

  // Clear row value
  const ClearValue = (ind) => {
    setAddLineItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
    if (ind.amount) {
      const finalTotal = totalAmount - parseFloat(ind.amount);
      setTotalAmount(finalTotal);
    }
  };
  return (
    <>
      <Modal size="xl" isOpen={quotelineItem}>
        <ModalHeader>
          Add Line Item
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
                setQuoteLineItem(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Form>
                    <Card>
                      <Row>
                        <Row>
                          <Col md="3">
                            <Button
                              className="shadow-none"
                              color="primary"
                              type="button"
                              onClick={() => {
                                AddNewLineItem();
                              }}
                            >
                              Add Line Item
                            </Button>
                            {/* <Col> <Input
                                        
                                        type="text"
                                        name="discount"
                                      /></Col> */}
                          </Col>
                        </Row>

                        {/* Invoice Item */}
                        <Card>
                          <table className="lineitem">
                            <thead>
                              <tr>
                              <th scope="col">Title </th>
                                <th scope="col">Description </th>
                                <th scope="col">Qty</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Amount</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {addLineItem.map((item) => {
                                return (
                                  <tr key={item.id}>
                                     <td data-label="Title">
                                      <Input
                                        defaultValue={item.title}
                                        type="text"
                                        name="title"
                                      />
                                    </td>
                                    <td data-label="Description">
                                      <Input
                                        defaultValue={item.description}
                                        type="text"
                                        name="description"
                                      />
                                    </td>

                                    <td data-label="Qty">
                                      <Input
                                        defaultValue={item.quantity}
                                        type="number"
                                        name="quantity"
                                      />
                                    </td>
                                    <td data-label="Unit Price">
                                      <Input
                                        defaultValue={item.unit_price}
                                        onBlur={() => {
                                          calculateTotal();
                                        }}
                                        type="number"
                                        name="unit_price"
                                      />
                                    </td>
                                    <td data-label="Amount">
                                      <Input
                                        defaultValue={item.amount}
                                        type="text"
                                        name="amount"
                                        disabled
                                      />
                                    </td>
                                    <td data-label="Action">
                                      <Link to="">
                                        <Input
                                          type="hidden"
                                          name="id"
                                          defaultValue={item.id}
                                        ></Input>
                                        <span
                                          onClick={() => {
                                            ClearValue(item);
                                          }}
                                        >
                                          Clear
                                        </span>
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </Card>
                        <ModalFooter>
                          <Button
                            className="shadow-none"
                            color="primary"
                            onClick={() => {
                              getAllValues();
                            }}
                          >
                            {' '}
                            Submit{' '}
                          </Button>
                          <Button
                            className="shadow-none"
                            color="secondary"
                            onClick={() => {
                                setQuoteLineItem(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Row>
                    </Card>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LineItemData;
