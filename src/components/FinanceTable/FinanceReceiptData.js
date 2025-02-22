import React, { useEffect, useState } from 'react';
import {
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
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';

const FinanceReceiptData = ({ editCreateReceipt, setEditCreateReceipt,orderId, projectInfo }) => {
  FinanceReceiptData.propTypes = {
    editCreateReceipt: PropTypes.bool,
    setEditCreateReceipt: PropTypes.func,
    orderId: PropTypes.any,
    projectInfo: PropTypes.any,
  };
  //All const Variable
  const [invoiceReceipt, setInvoiceReceipt] = useState();
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const [totalAmount, setTotalAmount] = useState(0);
  const [createReceipt, setCreateReceipt] = useState({
    amount: 0,
    order_id:orderId,
    receipt_status:"Paid",
    receipt_date:moment(),
    receipt_code: '',
  });
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  //Setting Data in createReceipt
  const handleInputreceipt = (e) => {
    if(e.target.name === 'amount'){
      // eslint-disable-next-line
      setTotalAmount(parseInt(e.target.value))
    }
    setCreateReceipt({ ...createReceipt, [e.target.name]: e.target.value });
  };

  
  const insertReceiptHistory = (createReceiptHistory) => {
    api
      .post('/finance/insertInvoiceReceiptHistory', createReceiptHistory)
      .then(() => {
        message('data inserted successfully.');
        window.location.reload()
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  
  const editInvoiceStatus = (invoiceId, Status) => {
    api
      .post('/invoice/editInvoiceStatus', {
        invoice_id: invoiceId,
        status: Status,
      })
      .then(() => {
        message('data inserted successfully.');
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  const editInvoicePartialStatus = (invoiceId, Status) => {
    api
      .post('/invoice/editInvoicePartialStatus', {
        invoice_id: invoiceId,
        status: Status,
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
    let leftamount = totalAmount 
    // selectedInvoice.forEach(element => {
    //   if(element.prev_amount < leftamount){
    //     leftamount = parseFloat(leftamount) - element.prev_amount
    //     element.paid = true
    //   }
     
    // });
     // Insert Receipt History
  
     for (let j = 0; j < selectedInvoice.length; j++){

      if(selectedInvoice[j].remainingAmount <= leftamount){
        leftamount = parseFloat(leftamount) - selectedInvoice[j].remainingAmount
        selectedInvoice[j].paid = true;
        editInvoiceStatus(selectedInvoice[j].invoice_id, 'Paid');
        insertReceiptHistory({
          invoice_id: selectedInvoice[j].invoice_id,
              receipt_id: receipt,
              published: '1',
              flag: '1',
              creation_date: '',
              modification_date: '',
              created_by: 'admin',
              modified_by: 'admin',
              amount: selectedInvoice[j].remainingAmount,
              site_id: '1'
        })
        
      }else{
        selectedInvoice[j].partiallyPaid = true;
        editInvoicePartialStatus(selectedInvoice[j].invoice_id, 'Partial Payment');
        insertReceiptHistory({
          invoice_id: selectedInvoice[j].invoice_id,
              receipt_id: receipt,
              published: '1',
              flag: '1',
              creation_date: '',
              modification_date: '',
              created_by: 'admin',
              modified_by: 'admin',
              amount:leftamount,
              site_id: '1',
             
        })
      }
      }
  };
  

  //Insert Receipt
  const insertReceipt =async (code)=> {
    createReceipt.project_id = projectInfo;
    createReceipt.receipt_code = code;
    // createReceipt.receipt_date = moment()
    // if (createReceipt.mode_of_payment && (selectedInvoice.length>0)){
    // if(totalAmount>=createReceipt.amount) {
    api
      .post('/finance/insertreceipt', createReceipt)
      .then((res) => {
        message('data inserted successfully.');
          finalCalculation(res.data.data.insertId)
          window.location.reload()
      })
      .catch(() => {
        message('Network connection error.');
      }) .finally(() => {
        setSubmitting(false); // Reset the submitting state after the API call completes (success or error).
      });
  //   }
  // }
  // //    else {
  //     message('Please fill all required fields', 'warning');
  //  }
  };
  const generateCode = () => {
    api
      .post('/commonApi/getCodeValue', { type:'receipt'})
      .then((res) => {
        insertReceipt(res.data.data);
      })
      .catch(() => {
        insertReceipt('');
      });
  };
  let invoices = [];
  const removeObjectWithId = (arr, invoiceId) => {
    const objWithIdIndex = arr.findIndex((obj) => obj.invoiceId === invoiceId);

    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }

    return arr;
  };
  const getInvoices = (checkboxVal, invObj) => {
    if (checkboxVal.target.checked === true) {
      setSelectedInvoice([...selectedInvoice, invObj]);
    } else {
      invoices = removeObjectWithId(invoiceReceipt, invObj.invoice_code);
      setSelectedInvoice(invoices);
    }
  };



  // const insertInvoices = () => {
  //   invoices.forEach((obj) => {
  //     insertReceiptHistory(obj);
  //   });
  // };

  //Getting receipt data by order id
  const getinvoiceReceipt = () => {
    api.post('/invoice/getInvoiceReceiptById', { order_id: orderId }).then((res) => {
      const datafromapi = res.data.data
      datafromapi.forEach(element => {
        element.remainingAmount = element.invoice_amount - element.prev_amount
      });
      const result = datafromapi.filter(el=>{return el.invoice_amount !== el.prev_amount});
      setInvoiceReceipt(result);
    });
  };
  //Calculation for Invoice checkbox amount
  const result = [];
  const addAndDeductAmount = (checkboxVal, receiptObj) => {
    const remainingAmount = receiptObj.invoice_amount - receiptObj.prev_amount
    if (checkboxVal.target.checked === true) {
      setTotalAmount(parseFloat(totalAmount) + parseFloat(remainingAmount));
      setCreateReceipt({
        ...createReceipt,
        amount: (parseFloat(createReceipt.amount) + parseFloat(remainingAmount)).toString(),
      });
      result.push(remainingAmount);
    } else {
      setTotalAmount(parseFloat(totalAmount) - parseFloat(remainingAmount));
      setCreateReceipt({
        ...createReceipt,
        amount: parseFloat(createReceipt.amount) - parseFloat(remainingAmount),
      });
    }
    
  };
  
  useEffect(() => {
    getinvoiceReceipt();
  }, [id]);
  return (
    <>
      <Modal size="md=6" isOpen={editCreateReceipt}>
         <ModalHeader>
          Create Receipt
          <Button className='shadow-none'
            color="secondary"
            onClick={() => {
              setEditCreateReceipt(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
                  <Form>
                    {invoiceReceipt &&
                      invoiceReceipt.map((singleInvoiceObj) => {
                        return (
                          <Row key={singleInvoiceObj.invoice_id}>
                            <Col md="12">
                              <FormGroup check>
                                <Input
                                  onChange={(e) => {
                                    addAndDeductAmount(e, singleInvoiceObj);
                                    getInvoices(e, singleInvoiceObj);
                                  }}
                                  name="invoice_code(prev_amount)"
                                  type="checkbox"
                                />
                                <span>
                                  {singleInvoiceObj.invoice_code}({singleInvoiceObj.invoice_amount})
                                  Paid - {singleInvoiceObj.prev_amount}
                                </span>
                              </FormGroup>
                            </Col>
                          </Row>
                        );
                      })}
                    <br></br>
                    {/* { invoiceReceipt && invoiceReceipt.length>0? */}
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Label>Amount</Label>
                          <Input
                            type="text"
                            onChange={handleInputreceipt}
                            value={createReceipt && createReceipt.amount}
                            defaultValue={totalAmount.toString()}
                            name="amount"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Date</Label>
                          <Input
                            type="date"
                            onChange={handleInputreceipt}
                            value={createReceipt && moment(createReceipt.receipt_date).format('YYYY-MM-DD')}
                            name="receipt_date"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>{' '}Mode Of Payment <span className="required">*</span>{' '}</Label>
                          <Input type="select" name="mode_of_payment" onChange={handleInputreceipt}>
                            <option value="" selected="selected">
                              Please Select
                            </option>
                            <option value="cash">Cash</option>
                            <option value="cheque">Cheque</option>
                            <option value="giro">Giro</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      {createReceipt && createReceipt.mode_of_payment === 'cheque' && (
                        <Col md="12">
                          <FormGroup>
                            <Label>Check No</Label>
                            <Input
                              type="numbers"
                              onChange={handleInputreceipt}
                              value={createReceipt && createReceipt.cheque_no}
                              name="cheque_no"
                            />
                          </FormGroup>
                        </Col>
                      )}
                      {createReceipt && createReceipt.mode_of_payment === 'cheque' && (
                        <Col md="12">
                          <FormGroup>
                            <Label>Check date</Label>
                            <Input
                              type="date"
                              onChange={handleInputreceipt}
                              value={createReceipt && createReceipt.cheque_date}
                              name="cheque_date"
                            />
                          </FormGroup>
                        </Col>
                      )}
                      {createReceipt && createReceipt.mode_of_payment === 'cheque' && (
                        <Col md="12">
                          <FormGroup>
                            <Label>Bank</Label>
                            <Input
                              type="numbers"
                              onChange={handleInputreceipt}
                              value={createReceipt && createReceipt.bank_name}
                              name="bank_name"
                            />
                          </FormGroup>
                        </Col>
                      )}
                      <Col md="12">
                        <FormGroup>
                          <Label>Notes</Label>
                          <Input
                            type="text"
                            onChange={handleInputreceipt}
                            defaultValue={createReceipt && createReceipt.remarks}
                            name="remarks"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* :<span>Sorry</span>} */}
                  </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
        <Button
  className="shadow-none"
  color="primary"
  onClick={() => {
    if (!submitting) {
      setSubmitting(true);
      if (parseFloat(createReceipt.amount) > 0) {
        generateCode();
      } else {
        // Show an error message indicating that the amount should be greater than 0
        message('Amount must be greater than 0', 'warning');
        setSubmitting(false); // Reset submitting state
      }
    }
  }}
  disabled={submitting}
>
  {' '}
  Submit{' '}
</Button>
          <Button className='shadow-none'
            color="secondary"
            onClick={() => {
              setEditCreateReceipt(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FinanceReceiptData;
