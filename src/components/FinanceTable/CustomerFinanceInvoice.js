import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Table,CardTitle,Row } from 'reactstrap';
import PdfCreateInvoice from '../PDF/PdfCreateInvoice';
 import PdfCreateInvoiceArabic from '../PDF/PdfCreateInvoiceArabic'


export default function CustomerFinanceInvoice({
  createInvoice,
  cancelInvoice,
  invoiceCancel,
  setEditInvoiceModal,
  setEditModal,
  setInvoiceDatas,
  projectDetail,
  
}) {
  CustomerFinanceInvoice.propTypes = {
    createInvoice: PropTypes.array,
    cancelInvoice: PropTypes.array,
    invoiceCancel: PropTypes.func,
    setEditInvoiceModal: PropTypes.func,
    setEditModal: PropTypes.func,
    setInvoiceDatas:PropTypes.func,
    projectDetail:PropTypes.object,
  };
  
  //console.log("Data",invoiceDatas);
  // const [setCreateInvoice ] = useState();

  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: 'Invoice Code' },
    { name: 'Status' },
    { name: 'Invoice Date' },
    { name: 'Amount' },
    { name: 'Print' },
     { name: 'PrintArabic' },
    { name: 'Edit' },
    { name: 'Cancel' },
  ];
  //Structure of CancelInvoice 
  const invoiceTableColumns1 = [
    { name: 'Invoice Code' },
    { name: 'Status' },
    { name: 'Invoice Date' },
    { name: 'Amount' },
    
  ];
  return (
    // Invoice Tab
   
      <Form>
        <div className="MainDiv">
          <div className="container">
            <Table id="example">
              <thead>
                <tr>
                  {invoiceTableColumns.map((cell) => {
                    return <td key={cell.name}>{cell.name}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {createInvoice &&
                  createInvoice.map((element) => {
                    return (
                      <tr key={element.invoice_id}>
                        <td>{element.invoice_code}</td>
                        <td>{element.status}</td>
                        <td>{(element.invoice_date)? moment(element.invoice_date).format('DD-MM-YYYY'):''}</td>
                        <td>{element.invoice_amount}</td>
                        <td>
                        <PdfCreateInvoice
                  createInvoice = {createInvoice}
                  cancelInvoice = {cancelInvoice}
                  projectDetail={projectDetail}
                  invoiceId = {element.invoice_id}
                 ></PdfCreateInvoice>
         
                       </td>
                        <td>
                         <PdfCreateInvoiceArabic invoiceData={{ arabicText: 'نص باللغة العربية' }} invoiceId = {element.invoice_id} /> 
         
                       </td> 
                        <td>
                         
                            <span className='addline'
                              onClick={() => {
                                setEditInvoiceModal(element);
                                setEditModal(true);
                                setInvoiceDatas(element.invoice_id);
                                setInvoiceDatas(element)
                              }}
                            >
                              Edit
                            </span>
                          
                        </td>
                        {element.status === 'due' && (
                        <td> <span
                              onClick={() => {
                                if (
                                  window.confirm(
                                    'Are you sure you want to cancel  \n  \n You will lose any changes made',
                                  )
                                ) {
                                invoiceCancel(element); }}
                              }
                            >
                              Cancel
                            </span></td>
                            )}
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <Row className="mt-4">
        <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
          {' '}
          CANCEL INVOICE(S){' '}
        </CardTitle>
      </Row>
      <br />
      <Row className="mt-4">
            <Table id="example">
              <thead>
                <tr>
                  {invoiceTableColumns1.map((cell) => {
                    return <td key={cell.name}>{cell.name}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {cancelInvoice &&
                  cancelInvoice.map((element) => {
                    const balanceAmountClass =
                    element.status.toLowerCase() === 'cancelled' ? 'text-danger' : '';
                    return (
                      <tr key={element.invoice_id}>
                        <td>{element.invoice_code}</td>
                        <td className={balanceAmountClass}>{element.status}</td>
                        <td>{(element.invoice_date)?moment(element.invoice_date).format('DD-MM-YYYY'):''}</td>
                        <td>{element.invoice_amount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            </Row>
          </div>
        </div>
      </Form>
  );
}
