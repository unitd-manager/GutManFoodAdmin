import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';

const PurchaseOrderLinked = ({ editPurchaseOrderLinked, setEditPurchaseOrderLinked }) => {
  PurchaseOrderLinked.propTypes = {
    editPurchaseOrderLinked: PropTypes.bool,
    setEditPurchaseOrderLinked: PropTypes.func,
  };
  //All const Variable
  const { id } = useParams();
  const [SupplierReceipt, setSupplierReceipt] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [createSupplier, setCreateReceipt] = useState({
    amount: 0,
  });
  const [selectedSupplier, setSelectedSupplier] = useState([]);

  //getting data
  const handleInputreceipt = (e) => {
    if (e.target.name === 'amount') {
      // eslint-disable-next-line
      setTotalAmount(parseInt(e.target.value));
    }
    setCreateReceipt({ ...createSupplier, [e.target.name]: e.target.value });
  };
  //Inserting supplier-receipt
  const insertReceiptHistory =  (createSupplierHistory) => {
    api
      .post('/supplier/insert-SupplierReceiptsHistory', createSupplierHistory)
      .then(() => {
        message('History inserted successfully.');
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  //Chaning purchase status
  const editPurchaseStatus = (supplierId, Status) => {
    api
      .post('/supplier/editPurchaseStatus', {
        purchase_order_id: supplierId,
        payment_status: Status,
      })
      .then(() => {
        message('data inserted successfully.');
      })
      .catch(() => {
        message('Network connection error.');
      });
  };

  const editPurchasePartialStatus = (supplierId, Status) => {
    api
      .post('/supplier/editPartialPurchaseStatus', {
        purchase_order_id: supplierId,
        payment_status: Status,
      })
      .then(() => {
        message('data inserted successfully.');
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  

  //Logic for deducting receipt amount
  const finalCalculation = (receipt) => {
    // console.log(receipt);
    let leftamount = totalAmount;
    
    for (let j = 0; j < selectedSupplier.length; j++) {
      
      if (selectedSupplier[j].remainingAmount <= leftamount) {
        console.log(parseFloat(leftamount) - selectedSupplier[j].remainingAmount)
        leftamount = parseFloat(leftamount) - selectedSupplier[j].remainingAmount
       selectedSupplier[j].paid = true;
        editPurchaseStatus(selectedSupplier[j].purchase_order_id, 'Paid');
       
        insertReceiptHistory({
          creation_date: moment().format(),
          modification_date: moment().format(),
          purchase_order_date: '',
          invoice_paid_status: 'Paid',
          title: '',
          installment_id: '',
          receipt_type: '',
          related_purchase_order_id: '',
          gst_amount: '',
          purchase_order_id: selectedSupplier[j].purchase_order_id,
          supplier_receipt_id: receipt,
          published: '1',
          flag: '1',

          created_by: 'admin',
          modified_by: 'admin',
          amount: selectedSupplier[j].remainingAmount,
        })
      } else {
        selectedSupplier[j].paid = true;
        editPurchasePartialStatus(selectedSupplier[j].purchase_order_id, 'Partially Paid');
        insertReceiptHistory({
          creation_date: moment().format(),
          modification_date: moment().format(),

          purchase_order_date: '',
          invoice_paid_status: 'Partially paid',
          title: '',
          installment_id: '',
          receipt_type: '',
          related_purchase_order_id: '',
          gst_amount: '',
          purchase_order_id: selectedSupplier[j].purchase_order_id,
          supplier_receipt_id: receipt,
          published: '1',
          flag: '1',

          created_by: 'admin',
          modified_by: 'admin',
          amount: leftamount,
        });
      }
    
    }

   
  };

  //Insert Receipt
  const insertReceipt = () => {
    createSupplier.supplier_id = id

    if (createSupplier.amount &&
      createSupplier.mode_of_payment && (selectedSupplier.length>0)) {
        console.log('select',selectedSupplier)
      api
      .post('/supplier/insert-SupplierReceipt', createSupplier)
      .then((res) => {
        message('data inserted successfully.');
        
        finalCalculation(res.data.data.insertId);
      })
      .catch(() => {
        // console.log('Network connection error.');
      });
    }
  };
  let invoices = [];
  const removeObjectWithId = (arr, poCode) => {
    const objWithIdIndex = arr.findIndex((obj) => obj.po_code === poCode);

    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }

    return arr;
  };
  const getSupplier = (checkboxVal, invObj) => {
    if (checkboxVal.target.checked === true) {
      setSelectedSupplier([...selectedSupplier, invObj]);
    } else {
      invoices = removeObjectWithId(selectedSupplier, invObj.po_code);
      setSelectedSupplier(invoices);
      // console.log(invoices)
    }
    
  };
  // const insertInvoices = () => {
  //   invoices.forEach((obj) => {
  //     insertReceiptHistory(obj);
  //   });
  // };

  //Getting receipt data by order id
  const getSupplierReceipt = () => {
    api.post('/supplier/getMakePayment', { supplier_id: id }).then((res) => {
      const datafromapi = res.data.data;
      datafromapi.forEach((element) => {
        element.remainingAmount = element.prev_inv_amount - element.prev_amount ;
      });
      setSupplierReceipt(datafromapi);
    });
  };

  //Calculation for Supplier Payment checkbox amount
  const addAndDeductAmount = (checkboxVal, receiptObj) => {
    
    const remainingAmount = receiptObj.prev_inv_amount - receiptObj.prev_amount;
    if (checkboxVal.target.checked === true) {
      setTotalAmount(parseFloat(totalAmount) + parseFloat(remainingAmount));
      setCreateReceipt({
        ...createSupplier,
        amount: (parseFloat(createSupplier.amount) + parseFloat(remainingAmount)).toString(),
      });
    } else {
      setTotalAmount(parseFloat(totalAmount) - parseFloat(remainingAmount));
      setCreateReceipt({
        ...createSupplier,
        amount: parseFloat(createSupplier.amount) - parseFloat(remainingAmount),
      });
    }
  };
  useEffect(() => {
    getSupplierReceipt();
  }, [id]);
  return (
    <>
      <Modal size="lg" isOpen={editPurchaseOrderLinked}>
        <ToastContainer></ToastContainer>
        <ModalHeader>
          Create Receipt
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditPurchaseOrderLinked(false);
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
                    {SupplierReceipt &&
                      SupplierReceipt.map((singleInvoiceObj) => {
                        return (
                          <Row>
                            <Col md="8">
                              <FormGroup check>
                                <Input
                                  onChange={(e) => {
                                    addAndDeductAmount(e, singleInvoiceObj);
                                    getSupplier(e, singleInvoiceObj);
                                  }}
                                  name="po_code(prev_inv_amount)"
                                  type="checkbox"
                                />
                                <span>
                                   {singleInvoiceObj.po_code} 
                                  ({singleInvoiceObj.prev_inv_amount}) Paid -{' '}
                                  {singleInvoiceObj.prev_amount}
                                </span>
                              </FormGroup>
                            </Col>
                          </Row>
                        );
                      })}
                    <br></br>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <Label>Amount</Label>
                          <Input
                            type="numbers"
                            onChange={handleInputreceipt}
                            value={createSupplier && createSupplier.amount}
                            defaultValue={totalAmount.toString()}
                            name="amount"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="8">
                        <FormGroup>
                          <Label>
                            {' '}
                            Mode Of Payment <span className="required">*</span>{' '}
                          </Label>
                          <Input type="select" name="mode_of_payment" onChange={handleInputreceipt}>
                            <option defaultValue="selected">
                              Please Select
                            </option>
                            <option value="cash">Cash</option>
                            <option value="cheque">Cheque</option>
                            <option value="giro">Giro</option>
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col md="8">
                        <FormGroup>
                          <Label>Notes</Label>
                          <Input
                            type="text"
                            onChange={handleInputreceipt}
                            defaultValue={createSupplier && createSupplier.remarks}
                            name="remarks"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              insertReceipt();
              setEditPurchaseOrderLinked(false);

            }}
          >
            {' '}
            Submit{' '}
          </Button>
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditPurchaseOrderLinked(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PurchaseOrderLinked;
