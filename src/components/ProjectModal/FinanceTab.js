import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  CardTitle,
  Table,
  Form,

} from 'reactstrap';
import PropTypes from 'prop-types'
import FinanceInvoiceData from '../finance/FinanceInvoiceData';
import FinanceReceiptData from '../finance/FinanceReceiptData';
import InvoiceModal from '../finance/InvoiceModal';
import ReceiptModal from '../finance/ReceiptModal';
import CustomerFinanceInvoice from '../finance/CustomerFinanceInvoice';
import CustomerFinanceReceipt from '../finance/CustomerFinanceReceipt';
import api from '../../constants/api';
import message from '../Message';
import CreateFinance from '../finance/CreateFinance';

export default function FinanceTab({ projectDetail}) {
  FinanceTab.propTypes = {
    projectDetail: PropTypes.bool,
  };
const [financeModal, setFinanceModal] = useState(false);
const {id} = useParams();
const [editInvoiceData, setEditInvoiceData] = useState(false);
const [editCreateReceipt, setEditCreateReceipt] = useState(false);
const [createInvoice, setCreateInvoice] = useState(null);
const [cancelInvoice, setCancelInvoice] = useState(null);
const [cancelReceipt, setCancelReceipt] = useState(null);
const [receipt, setReceipt] = useState(null);
const [orderId, setOrderId] = useState(null);
const [receiveble, setReceiveble] = useState(null);
const [supplierAmount, setSupplierAmount] = useState(null);
const [subconAmount, setSubConAmount] = useState(null);
const [editModal, setEditModal] = useState(false);
const [editInvoiceModal, setEditInvoiceModal] = useState(false);
const [editReceiptModal, setEditReceiptModal] = useState(false);
const [editReceiptDataModal, setReceiptDataModal] = useState(false);
const getInvoiceById = () => {
    api
      .post('/invoice/getProjectInvoiceById', {project_id: id })
      .then((res) => {
        setCreateInvoice(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };
  const getAmountById = () => {
    api
      .post('/project/getAmountByProjectId', {project_id: id })
      .then((res) => {
        setReceiveble(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };
  const getSupplierById = () => {
    api
      .post('/project/getSupplierById', {project_id: id })
      .then((res) => {
        setSupplierAmount(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };
  const getSubconById = () => {
    api
      .post('/project/getSubconById', {project_id: id })
      .then((res) => {
        setSubConAmount(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };

  const getOrdersById = () => {
    api
      .post('/finance/getOrders', {project_id: id })
      .then((res) => {
        setOrderId(res.data.data[0].order_id);
        console.log('order',res.data.data)
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };
  const getInvoiceCancel = () => {
    api
      .post('/invoice/getProjectInvoiceCancel', {project_id: id })
      .then((res) => {
        setCancelInvoice(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };
  const invoiceCancel = (obj) => {
    obj.status = 'cancelled';
    api
      .post('/finance/editInvoicePortalDisplay', obj)
      .then(() => {
        message('Record editted successfully', 'success');
        window.location.reload();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
    //get receipt
  const getReceiptCancel = () => {
    api
      .post('/invoice/getReceiptCancel', { order_id: id })
      .then((res) => {
        setCancelReceipt(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };
  const getReceiptById = () => {
    api
      .post('/invoice/getProjectReceiptById', { project_id: id })
      .then((res) => {
        setReceipt(res.data.data);
      })
      .catch(() => {
        message('Cannot get Receipt Data', 'error');
      });
  };
    //receipt Cancel
    const receiptCancel = (obj) => {
        obj.receipt_status = 'cancelled';
        api
          .post('/finance/editTabReceiptPortalDisplay', obj)
          .then(() => {
            message('Record editted successfully', 'success');
          })
          .catch(() => {
            message('Unable to edit record.', 'error');
          });
      };
  useEffect(() => {
    getInvoiceCancel();
    getInvoiceById();
    getReceiptCancel();
    getReceiptById();
    getOrdersById();
    getAmountById();
    getSupplierById();
    getSubconById();
  }, [])

  return (
    <>
      <Row>
          <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white"> FINANCE </CardTitle>
      </Row>
      <br/>

      <CreateFinance financeModal={financeModal} projectId={id} projectDetail={projectDetail} setFinanceModal={setFinanceModal} />
      <Row  className='mb-4'>
             {!orderId && <Col md="3"> <Button color="primary" className='shadow-none' onClick={()=>{setFinanceModal(true);
                       
              }}>Add Order</Button></Col>}
              
              {orderId && <Col md="3"><Link to={`/FinanceEdit/${orderId}`}> <Button color="primary" className='shadow-none'>Go to order</Button></Link></Col>}

            </Row>
            <Row>
             
             <Col lg="6">
               <CardTitle tag="h4" className="border-bottom p-3 mb-0"> Account Receivables </CardTitle>
                 <Table bordered>
                   <thead>
                     <tr><th colSpan="3" className='bold'>Balance Receivables: <span>{receiveble && receiveble.balanceAmount} </span></th></tr>
                     <tr>
                       <th className='bold'>Description</th>
                       <th className='bold'>Amount Invoiced</th>
                       <th className='bold'>Amount Received</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td>Total Invoice Raised(Total PO Amount : )	</td>
                       <td>	 <span>{receiveble && receiveble.totalInvoice} </span> </td>
                       <td></td>
                     </tr>
                     <tr>
                       <td>Total Payments Received	</td>
                       <td> </td>
                       <td><span>{receiveble && receiveble.receivedAmount} </span> </td>
                     </tr>
                   </tbody>
                   <br/>
                 </Table>
             </Col>
             <Col lg="6">
               <CardTitle tag="h4" className="border-bottom p-3 mb-0"> Account Payables </CardTitle>
                 <Table bordered>
                   <thead>
                     <tr><th colSpan="3" className='bold'>Balance Payables :</th></tr>
                     <tr>
                       <th className='bold'>Description</th>
                       <th className='bold'>Invoice Received</th>
                       <th className='bold'>Amount Paid</th>
                     </tr>
                   </thead>
                   <tbody>
                   <tr>
                       <td>Supplier invoice amount </td>
                       <td>		<span>{supplierAmount && supplierAmount.payAmount} </span>  </td>
                       <td></td>
                     </tr>
                     <tr>
                       <td>Total Payments Made  </td>
                       <td> </td>
                       <td> <span>{supplierAmount && supplierAmount.paidAmount} </span>  </td>
                     </tr>
                     <tr>
                       <td>Subcon invoice amount	</td>
                       <td>	<span>{subconAmount && subconAmount.payAmount} </span>  </td>
                       <td></td>
                     </tr>
                     <tr>
                       <td>Total Payments Made</td>
                       <td> </td>
                       <td> <span>{subconAmount && subconAmount.paidAmount} </span> </td>
                     </tr>
                   </tbody>
                 </Table>
             </Col>
           </Row>
           <FinanceInvoiceData
            editInvoiceData={editInvoiceData}
            setEditInvoiceData={setEditInvoiceData}
            projectInfo={id}
            orderId={orderId}
            
          />
           {editCreateReceipt && <FinanceReceiptData
            editCreateReceipt={editCreateReceipt}
            setEditCreateReceipt={setEditCreateReceipt}
            orderId={orderId}
          />}

        <Row>
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                setEditInvoiceData(true);
              }}
            >
              Create Invoice
            </Button>
          </Col>
          <Col>
              <Button className='shadow-none'
                color="primary"
                onClick={() => {
                  setEditCreateReceipt(true);
                }}
              >
             Create Receipt
              </Button>
            </Col>
            </Row>
     
           {/* <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              setEditInvoiceData(true);
            }}
          >
            Create Invoice
          </Button>
          <Button
            className="shadow-none"
            color="warning"
            onClick={() => {
              setEditCreateReceipt(true);
            }}
          >
            Create Receipt
          </Button> */}
          <InvoiceModal
            editModal={editModal}
            setEditModal={setEditModal}
            editInvoiceModal={editInvoiceModal}
          />  
           <ReceiptModal
            editReceiptModal={editReceiptModal}
            setReceiptDataModal={setReceiptDataModal}
            editReceiptDataModal={editReceiptDataModal}
          />
      <Row className='mt-4'>
          <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white"> INVOICE(S) </CardTitle>
      </Row>

      <Form className='mt-4'>
        <Row className='border-bottom mb-3'>
        <CustomerFinanceInvoice
              createInvoice={createInvoice}
              cancelInvoice={cancelInvoice}
              invoiceCancel={invoiceCancel}
              setEditModal={setEditModal}
              setEditInvoiceModal={setEditInvoiceModal}
            ></CustomerFinanceInvoice>
        </Row>
      </Form>
      <Row className="mt-4">
              <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
                {' '}
                RECEIPT(S){' '}
              </CardTitle>
            </Row>

            <Form className="mt-4">
              <Row className="border-bottom mb-3">
                <CustomerFinanceReceipt
                  receipt={receipt}
                  cancelReceipt={cancelReceipt}
                  receiptCancel={receiptCancel}
                  setEditReceiptModal={setEditReceiptModal}
                  setReceiptDataModal={setReceiptDataModal}
                ></CustomerFinanceReceipt>
              </Row>
            </Form>
    </>
  );
};
