import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Table } from 'reactstrap';
//import PdfCreateInvoice from '../PDF/PdfCreateInvoicess';
import PdfCreateInvoice from '../PDF/PdfCreateInvoice';
import ComponentCard from '../ComponentCard';
// import api from '../../constants/api';
// import message from '../Message';

export default function CustomerFinanceInvoice({
  createInvoice,
  cancelInvoice,
  invoiceCancel,
  setEditInvoiceModal,
  setEditModal,
  financeDetails,
  setInvoiceDatas
}) {
  CustomerFinanceInvoice.propTypes = {
    createInvoice: PropTypes.array,
    cancelInvoice: PropTypes.array,
    invoiceCancel: PropTypes.func,
    setEditInvoiceModal: PropTypes.func,
    setEditModal: PropTypes.func,
    setInvoiceDatas:PropTypes.func,
    financeDetails:PropTypes.object,
  };
  // const [setCreateInvoice ] = useState();

  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: 'Invoice Code' },
    { name: 'Status' },
    { name: 'Invoice Date' },
    { name: 'Amount' },
    { name: 'Print' },
    { name: 'Edit' },
    { name: 'Cancel' },
  ];
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
                          createInvoice={createInvoice}
                          cancelInvoice={cancelInvoice}
                          invoiceId={element.invoice_id}
                          financeDetails={financeDetails}
                        ></PdfCreateInvoice>
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
                      <td>
                      {element.status === 'Due' && (
                       
                        <span
                          onClick={() => {
                            if (
                              window.confirm(
                                'Are you sure you want to cancel  \n  \n You will lose any changes made',
                              )
                            ) {
                            invoiceCancel(element);
                            }
                          }}
                        >
                          Cancel
                        </span>
                      )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <ComponentCard title="Cancel Invoice">
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
          </ComponentCard>
        </div>
      </div>
    </Form>
  );
}
