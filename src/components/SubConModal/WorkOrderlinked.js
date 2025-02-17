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

const WorkOrderLinked = ({ editWorkOrderLinked, setEditWorkOrderLinked }) => {
  WorkOrderLinked.propTypes = {
    editWorkOrderLinked: PropTypes.bool,
    setEditWorkOrderLinked: PropTypes.func,
  };
  //All const Variable
  const { id } = useParams();
  const [SubConReceipt, setSubConReceipt] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [createSubCon, setCreateReceipt] = useState({
    amount: 0,
  });
  const [selectedSubCon, setselectedSubCon] = useState([]);
  const [subConWork, setSubConWork] = useState([]);

 

// console.log(SubConReceipt)
  //getting data
  const handleInputreceipt = (e) => {
    if (e.target.name === 'amount') {
      // eslint-disable-next-line
      setTotalAmount(parseInt(e.target.value));
    }
    setCreateReceipt({ ...createSubCon, [e.target.name]: e.target.value });
  };
  //Inserting subcon-receipt
  const insertPaymentHistory =  (createSubConHistory) => {
    api
      .post('/subcon/insertsub_con_payments_history', createSubConHistory)
      .then(() => {
        message('History inserted successfully.');
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  //Chaning subcon status
  const editSubConStatus = (subconId, Status) => {
    api
      .post('/subcon/editSubConStatus', {
        sub_con_work_order_id: subconId,
        status: Status,
      })
      .then(() => {
        message('data inserted successfully.');
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  const editSubconPartialStatus = (subconId, Status) => {
    api
      .post('/subcon/editSubconPartialStatus', {
        sub_con_work_order_id: subconId,
        status: Status,
      })
      .then(() => {
        message('data inserted successfully.');
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  

  const getSubConWork = () => {
    api
      .post('/subcon/getSubConWorkOrder', {sub_con_id: id })
      .then((res) => {
        setSubConWork(res.data.data[0].sub_con_work_order_id);
        console.log('order',res.data.data)
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };

  //Logic for deducting receipt amount
  const finalCalculation = (receipt) => {
    // console.log(receipt);
    let leftamount = totalAmount;
    
    for (let j = 0; j < selectedSubCon.length; j++) {
      
      if (selectedSubCon[j].remainingAmount <= leftamount) {
        console.log(parseFloat(leftamount) - selectedSubCon[j].remainingAmount)
        leftamount = parseFloat(leftamount) - selectedSubCon[j].remainingAmount
       selectedSubCon[j].paid = true;
        editSubConStatus(selectedSubCon[j].sub_con_work_order_id, 'Paid');
       
        insertPaymentHistory({
          creation_date: moment().format(),
          modification_date: moment().format(),
          work_order_date: '',
          invoice_paid_status: 'Paid',
          title: '',
          installment_id: '',
          receipt_type: '',
          related_sub_con_work_order_id: '',
          gst_amount: '',
          sub_con_work_order_id: selectedSubCon[j].sub_con_work_order_id,
          sub_con_payments_id: receipt,
          published: '1',
          flag: '1',

          created_by: 'admin',
          modified_by: 'admin',
          amount: selectedSubCon[j].remainingAmount,
        })
      } else {
        selectedSubCon[j].paid = leftamount;
        editSubconPartialStatus(selectedSubCon[j].sub_con_work_order_id, 'Partially Paid');
        insertPaymentHistory({
          creation_date: moment().format(),
          modification_date: moment().format(),

          work_order_date: '',
          invoice_paid_status: 'Partially paid',
          title: '',
          installment_id: '',
          receipt_type: '',
          related_sub_con_work_order_id: '',
          gst_amount: '',
          sub_con_work_order_id: selectedSubCon[j].sub_con_work_order_id,
          sub_con_payments_id: receipt,
          published: '1',
          flag: '1',

          created_by: 'admin',
          modified_by: 'admin',
          amount: leftamount,
        });
      }
    
    }

   
  };
   //Getting receipt data by order id
   const getSubConReceipt = () => {
    api.post('/subcon/getSubMakePayment', { sub_con_id: id ,sub_con_work_order_id: id}).then((res) => {
      const datafromapi = res.data.data;
      datafromapi.forEach((element) => {
        element.remainingAmount = element.prev_inv_amount - element.prev_amount ;
      });
      const result = datafromapi.filter(el=>{return el.prev_inv_amount !== el.prev_amount});
      setSubConReceipt(result);
    });
  };

  //Insert Receipt
  const insertReceipt =  () => {
    createSubCon.sub_con_id = id
    createSubCon.sub_con_work_order_id = subConWork
    if (createSubCon.amount ){
      if(totalAmount>=createSubCon.amount && (selectedSubCon.length>0)) {
        console.log('select',selectedSubCon)
      api
      .post('/subcon/insertsub_con_payments', createSubCon)
      .then((res) => {
        message('data inserted successfully.');
        
        finalCalculation(res.data.data.insertId);
      })
      .catch(() => {
        // console.log('Network connection error.');
      });
    }else{
      message('Enter the amount less than total amount.');
    }
    }
  };
  let invoices = [];
  const removeObjectWithId = (arr, subConWorkerCode) => {
    const objWithIdIndex = arr.findIndex((obj) => obj.sub_con_worker_code === subConWorkerCode);

    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }

    return arr;
  };
  const getsubcon = (checkboxVal, invObj) => {
    if (checkboxVal.target.checked === true) {
      setselectedSubCon([...selectedSubCon, invObj]);
    } else {
      invoices = removeObjectWithId(selectedSubCon, invObj.sub_con_worker_code);
      setselectedSubCon(invoices);
      // console.log(invoices)
    }
    
  };

 

  //Calculation for subcon Payment checkbox amount
  const addAndDeductAmount = (checkboxVal, receiptObj) => {
    
    const remainingAmount = receiptObj.prev_inv_amount - receiptObj.prev_amount;
    if (checkboxVal.target.checked === true) {
      setTotalAmount(parseFloat(totalAmount) + parseFloat(remainingAmount));
      setCreateReceipt({
        ...createSubCon,
        amount: (parseFloat(createSubCon.amount) + parseFloat(remainingAmount)).toString(),
      });
    } else {
      setTotalAmount(parseFloat(totalAmount) - parseFloat(remainingAmount));
      setCreateReceipt({
        ...createSubCon,
        amount: parseFloat(createSubCon.amount) - parseFloat(remainingAmount),
      });
    }
  };
  useEffect(() => {
    getSubConReceipt();
    getSubConWork();
  }, [id]);
  return (
    <>
      <Modal size="lg" isOpen={editWorkOrderLinked}>
        <ToastContainer></ToastContainer>
        <ModalHeader>
          Create Receipt
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditWorkOrderLinked(false);
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
                    {SubConReceipt &&
                      SubConReceipt.map((singleInvoiceObj) => {
                        return (
                          <Row key={singleInvoiceObj.sub_con_id}>
                            <Col md="8">
                              <FormGroup check>
                                <Input
                                  onChange={(e) => {
                                    addAndDeductAmount(e, singleInvoiceObj);
                                    getsubcon(e, singleInvoiceObj);
                                  }}
                                  name="sub_con_worker_code(prev_inv_amount)"
                                  type="checkbox"
                                />
                                <span>
                                   {singleInvoiceObj.sub_con_worker_code}  (
                                  {singleInvoiceObj.prev_inv_amount})    Paid -{' '}
                                  {singleInvoiceObj.prev_amount}
                                </span>
                              </FormGroup>
                            </Col>
                          </Row>
                        );
                      })}
                    <br></br>
                    { SubConReceipt && SubConReceipt.length>0?
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <Label>Amount</Label>
                          <Input
                            type="numbers"
                            onChange={handleInputreceipt}
                            value={createSubCon && createSubCon.amount}
                            defaultValue={totalAmount.toString()}
                            name="amount"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="8">
                        <FormGroup>
                          <Label>
                            {' '}
                            Mode Of Payment {' '}
                          </Label>
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

                      <Col md="8">
                        <FormGroup>
                          <Label>Notes</Label>
                          <Input
                            type="text"
                            onChange={handleInputreceipt}
                            defaultValue={createSubCon && createSubCon.remarks}
                            name="remarks"
                          />
                        </FormGroup>
                      </Col>
                    </Row>:<span>Sorry</span>}
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
              setEditWorkOrderLinked(false);

            }}
          >
            {' '}
            Submit{' '}
          </Button>
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditWorkOrderLinked(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default WorkOrderLinked;
