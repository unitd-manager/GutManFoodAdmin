import React, { useEffect, useState ,useContext} from 'react';
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
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const CreateReceipt = ({ editCreateReceipt, setEditCreateReceipt ,getReceiptById,getFinancesById}) => {
  CreateReceipt.propTypes = {
    editCreateReceipt: PropTypes.bool,
    getReceiptById:PropTypes.any,
    setEditCreateReceipt: PropTypes.func,
    getFinancesById:PropTypes.func,
  };
  //All const Variable
  const [invoiceReceipt, setInvoiceReceipt] = useState();
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const [totalAmount, setTotalAmount] = useState(0);
 
  const initialReceiptState = {
    amount: 0,
    order_id: id,
    receipt_status: "Paid",
    receipt_date: moment,
    receipt_code: '',
    mode_of_payment: '',
    cheque_no: 0,
    cheque_date: '',
    bank_name: '',
    remarks: '',
  };
  const [createReceipt, setCreateReceipt] =
    useState({ ...initialReceiptState });
  const [selectedInvoice, setSelectedInvoice] = useState([]);
   // Function to reset form fields
 const resetFormFields = () => {
  setTotalAmount(0);
  setCreateReceipt({ ...initialReceiptState });
  setSelectedInvoice([]);
};
  //Setting Data in createReceipt
  const handleInputreceipt = (e) => {
    if(e.target.name === 'amount'){
      // eslint-disable-next-line
      setTotalAmount(parseFloat(e.target.value))
    }
    setCreateReceipt({ ...createReceipt, [e.target.name]: e.target.value });
  };
//get staff details
const { loggedInuser } = useContext(AppContext);
  const editInvoiceStatus = (invoiceId, Status) => {
    api
      .post('/invoice/editInvoiceStatus', {
        invoice_id: invoiceId,
        status: Status,
      })
      .then(() => {
        getReceiptById();
        //message('data status inserted successfully.');
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
        getReceiptById();
        //message('data PartialStatus inserted successfully.');
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  
  const insertReceiptHistory = (createReceiptHistory) => {
    api
      .post('/finance/insertInvoiceReceiptHistory', createReceiptHistory)
      .then(() => {
        getReceiptById();
        getFinancesById();
        message('data  History inserted successfully.');        message('data inserted successfully.');
        setEditCreateReceipt(false); // Close the modal
        window.location.reload()
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
              created_by: '',
              modified_by: '',
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
              created_by: '',
              modified_by: '',
              amount:leftamount,
              site_id: '1',
             
        })
      }
      }
  };
  useEffect(() => {
    // Function to set the receipt date to today's date when the modal is opened
    const setTodayDate = () => {
      setCreateReceipt({
        ...createReceipt,
        receipt_date: moment().format('YYYY-MM-DD'), // Set the receipt_date to today's date
      });
    };

    if (editCreateReceipt) {
      setTodayDate(); // Set the receipt date when the modal is opened
    }
  }, [editCreateReceipt]); 

  //Insert Receipt
  const insertReceipt =async (code)=> {
    createReceipt.receipt_code = code;
    createReceipt.creation_date = creationdatetime;
    createReceipt.created_by = loggedInuser.first_name;
    // createReceipt.receipt_date = moment()
    // if ( createReceipt.mode_of_payment && createReceipt.amount && (selectedInvoice.length>0)){
    // if(totalAmount>=createReceipt.amount) {
    api
      .post('/finance/insertreceipt', createReceipt)
      .then((res) => {
        getReceiptById();
        getFinancesById();
        message('data inserted successfully.');
          finalCalculation(res.data.data.insertId);
          resetFormFields();
          setEditCreateReceipt(false); // Close the modal
      })
      .catch(() => {
        message('Network connection error.');
      })  
    };
      // .finally(() => {
      //   setSubmitting(false); // Reset the submitting state after the API call completes (success or error).
      // });
    // }
  //   else {
  //     message('Please fill all required fields', 'warning');
  //  }
  //}
//   else {
//     message('Please fill mode of payment fields', 'warning');
//     setSubmitting(false);
//  }

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
  // let invoices = [];
  // const removeObjectWithId = (arr, invoiceId) => {
  //   const objWithIdIndex = arr.findIndex((obj) => obj.invoiceId === invoiceId);

  //   if (objWithIdIndex > -1) {
  //     arr.splice(objWithIdIndex, 1);
  //   }

  //   return arr;
  // };
  // const getInvoices = (checkboxVal, invObj) => {
  //   if (checkboxVal.target.checked === true) {
  //     setSelectedInvoice([...selectedInvoice, invObj]);
  //   } else {
  //     invoices = removeObjectWithId(invoiceReceipt, invObj.invoice_code);
  //     setSelectedInvoice(invoices);
  //   }
  // };

  const getInvoices = (event, invObj) => {
       const { checked } = event.target;

    //const index = arr.findIndex(value => {return value.invoice_id ===  invObj.invoice_id});
    if (checked) {
      // If the checkbox is checked, add the employeeId to the selectedNames array
      // arr[index].checked = true;
      // setSelectedInvoice(arr);
      setSelectedInvoice([...selectedInvoice, invObj]);
    } else {
      const indofele = selectedInvoice.indexOf(invObj)
      // If the checkbox is unchecked, remove the employeeId from the selectedNames array
      selectedInvoice.splice(indofele, 1)

      setSelectedInvoice(selectedInvoice);
    }
    console.log("select", selectedInvoice);
  };
   console.log('selectedInvoice', selectedInvoice)

  // const insertInvoices = () => {
  //   invoices.forEach((obj) => {
  //     insertReceiptHistory(obj);
  //   });
  // };

  //Getting receipt data by order id
  const getinvoiceReceipt = () => {
    api.post('/invoice/getInvoiceReceiptById', { order_id: id }).then((res) => {
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
      //setTotalAmount(parseFloat(totalAmount) + parseFloat(remainingAmount));
      const newTotalAmount = parseFloat(totalAmount) + parseFloat(remainingAmount);
      setTotalAmount(newTotalAmount);
      const newReceiptAmount = (parseFloat(createReceipt.amount) + parseFloat(remainingAmount)).toString();
    setCreateReceipt({
      ...createReceipt,
      amount: newReceiptAmount,
    });
  } else {
    const newTotalAmount = parseFloat(totalAmount) - parseFloat(remainingAmount);
    setTotalAmount(newTotalAmount >= 0 ? newTotalAmount : 0);

    const newReceiptAmount = (parseFloat(createReceipt.amount) - parseFloat(remainingAmount)).toString();
    setCreateReceipt({
      ...createReceipt,
      amount: newReceiptAmount >= 0 ? newReceiptAmount : '0',
    });
    result.push(remainingAmount);
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
                    { invoiceReceipt && invoiceReceipt.length>0?
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
                            // value={createReceipt && moment(createReceipt.receipt_date).format('YYYY-MM-DD')}
                            defaultValue={createReceipt && createReceipt.receipt_date}
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
                    </Row>:<span>No Invoice</span>}
                  </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button className='shadow-none'
            color="primary"
            onClick={() => {
              if (!submitting) {
                setSubmitting(true);
                //generateCode();
                if (parseFloat(createReceipt.amount) > 0) {
                  if (createReceipt.mode_of_payment && createReceipt.mode_of_payment !== 'Please Select') {
                    const totalInvoiceAmount = selectedInvoice.reduce((total, invoice) => total + invoice.remainingAmount, 0);
                    if (parseFloat(createReceipt.amount) <= totalInvoiceAmount) {

                  generateCode();
                } else {
                  // Show an error message indicating that the amount should not exceed the invoice amount
                  message('Amount should not be greater than the total invoice amount.', 'warning');
                  setSubmitting(false); // Reset submitting state
                }
                } else {
                  // Set the amount validation error message
                  alert('Please select a valid mode of payment');
                  setSubmitting(false); // Reset submitting state
                }
              // } else {
              //     // Set the amount validation error message
              //     alert('Amount should be less than or equal to the total invoice amount.');
              //   }
                } else {
                  // Show an error message indicating that the amount should be greater than 0
                  message('Pls select atleast one Invoice', 'warning');
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

export default CreateReceipt;
